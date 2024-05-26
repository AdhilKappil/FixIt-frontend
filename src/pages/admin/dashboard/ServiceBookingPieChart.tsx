import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip } from 'recharts';
import { useAdminGetBookingsMutation } from '../../../slices/api/adminApiSlices';

// Define the type for the booking
interface Booking {
  service: string;
}

// Define the type for the service group
interface ServiceGroup {
  name: string;
  qty: number;
}

// Generate a larger set of colors
const COLORS = [
  '#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#8A2BE2', '#A52A2A', '#5F9EA0', '#D2691E',
  '#FF7F50', '#6495ED', '#DC143C', '#00FFFF', '#00008B', '#008B8B', '#B8860B', '#A9A9A9'
];

const RADIAN = Math.PI / 180;

// Define the type for the customized label props
interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ServiceBookingPieChart() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
  const [getBookings] = useAdminGetBookingsMutation();

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await getBookings({
          userId: "",
          status: "all",
          workerId: "",
          service: "",
        }).unwrap();
        setBookings(res.data);
        console.log(res);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchBooking();
  }, [getBookings]);

  useEffect(() => {
    const serviceFrequency = bookings.reduce<Record<string, number>>((acc, booking) => {
      const serviceName = booking.service;
      if (!acc[serviceName]) {
        acc[serviceName] = 0;
      }
      acc[serviceName]++;
      return acc;
    }, {});

    const serviceGroupsArray = Object.entries(serviceFrequency).map(
      ([name, qty]) => ({ name, qty })
    );

    setServiceGroups(serviceGroupsArray);
  }, [bookings]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >
      <RechartsPieChart width={400} height={400}>
        <Pie
          data={serviceGroups}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="qty"
        >
          {serviceGroups.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
      <Stack gap={2}>
        <Typography variant="h5">Service Bookings</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {serviceGroups.map((group, index) => (
            <Stack key={group.name} alignItems="center" spacing={1}>
              <Box sx={{ width: 50, height: 50, background: COLORS[index % COLORS.length] }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {group.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
