import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { IBooking, IUser } from '../../../@types/schema';

const months = 5;
const today = new Date();
const tempData: { date: Date; name: string; users: number; bookings: number }[] = [];
for (let i = 0; i < months; i++) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1))
  );
  tempData.push({
    date,
    name: moment(date).format('MMM YYYY'),
    users: 0,
    bookings: 0,
  });
}

interface GraphUsersBookingsProps {
  users: IUser[];
  bookings: IBooking[];
}

export default function GraphUsersBookings({ users, bookings }: GraphUsersBookingsProps) {
  const [data, setData] = useState(tempData);

  useEffect(() => {
    const updatedData = [...tempData];
    updatedData.forEach((data) => {
      data.users = 0;
    });
    users.forEach((user) => {
      for (let i = 0; i < months; i++) {
        if (moment(updatedData[i].date).isSame(user?.createdAt, 'month')) {
          updatedData[i].users++;
          break;
        }
      }
    });
    setData(updatedData);
  }, [users]);

  useEffect(() => {
    const updatedData = [...tempData];
    updatedData.forEach((data) => {
      data.bookings = 0;
    });
    bookings.forEach((booking) => {
      for (let i = 0; i < months; i++) {
        if (moment(updatedData[i].date).isSame(booking?.createdAt, 'month')) {
          updatedData[i].bookings++;
          break;
        }
      }
    });
    setData(updatedData);
  }, [bookings]);

  return (
    <div style={{ width: '100%', height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="bookings"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
