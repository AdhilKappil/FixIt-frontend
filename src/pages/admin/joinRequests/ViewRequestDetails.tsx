import React, { useState } from "react";
import {Avatar,Box, Button, Card,CardActions,CardContent,Dialog, Typography,} from "@mui/material";
import { IWorker } from "../../../@types/schema";
import { useAcceptOrRejectRequestMutation } from "../../../slices/adminApiSlices";
import { MyError } from "../../../validation/validationTypes";
import { toast } from "react-toastify";
import Spinner from "../../../components/common/Spinner";

interface ViewRequestDetailsProps {
  open: boolean;
  onClose: () => void;
  worker: IWorker;
}

const ViewRequestDetails: React.FC<ViewRequestDetailsProps> = ({
  open,
  onClose,
  worker,
}) => {

  const [acceptOrRejectRequest] = useAcceptOrRejectRequestMutation();
  const [isSumbit, setSubmit] = useState(false)

  const handleAcceptOrReject = async (status:string) => {
    try {
       setSubmit(true)
        const id = worker._id
        const res = await acceptOrRejectRequest({id,status}).unwrap();
        onClose();
        setSubmit(false)
        toast.success(res.message);
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
  };

}
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
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Location : {worker.district}
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
            padding: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={()=>handleAcceptOrReject("accept")}>
           {isSumbit? <Spinner/> : "Accept" }
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={()=>handleAcceptOrReject("reject")}
            sx={{ marginLeft: 1 }}
          >
             {isSumbit? <Spinner/> : "Reject" }
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};


export default ViewRequestDetails;
