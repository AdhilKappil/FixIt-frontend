import React, { ChangeEvent, useRef, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { FiCheckCircle } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Navbar from "./Navbar";
import Spinner from "../../common/Spinner";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../app/firebase/confiq";
import { MyError } from "../../../validation/validationTypes";
import { toast } from "react-toastify";
import { useSetUserImgMutation } from "../../../slices/userApiSlice";
import { setCredential } from "../../../slices/authSlice";

const UserSidebar = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [userImg, setUserImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(true);
  const [isSumbit, setSubmit] = useState(false);
  const [addProfile] = useSetUserImgMutation();
  const dispatch = useDispatch()

  const menus = [
    { name: "Personal info", link: "personalInfo", icon: AiOutlineUser },
    { name: "Address", link: "", icon: GrLocation },
    { name: "My bookings", link: "", icon: FaCartPlus },
    { name: "Completed", link: "", icon: FiCheckCircle },
  ];

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // for add image the priview
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUserImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // For uploading the profile img
  const handleImageChange = async () => {
    setSubmit(true);
    const fileName = `${Date.now()}.jpg`;
    const storageRef = ref(storage, `/images/userProfile/${fileName}`);
    // Upload the file
    if (userImg) {
  
      const snapshot = await uploadBytes(storageRef, userImg);
      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);
      const profile_img = downloadURL;
      console.log(profile_img);
      
      const _id = userInfo?._id;
      console.log(_id);
      
      try {
        const res = await addProfile({ profile_img, _id }).unwrap();
        console.log(res);
        
        setSubmit(false);
        toast.success(res.message);
        dispatch(setCredential({ ...res.user }));
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        setSubmit(false);
      }
    }
  };

  
  return (
    <div className=" w-full">
      <Navbar />
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
              <div>
                <div className="mt-3 flex justify-center">
                  <img
                    className="rounded-full w-28 h-28 cursor-pointer"
                    src={
                      imagePreview ||
                      userInfo?.profile_img ||
                      "/src/assets/img/images.jpg"
                    }
                    alt=""
                    onClick={handleFileClick}
                  />
                </div>
                {/* Hide the input element */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              {imagePreview ? (
                <div className="flex justify-center mt-3 mb-3">
                  <button
                    onClick={handleImageChange}
                    className="bg-tertiary text-black rounded-md shadow-md w-24 h-8 font-medium"
                  >
                    {isSumbit ? <Spinner /> : "Upload"}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-center mt-1">
                    <p>{userInfo?.name}</p>
                  </div>
                  <div className="flex justify-center mb-3">
                    <p>
                      Joined:{" "}
                      {userInfo?.createdAt && (
                        <>
                          {new Date(userInfo.createdAt).getDate()}th{" "}
                          {new Date(userInfo.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                            }
                          )}{" "}
                          {new Date(userInfo.createdAt).getFullYear()}
                        </>
                      )}
                    </p>
                  </div>
                </>
              )}
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
        {open ? (
          <div className="w-full shadow-lg rounded-lg bg-white max-sm:hidden p-10 max-sm:p-0">
            <Outlet />
          </div>
        ) : (
          <div className="w-full shadow-lg rounded-lg bg-white p-10 max-sm:p-0">
            <Outlet />
          </div>
        )}
      </section>
    </div>
  );
};

export default UserSidebar;
