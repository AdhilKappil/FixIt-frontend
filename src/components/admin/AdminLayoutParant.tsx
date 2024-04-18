import { Outlet } from "react-router-dom"
import Navbar from "../../pages/admin/Navbar"

function AdminLayoutParant() {
  return (
   <>
   <Navbar/>
   <Outlet/>
   </>
  )
}

export default AdminLayoutParant