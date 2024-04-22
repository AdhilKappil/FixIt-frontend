import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineUser, AiOutlineSchedule } from "react-icons/ai";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import WorkerNavbar from "./WorkerNavbar";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const WorkerSidebar = () => {
  const { workerInfo } = useSelector((state: RootState) => state.auth);

  const menus = [
    { name: "Personal info", link: "profile", icon: AiOutlineUser },
    { name: "New Works", link: "", icon: AiOutlineSchedule },
    { name: "Commited", link: "", icon: FiClock },
    { name: "Completed", link: "", icon: FiCheckCircle },
 
  ];
  const [open, setOpen] = useState(true);
  return (
    <div className=" w-full">
      <WorkerNavbar />
        <section className="flex gap-6 p-5">
          <div
            className={`bg-[#0e0e0e] h-[600px] rounded-lg ${
              open ? "w-72" : "w-16"
            } duration-500 text-gray-100 px-4`}
          >
            <div className="py-3 flex justify-end">
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            {open && (
              <div className="bg-[url(/src/assets/img/workerProfileBackground.png)] rounded-xl grid">
                <div className="mt-3 flex justify-center">
                  <img
                    className="rounded-full w-28"
                    src={workerInfo?.img}
                    alt=""
                  />
                </div>
                <div className="flex justify-center mt-1">
                  <p>{workerInfo?.name}</p>
                </div>
                <div className="flex justify-center mb-2">
                  <p>
                    Joined:{" "}
                    {workerInfo?.joinDate && (
                      <>
                        {new Date(workerInfo.joinDate).getDate()}th{" "}
                        {new Date(workerInfo.joinDate).toLocaleDateString(
                          "en-US",
                          { month: "long" }
                        )}{" "}
                        {new Date(workerInfo.joinDate).getFullYear()}
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}
            <div className="mt-4 flex flex-col gap-4 relative">
              {menus?.map((menu, i) => (
                <Link
                  to={menu?.link}
                  key={i}
                  className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              ))}
            </div>
          </div> 
         {open?
          <div className="w-full shadow-lg rounded-lg bg-white max-sm:hidden p-10 max-sm:p-0">
          <Outlet/>
         </div>:
          <div className="w-full shadow-lg rounded-lg bg-white p-10 max-sm:p-0">
          <Outlet/>
         </div>
         }
        </section>
      </div>
    
  );
};

export default WorkerSidebar;
