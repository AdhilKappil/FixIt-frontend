import JoinTeam from "../components/worker/JoinTeam";
import WorkerLogin from "../components/worker/WorkerLogin";
import { Routes, Route } from "react-router-dom";
import WorkerPrivateRoute from "./privateRoutes/WorkerPrivateRoute";
import Profile from "../pages/worker/Profile";
import AccountInfo from "../components/worker/AccountInfo";

function WorkerRoutes() {
  return (
    <Routes>
      <Route path="/workerLogin" element={<WorkerLogin />} />
      <Route path="/signup" element={<JoinTeam />} />
      <Route path="*" element={<WorkerPrivateRoute />}>
        <Route path="*" element={<Profile />}>
          <Route path="accountInfo" element={<AccountInfo/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default WorkerRoutes;
