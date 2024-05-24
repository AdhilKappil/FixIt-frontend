import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
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
import { useGetBookingsMutation } from "../../../slices/api/workerApiSlice";
import { IBooking } from "../../../@types/schema";
import * as XLSX from "xlsx";

const SalesReport: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [getBookings] = useGetBookingsMutation();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
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
  }, [link]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "Booking Id", width: 220 },
      { field: "service", headerName: "Service", width: 140 },
      { field: "userId", headerName: "User Id", width: 220 },
      { field: "workerId", headerName: "Worker Id", width: 220 },
      {
        field: "updatedAt",
        headerName: "Date",
        width: 120,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format(" DD-MM-YYYY"),
      },
      {
        field: "price",
        headerName: "Amount",
        width: 100,
        renderCell: (params: GridCellParams) => `₹${params.value}`,
      },
      { field: "paymentId", headerName: "Transaction Id", width: 250 },
      {
        field: "payment",
        headerName: "Payment Status",
        width: 120,
        renderCell: (params: GridCellParams) =>
          params.value ? "Success" : "Pending",
      },
    ],
    [rowId]
  );

  const totalSales = useMemo(
    () => bookings.reduce((total, booking) => total + booking.price, 0),
    [bookings]
  );

  const totalProfit = useMemo(() => totalSales * 0.03, [totalSales]);

  const handleDownload = () => {
    if (!apiRef.current) return;

    const allRows = apiRef.current.getSortedRows();
    const visibleRows = allRows.slice(page * pageSize, (page + 1) * pageSize);

    const transformedRows = visibleRows.map((row) => ({
      BookingId: row._id,
      Service: row.service,
      UserId: row.userId,
      WorkerId: row.workerId,
      Date: moment(row.createdAt).format(" DD-MM-YYYY"),
      Amount: `₹${row.price}`,
      TransactionId: row.paymentId,
      PaymentStatus: row.payment ? "Success" : "Pending",
    }));

    transformedRows.push({
      BookingId: "",
      Service:"",
      UserId: "",
      WorkerId: "",
      Date: "",
      Amount: `Total Sales: ₹${totalSales.toFixed(2)}`,
      TransactionId: "",
      PaymentStatus: `Total Profit: ₹${totalProfit.toFixed(2)}`,
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
    <Box sx={{ height: 450, width: "95%", mt: 4 }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mb: 3 }}
      >
        Sales Report
      </Typography>
      <DataGrid
        columns={columns}
        rows={bookings}
        getRowId={(row: any) => row._id}
        pageSize={pageSize}
        page={page}
        onPageChange={(params: any) => setPage(params.page)}
        onPageSizeChange={(params: any) => setPageSize(params.pageSize)}
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
            Total Sales: ₹{totalSales.toFixed(2)}
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
            Total Profit: ₹{totalProfit.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesReport;
