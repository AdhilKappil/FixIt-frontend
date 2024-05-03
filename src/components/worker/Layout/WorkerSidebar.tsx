import React, { useState } from "react";
import { AiOutlineUser, AiOutlineSchedule } from "react-icons/ai";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { Link, Outlet, useLocation } from "react-router-dom";
import WorkerNavbar from "./WorkerNavbar";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IoMdMenu } from "react-icons/io";
import AccountInfo from "../AccountInfo";

const WorkerSidebar = () => {
  const { workerInfo } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const menus = [
    { name: "Personal info", link: "accountInfo", icon: AiOutlineUser },
    { name: "New Works", link: "", icon: AiOutlineSchedule },
    { name: "Commited", link: "", icon: FiClock },
    { name: "Completed", link: "", icon: FiCheckCircle },
  ];

  return (
    <div className="w-full">
      <WorkerNavbar />
      <div className="flex justify-center w-full max-sm:mt-4">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="sm:hidden p-3 bg-white rounded-full shadow-lg"
          >
            <IoMdMenu size={26} className="cursor-pointer"/>
          </button>
        )}
      </div>
      <section className="flex gap-6 p-5 max-sm:p-3 max-sm:justify-center">
        <div
          className={`bg-[#0e0e0e] h-[600px] max-sm:h-[570px] fixed ${
            open ? "" : "max-sm:hidden"
          } rounded-lg  ${
            open ? "max-sm:w-80 w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <IoMdMenu
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          {open && (
            <div className="bg-[url(/src/assets/img/workerProfileBackground.png)] rounded-xl grid hover:cursor-pointer">
              <div className="mt-3 flex justify-center">
                <img
                  className="rounded-full w-28"
                  src={workerInfo?.profile_img}
                  alt=""
                />
              </div>
              <div className="flex justify-center mt-1">
                <p>{workerInfo?.name}</p>
              </div>
              <div className="flex justify-center mb-3">
                <p>
                  Joined:{" "}
                  {workerInfo?.createdAt && (
                    <>
                      {new Date(workerInfo.createdAt).getDate()}th{" "}
                      {new Date(workerInfo.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "long" }
                      )}{" "}
                      {new Date(workerInfo.createdAt).getFullYear()}
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
          <div className="mt-4 flex flex-col gap-4 relative sm:hidden">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                onClick={() => setOpen(false)}
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

          <div className="mt-4 flex flex-col gap-4 relative max-sm:hidden">
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
        {open ? (
          <div className="w-full ml-80 shadow-lg rounded-lg bg-white max-sm:hidden p-10 max-sm:p-0">
           {location.pathname === "/worker" ?<AccountInfo/> : <Outlet />}
          </div>
        ) : (
          <div className="w-full sm:ml-24 shadow-lg rounded-lg bg-white p-10 max-sm:p-5 max-sm:mt-1">
               {location.pathname === "/worker" ?<AccountInfo/> : <Outlet />}
          </div>
        )}
      </section>
    </div>
  );
};

export default WorkerSidebar;
