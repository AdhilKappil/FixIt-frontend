import JoinTeam from "../components/worker/JoinTeam";
import WorkerLogin from "../components/worker/WorkerLogin";
import { Routes, Route } from "react-router-dom";
import WorkerPrivateRoute from "./privateRoutes/WorkerPrivateRoute";
import Profile from "../pages/worker/Profile";
import AccountInfo from "../components/worker/AccountInfo";
import NewWorks from "../components/worker/NewWorks";
import CommitedWorks from "../components/worker/CommitedWorks";
import WorkViewDetails from "../pages/worker/WorkViewDetails";
import CompletedWork from "../components/worker/CompletedWork";
import Home from "../components/worker/Home";

function WorkerRoutes() {
  return (
    <Routes>
      <Route path="/workerLogin" element={<WorkerLogin />} />
      <Route path="/signup" element={<JoinTeam />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<WorkerPrivateRoute />}>
        <Route path="*" element={<Profile />}>
          <Route path="accountInfo" element={<AccountInfo/>}/>
          <Route path="newWorks" element={<NewWorks/>}/>
          <Route path="commitedWorks" element={<CommitedWorks/>}/>
          <Route path="workViewDetaisl" element={<WorkViewDetails/>}/>
          <Route path="completedWork" element={<CompletedWork/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default WorkerRoutes;
