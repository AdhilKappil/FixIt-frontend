import { useEffect } from "react";
import { Selected } from "../../../@types/Props";
import { Group } from '@mui/icons-material';
import EngineeringIcon from "@mui/icons-material/Engineering";

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
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";


function Dashboard({setSelectedLink, link}:Selected) {

  const { userInfo } = useSelector((state:RootState) => state.auth);

      useEffect(() => {
        setSelectedLink(link);
      }, []);
      return (
        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: 'repeat(3,1fr)',
            gridAutoRows: 'minmax(100px, auto)',
            gap: 3,
            textAlign: 'center',
            flexDirection: 'column',
          }}
        >
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
              <Typography variant="h4">0</Typography>
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
              <Typography variant="h4">0</Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
            <Box>
              <Typography>Recently added Users</Typography>
              <List>
                {/* {users.slice(0, 4).map((user, i) => ( */}
                  <Box >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={userInfo?.name} src={userInfo?.profile_img} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={userInfo?.name}
                        secondary={`Joined: ${moment(userInfo?.createdAt).format(
                          'YYYY-MM-DD'
                        )}`}
                      />
                    </ListItem>
                    {/* {i !== 3 && <Divider variant="inset" />} */}
                  </Box>
                {/* ))} */}
              </List>
            </Box>
            <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
            {/* <Box>
              <Typography>Recently added Rooms</Typography>
              <List>
                {rooms.slice(0, 4).map((room, i) => (
                  <Box key={room._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt={room?.title}
                          src={room?.images[0]}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={room?.title}
                        secondary={`Added: ${moment(room?.createdAt).fromNow()}`}
                      />
                    </ListItem>
                    {i !== 3 && <Divider variant="inset" />}
                  </Box>
                ))}
              </List>
            </Box> */}
          </Paper>
        </Box>
      );
    };

export default Dashboard