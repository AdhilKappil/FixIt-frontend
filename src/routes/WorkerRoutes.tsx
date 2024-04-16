import JoinTeam from "../components/worker/JoinTeam";
import WorkerLogin from "../components/worker/WorkerLogin"
import { Routes, Route,} from 'react-router-dom';


function WorkerRoutes() {
  return (
    <Routes>
    <Route path="/" element={<WorkerLogin />} />
    <Route path="signup" element={<JoinTeam />} />
  </Routes>
  )
}

export default WorkerRoutes