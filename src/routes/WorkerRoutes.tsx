import JoinTeam from "../components/worker/JoinTeam";
import WorkerSidebar from "../components/worker/Layout/WorkerSidebar";
import WorkerLogin from "../components/worker/WorkerLogin"
import { Routes, Route,} from 'react-router-dom';
import WorkerPrivateRoute from "../components/worker/WorkerPrivateRoute";


function WorkerRoutes() {
  return (
    <Routes>
    <Route path="/workerLogin" element={<WorkerLogin />} />
    <Route path="signup" element={<JoinTeam />} />
    <Route path="*" element={<WorkerPrivateRoute />}>
    <Route path="*" element={<WorkerSidebar/>}> 
    </Route>
    </Route>
  </Routes>
  )
}

export default WorkerRoutes