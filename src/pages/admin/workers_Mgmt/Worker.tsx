import React, { useEffect, useMemo, useState } from "react";
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
import { useGetJoinRequestsMutation } from "../../../slices/api/adminApiSlices";
import { IWorker } from "../../../@types/schema";
import WorkerActions from "./WorkerActions";

const Workers: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [getJoinRequests] = useGetJoinRequestsMutation();

  useEffect(() => {
    setSelectedLink(link);

    async function fetchWorkers() {
      try {
        const res = await getJoinRequests("").unwrap();
        const pendingWorkers = res.data.filter(
          (worker: Record<string, any>) => worker.status === "accept"
        );
        setWorkers(pendingWorkers);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    }

    fetchWorkers();
  }, [link]);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "profile_img",
        headerName: "Profile",
        width: 130,
        renderCell: (params: GridCellParams) => (
          <Avatar src={params.row.profile_img} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 130 },
      { field: "email", headerName: "Email", width: 170 },
      { field: "district", headerName: "Location", width: 150 },
      { field: "service", headerName: "Service", width: 150 },
      { field: "experience", headerName: "Experience ", width: 120 },

      {
        field: "createdAt",
        headerName: "Created At",
        width: 120,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format(" DD-MM-YYYY"),
      },
      {
        field: "isBlocked",
        headerName: "Blocked",
        width: 120,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: GridCellParams) => (
          <WorkerActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box sx={{ height: 500, width: "95%" }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 2, mb: 3 }}
      >
        Manage Worker
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
        onCellEditStop={(params) => setRowId(params.id.toString())}
        onCellEditStart={(params) => setRowId(params.id.toString())}
      />
    </Box>
  );
};

export default Workers;
