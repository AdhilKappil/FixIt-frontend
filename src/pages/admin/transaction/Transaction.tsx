import { useEffect } from "react";
import { Selected } from "../../../@types/Props"


function Transaction({setSelectedLink, link}:Selected) {

  useEffect(() => {
    setSelectedLink(link);
  }, []);

  return (
    <div>Transaction</div>
  )
}

export default Transaction