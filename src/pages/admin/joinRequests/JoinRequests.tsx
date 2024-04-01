import { useEffect } from "react";
import { Selected } from "../../../@types/Props";


function JoinRequests({setSelectedLink, link}:Selected) {

  useEffect(() => {
    setSelectedLink(link);
  }, []);

  return (
    <div>Join Requests</div>
  )
}

export default JoinRequests