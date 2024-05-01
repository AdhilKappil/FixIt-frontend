import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, GridCellParams, gridClasses, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../@types/Props";
import { useGetJoinRequestsMutation } from "../../../slices/api/adminApiSlices";
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
        const pendingWorkers = res.data.filter((worker:Record<string,any>)=> worker.status === "pending");
        setWorkers(pendingWorkers);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    }

    fetchWorkers();
  }, [link,selectedWorker]);

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
      { field: "name", headerName: "Name", width: 130 },
      { field: "email", headerName: "Email", width: 170 },
      { field: "mobile", headerName: "Mobile", width: 170 },
      { field: "service", headerName: "Service", width: 150 },
      { field: "experience", headerName: "Experience ", width: 150 },
    
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
        />
      )}
    </>
  );
};

export default JoinRequests;
