import { useEffect, useState } from "react";
import { Selected } from "../../../@types/Props";
import { Group } from '@mui/icons-material';
import EngineeringIcon from "@mui/icons-material/Engineering";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { IBooking, IUser, IWorker } from "../../../@types/schema";
import { useAdminGetBookingsMutation, useGetJoinRequestsMutation, useGetServiceMutation, useGetUsersDataMutation } from "../../../slices/api/adminApiSlices";
import ServiceBookingPieChart from "./ServiceBookingPieChart";
import GraphUsersBookings from "./GrapshUserBokkings";
import { IService } from "../../../validation/validationTypes";

function Dashboard({ setSelectedLink, link }: Selected) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [getUsersData] = useGetUsersDataMutation();
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [getJoinRequests] = useGetJoinRequestsMutation();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [getBookings] = useAdminGetBookingsMutation();
  const [service, setService] = useState<IService[]>([]);
  const [getService] = useGetServiceMutation();

  useEffect(() => {
    setSelectedLink(link);
    async function fetchDatas() {
      try {
        // for getting user
        const user = await getUsersData("").unwrap();
        setUsers(user.data);

        // for getting worker
        const worker = await getJoinRequests("").unwrap();
        const acceptWorkers = worker.data.filter(
          (worker: Record<string, any>) => worker.status === "accept"
        );
        setWorkers(acceptWorkers);

        // for getting bookings
        const booking = await getBookings({
          userId: "", status: "all", workerId: "", service: ""
        }).unwrap();
        setBookings(booking.data);

        // for getting service
        const res = await getService("").unwrap();
        setService(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDatas();
  }, [link]);

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: { md: '2fr 1fr' },
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: { xs: 'column' },
      }}
    >
      {/* Left Side */}
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(4, auto)', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Users</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
              <Typography variant="h4">{users.length}</Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Workers</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <EngineeringIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
              <Typography variant="h4">{workers.length}</Typography>
            </Box>
          </Paper>
        </Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <ServiceBookingPieChart />
        </Paper>
        <Paper elevation={3} sx={{ p: 2 }}>
          <GraphUsersBookings users={users} bookings={bookings} />
        </Paper>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Bookings</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingCartIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
              <Typography variant="h4">{bookings.length}</Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Services</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
               <MiscellaneousServicesIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
              <Typography variant="h4">{service.length}</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Right Side */}
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box>
            <Typography variant="h5">Recent Activities</Typography>
            <Divider sx={{ mt: 2, mb: 2, opacity: 0.7 }} />
            <Box>
              <Typography>Recently added Users</Typography>
              <List>
                {users.slice(0, 3).map((user, i) => (
                  <Box key={user?._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={user?.name} src={user?.profile_img} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user?.name}
                        secondary={`Joined: ${moment(user?.createdAt).format('YYYY-MM-DD')}`}
                      />
                    </ListItem>
                    {i !== 2 && <Divider variant="inset" />}
                  </Box>
                ))}
              </List>
            </Box>
            <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
            <Box>
              <Typography>Recently added Workers</Typography>
              <List>
                {workers.slice(0, 3).map((worker, i) => (
                  <Box key={worker?._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={worker?.name} src={worker?.profile_img} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={worker?.name}
                        secondary={`${worker?.service} | Joined: ${moment(worker?.createdAt).format('YYYY-MM-DD')}`}
                      />
                    </ListItem>
                    {i !== 2 && <Divider variant="inset" />}
                  </Box>
                ))}
              </List>
            </Box>
            <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
            <Box>
              <Typography>Recent Bookings</Typography>
              <List>
                {bookings.slice(0, 3).map((booking, i) => (
                  <Box key={booking?._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt={booking?.service}
                          src={booking?.serviceImg}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={booking?.service}
                        secondary={`Booked: ${moment(booking?.createdAt).format('YYYY-MM-DD')}`}
                      />
                    </ListItem>
                    {i !== 2 && <Divider variant="inset" />}
                  </Box>
                ))}
              </List>
            </Box>
            <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
            <Box>
              <Typography>Recent Services</Typography>
              <List>
                {service.slice(0, 3).map((service, i) => (
                  <Box key={service?._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt={service?.serviceName}
                          src={service?.service_img}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={service?.serviceName}
                        secondary={`Date: ${moment(service?.createdAt).format('YYYY-MM-DD')}`}
                      />
                    </ListItem>
                    {i !== 2 && <Divider variant="inset" />}
                  </Box>
                ))}
              </List>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;
