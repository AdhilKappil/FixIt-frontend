
import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const WorkerPrivateRoute = () => {
    const { workerInfo } = useSelector((state:RootState) => state.auth);
  return workerInfo ?<Outlet/> :  <Navigate to="/worker/workerLogin" replace />
}

export default WorkerPrivateRoute