import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserRoutes from "./routes/UserRoutes";
import WorkerRoutes from "./routes/WorkerRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import { createContext, useContext, useMemo} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => useContext(SocketContext);

function App() {

  const socket = useMemo(()=>{
    return io("http://localhost:3000");
  },[])

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <div>
          <ToastContainer autoClose={2000} />
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/worker/*" element={<WorkerRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
