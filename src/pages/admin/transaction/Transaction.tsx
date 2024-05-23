

import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  gridClasses,
  GridColDef,
} from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../@types/Props";
import { useGetBookingsMutation } from "../../../slices/api/workerApiSlice";
import { IBooking } from "../../../@types/schema";


const Transaction: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [getBookings] = useGetBookingsMutation();
  const [bookings, setBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    setSelectedLink(link);

    async function fetchUser() {
      try {
        const res = await getBookings({
          userId: "",
          status: "completed",
          workerId: "",
          service: "",
        }).unwrap();
      setBookings(res.data)
      console.log(res);
      
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUser();
  }, [link]); // Add dependencies if needed


  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "Booking Id", width: 220 },
      { field: "userId", headerName: "User Id", width: 220 },
      { field: "workerId", headerName: "Worker Id", width: 220 },
      {
        field: "updatedAt",
        headerName: "Date",
        width: 120,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format(" DD-MM-YYYY"),
      },
      { field:"price", headerName: "Amount", width: 100 },
      { field:"paymentId", headerName: "Transaction Id", width: 250 },
      { field:"payment", headerName: "Payment Status", width: 120 },
    ],
    [rowId]
  );

  return (
    <Box sx={{ height: 400, width: "95%" }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 2, mb: 3 }}
      >
        Sales Report  
      </Typography>
      <DataGrid
        columns={columns}
        rows={bookings}
        getRowId={(row: any) => row._id}
        pageSizeOptions={[10, 25, 50, 75, 100]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
        onCellEditStop={(params) => setRowId(params.id.toString())}
        onCellEditStart={(params) => setRowId(params.id.toString())}
      />
    </Box>
  );
};

export default Transaction;
