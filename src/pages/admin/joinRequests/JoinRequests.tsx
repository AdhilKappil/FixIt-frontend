

import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, GridCellParams,gridClasses,GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../@types/Props";
import { useGetJoinRequestsMutation } from "../../../slices/adminApiSlices";
import JoinActions from "./JoinAction";
import { IWorker } from "../../../@types/schema";



const JoinRequests: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [getJoinRequests] = useGetJoinRequestsMutation();

  useEffect(() => {
    setSelectedLink(link);

    async function fetchUser() {
      try {
        const res = await getJoinRequests("").unwrap();
        setWorkers(res.data);
        console.log(workers);
        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUser();
  }, [link]); // Add dependencies if needed

  const columns:GridColDef[] = useMemo(
    () => [
      {
        field: "profile_img",
        headerName: "Profile",
        width: 60,
        renderCell: (params: GridCellParams) => <Avatar src={params.row.profile_img} />,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "mobile", headerName: "Mobile", width: 200 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format(" DD-MM-YYYY"),
      },
      { field: "_id", headerName: "Id", width: 220 },
      {
        field: "isBlocked",
        headerName: "Blocked",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: GridCellParams) => (
          <JoinActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  console.log(workers);
  

  return (
    <Box sx={{ height: 400, width: "95%" }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 2, mb: 3 }}
      >
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
        onCellEditStop={(params) => setRowId(params.id.toString())}
        onCellEditStart={(params) => setRowId(params.id.toString())}
      />
    </Box>
  );
};
  
export default JoinRequests;
