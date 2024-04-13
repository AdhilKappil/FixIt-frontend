import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { GridCellParams } from "@mui/x-data-grid";
import { useEditServiceMutation } from "../../../slices/adminApiSlices";
import { MyError } from "../../../@types/validationTypes";
import { toast } from "react-toastify";

const ServiceAction = ({
  params,
  rowId,
  setRowId,
}: {
  params: GridCellParams;
  rowId: string | null;
  setRowId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editService] = useEditServiceMutation();

  const handleSubmit = async () => {
    setLoading(true);
  
    const { _id, serviceName, description, isBlocked } = params.row;
    // Call your updateStatus function here
    try {
      const response = await editService({_id,serviceName, description, isBlocked}).unwrap();
      toast.success(response.service);
      setSuccess(true);
      setRowId(null);
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      // Handle error appropriately, e.g., show error message
    } finally {
      setLoading(false);
    //   setSuccess(false); // Reset success state here
    }
  };
  
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default ServiceAction;



