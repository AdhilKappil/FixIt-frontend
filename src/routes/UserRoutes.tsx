import { BrowserRouter, Route, Routes } from 'react-router-dom';


function UserRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/worker/*" element={<WorkerRoutes/>} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>    
  </BrowserRouter>
  )
}

export default UserRoutes