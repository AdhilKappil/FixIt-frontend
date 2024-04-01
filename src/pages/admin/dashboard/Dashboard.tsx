import { useEffect } from "react";
import { Selected } from "../../../@types/Props";


function Dashboard({setSelectedLink, link}:Selected) {

    useEffect(() => {
        setSelectedLink(link);
      }, []);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard