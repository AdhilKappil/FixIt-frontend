import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, GridCellParams, gridClasses, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../@types/Props";
import { useGetJoinRequestsMutation } from "../../../slices/adminApiSlices";
import { IWorker } from "../../../@types/schema";
import ViewRequestDetails from "./ViewRequestDetails";

const JoinRequests: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [getJoinRequests] = useGetJoinRequestsMutation();
  const [selectedWorker, setSelectedWorker] = useState<IWorker | null>(null);

  useEffect(() => {
    setSelectedLink(link);

    async function fetchWorkers() {
      try {
        const res = await getJoinRequests("").unwrap();
        setWorkers(res.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    }

    fetchWorkers();
  }, [link]);

  const handleViewDetails = (worker: IWorker) => {
    setSelectedWorker(worker);
  };

  const handleCloseModal = () => {
    setSelectedWorker(null);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "profile_img",
        headerName: "Profile",
        width: 100,
        renderCell: (params: GridCellParams) => <Avatar src={params.row.profile_img} />,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 150 },
      { field: "service", headerName: "Service", width: 150 },
      { field: "experience", headerName: "Experience ", width: 150 },
      { field: "firstHourCharge", headerName: "First hour charge ", width: 170 },
      { field: "laterHourCharge", headerName: "Later Hour charge ", width: 180 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 150,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format(" DD-MM-YYYY"),
      },
      {
        field: "actions",
        headerName: "View Details",
        width: 150,
        renderCell: (params: GridCellParams) => (
          <Button
            variant="contained"
            color="inherit"
            onClick={() => handleViewDetails(params.row as IWorker)}
          >
            View Details
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Box sx={{ height: 400, width: "95%" }}>
        <Typography variant="h4" component="h4" sx={{ textAlign: "center", mt: 2, mb: 3 }}>
          New Join Requests
        </Typography>
        <DataGrid
          columns={columns}
          rows={workers}
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
       
        />
      </Box>
      {selectedWorker && (
        <ViewRequestDetails
          open={true}
          onClose={handleCloseModal}
          worker={selectedWorker}
          workers={workers}
        />
      )}
    </>
  );
};

export default JoinRequests;
