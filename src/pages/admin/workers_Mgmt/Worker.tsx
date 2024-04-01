import { useEffect } from "react";
import { Selected } from "../../../@types/Props";

function Worker({setSelectedLink, link}:Selected) {

  useEffect(() => {
    setSelectedLink(link);
  }, []);

  return (
    <div>
      Workers
      <div className="flex bg-slate-700 h-96 gap-10">
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