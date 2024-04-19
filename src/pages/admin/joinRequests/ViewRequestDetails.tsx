import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { IWorker } from "../../../@types/schema";

interface ViewRequestDetailsProps {
  open: boolean;
  onClose: () => void;
  worker: IWorker;
  workers: IWorker[];
}

const ViewRequestDetails: React.FC<ViewRequestDetailsProps> = ({
  open,
  onClose,
  worker,
  workers,
}) => {
  const handleAccept = () => {
    // Implement accept logic here
    onClose();
  };

  const handleReject = () => {
    // Implement reject logic here
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              {worker.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Service: {worker.service}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Experience: {worker.experience}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              First Hour Charge: ₹ {worker.firstHourCharge}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Later Hour Charge: ₹ {worker.laterHourCharge}
            </Typography>
          </Box>
          <Avatar sx={{ width: 150, height: 150 }} src={worker.profile_img} />
        </CardContent>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ID Card
          </Typography>
          <img
            src={worker.idCard_img}
            alt="ID Card"
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "flex-end",
            padding:2 
          }}
        >
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleReject}
            sx={{ marginLeft: 1 }}
          >
            Reject
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default ViewRequestDetails;
