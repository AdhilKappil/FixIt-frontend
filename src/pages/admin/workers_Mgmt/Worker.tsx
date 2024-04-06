import { useEffect } from "react";
import { Selected } from "../../../@types/Props";
import { gridClasses } from "@mui/material";
import { grey } from "@mui/material/colors";

function Worker({setSelectedLink, link}:Selected) {

  useEffect(() => {
    setSelectedLink(link);
  }, []);

  return (
    <div>
      Workers
      <div className="flex bg-slate-700 h-96 gap-10" style={{
        
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        
      }}>
        <div className="w-1/5 bg-gray-300"></div>
        <div className="w-1/5 bg-gray-400"></div>
        <div className="w-1/5 bg-black"></div>
        <div className="w-1/5 bg-gray-800"></div>
        <div className="w-1/5 bg-zinc-800"></div>
      </div>
    </div>
  )
}

export default Worker