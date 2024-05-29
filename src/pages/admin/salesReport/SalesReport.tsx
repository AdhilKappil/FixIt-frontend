import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  gridClasses,
  GridColDef,
  GridSortModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../@types/Props";
import { IBooking } from "../../../@types/schema";
import * as XLSX from "xlsx";
import { useAdminGetBookingsMutation } from "../../../slices/api/adminApiSlices";

const SalesReport: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [getBookings] = useAdminGetBookingsMutation();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const apiRef = useGridApiRef();

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
        setBookings(res.data);
        console.log(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUser();
  }, [link, getBookings, setSelectedLink]);

  const formatId = (id: string) => id.slice(-8).toUpperCase();

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "_id",
        headerName: "Booking Id",
        width: 170,
        renderCell: (params: GridCellParams) => formatId(params.value as string),
      },
      { field: "service", headerName: "Service", width: 170 },
      {
        field: "userId",
        headerName: "User",
        width: 170,
        renderCell: (params: GridCellParams) => params.row.userId.name,
      },
      {
        field: "workerId",
        headerName: "Worker",
        width: 170,
        renderCell: (params: GridCellParams) => params.row.workerId.name,
      },
      {
        field: "updatedAt",
        headerName: "Date",
        width: 170,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format(" DD-MM-YYYY"),
      },
      { field: "paymentId", headerName: "Transaction Id", width: 270 },
      {
        field: "price",
        headerName: "Amount",
        width: 170,
        renderCell: (params: GridCellParams) => `₹${params.value}`,
      },
    ],
    [rowId]
  );

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const bookingDate = moment(booking.updatedAt);
      const from = fromDate ? moment(fromDate) : null;
      const to = toDate ? moment(toDate) : null;

      if (from && bookingDate.isBefore(from, "day")) return false;
      if (to && bookingDate.isAfter(to, "day")) return false;

      return true;
    });
  }, [bookings, fromDate, toDate]);

  const totalSales = useMemo(
    () => {
      const sales = filteredBookings.reduce((total, booking) => total + booking.price, 0);
      return Math.round(parseFloat(sales.toFixed(2)));
    },
    [filteredBookings]
  );

  const totalProfit = useMemo(
    () => {
      const profit = totalSales * 0.03;
      return Math.round(parseFloat(profit.toFixed(2)));
    },
    [totalSales]
  );

  const handleDownload = () => {
    if (!apiRef.current) return;

    const allRows = apiRef.current.getSortedRows();
    const transformedRows = allRows.map((row) => ({
      BookingId: formatId(row._id),
      Service: row.service,
      UserId: row.userId.name,
      WorkerId: row.workerId.name,
      Date: moment(row.createdAt).format(" DD-MM-YYYY"),
      Amount: `₹${row.price}`,
      TransactionId: row.paymentId,
    }));

    transformedRows.push({
      BookingId: "",
      Service: `Total Profit: ₹${totalProfit}`,
      UserId: "",
      WorkerId: "",
      Date: "",
      Amount: `Total Sales: ₹${totalSales}`,
      TransactionId: "",
    });

    const ws = XLSX.utils.json_to_sheet(transformedRows);

    // Set column widths
    const columnWidths = [
      { wch: 25 },
      { wch: 20 },
      { wch: 25 },
      { wch: 25 },
      { wch: 12 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
    ];

    ws["!cols"] = columnWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SalesReport");
    XLSX.writeFile(wb, "SalesReport.xlsx");
  };

  return (
    <Box sx={{ width: "95%", mt: 4 }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mb: 3 }}
      >
        Sales Report
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6} md={3}>
          <TextField
            label="From Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="To Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <DataGrid
        columns={columns}
        rows={filteredBookings}
        getRowId={(row: any) => row._id}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        apiRef={apiRef}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
        onCellEditStop={(params) => setRowId(params.id.toString())}
        onCellEditStart={(params) => setRowId(params.id.toString())}
      />
      <Grid container sx={{ alignItems: "center", mt: 2 }}>
        <Grid item xs={4}>
          <Typography variant="h6" component="div">
            Total Sales: ₹{totalSales}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "gray", color: "white" }}
            onClick={handleDownload}
          >
            Download
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "right" }}>
          <Typography variant="h6" component="div">
            Total Profit: ₹{totalProfit}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesReport;
