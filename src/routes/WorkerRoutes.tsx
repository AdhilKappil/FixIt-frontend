import JoinTeam from "../components/worker/JoinTeam";
import WorkerLogin from "../components/worker/WorkerLogin";
import { Routes, Route } from "react-router-dom";
import WorkerPrivateRoute from "./privateRoutes/WorkerPrivateRoute";
import Profile from "../pages/worker/Profile";
import AccountInfo from "../components/worker/AccountInfo";
import NewWorks from "../components/worker/NewWorks";

function WorkerRoutes() {
  return (
    <Routes>
      <Route path="/workerLogin" element={<WorkerLogin />} />
      <Route path="/signup" element={<JoinTeam />} />
      <Route path="*" element={<WorkerPrivateRoute />}>
        <Route path="*" element={<Profile />}>
          <Route path="accountInfo" element={<AccountInfo/>}/>
          <Route path="newWorks" element={<NewWorks/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default WorkerRoutes;
