import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, GridCellParams,gridClasses,GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../@types/Props";
import { useGetServiceMutation } from "../../../slices/adminApiSlices";
import ServiceAction from "./ServiceAction";
import { IService } from "../../../validation/validationTypes";
import AddNewServices from "./AddNewServices";



const Services_Mgmt: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [service, setService] = useState<IService[]>([]);
  const [getService] = useGetServiceMutation();
  const [addService, setAddService] = useState(false)

  useEffect(() => {
    setSelectedLink(link);

    async function fetchUser() {
      try {
        const res = await getService("").unwrap();
        setService(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUser();
  }, [link,addService]); // Add dependencies if needed

   // Function to change addServiceState from chiled
   const updateParentState = (newValue : boolean) => {
    setAddService(newValue);
  };

  const columns:GridColDef[] = useMemo(
    () => [
      {
        field: "profile_img",
        headerName: "Image",
        width: 120,
        renderCell: (params: GridCellParams) => <Avatar src={params.row.service_img} />,
        sortable: false,
        filterable: false,
      },
      { field: "serviceName", headerName: "Name", width: 150 ,editable: true,},
      { field: "firstHourCharge", headerName: "First Hour Charge", width: 150 ,editable: true,},
      { field: "laterHourCharge", headerName: "Later Hour Charge", width: 150 ,editable: true,},
      { field: "description", headerName: "Description", width: 300 ,editable: true,},
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
        width: 150,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: GridCellParams) => (
          <ServiceAction {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );


  return (
   <>
   
   {addService ? (<AddNewServices setAddService={updateParentState}/> ):
     <Box sx={{ height: 400, width: "95%" }}>
     <Typography
       variant="h4"
       component="h4"
       sx={{ textAlign: "center", mt: 2, mb: 3 }}
     >
       Manage Service
     </Typography>
      <div className="flex justify-end mb-3">
       <button onClick={()=>setAddService(true)}  className="bg-gray-400 rounded-md px-2 py-1">Add Service</button>
      </div>
     <DataGrid
       columns={columns}
       rows={service}
       getRowId={(row: IService) => row._id ?? ''}
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
   }
   </>
  );
};

export default Services_Mgmt;

