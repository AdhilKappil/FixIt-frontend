import { useEffect } from "react";
import { Selected } from "../../../@types/Props"


function Services_Mgmt({setSelectedLink, link}:Selected) {

  useEffect(() => {
    setSelectedLink(link);
  }, []);

  return (
    <div>Services</div>
  )
}

export default Services_Mgmt