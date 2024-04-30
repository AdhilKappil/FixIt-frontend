import { MdOutlineMail,MdOutlineDriveFileRenameOutline  } from "react-icons/md";
import { BsTelephoneInbound } from "react-icons/bs";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { RiUserStarLine } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";



function AccountInfo() {

  const { workerInfo } = useSelector((state:RootState) => state.auth);

  return (
    <div>
        <div className="">
           <div className="flex w-full">
            <div className="flex w-1/2 font-Sans font-semibold text-xl">Account info</div>
            <div className="flex justify-end w-1/2">
                <button className="bg-tertiary rounded-md shadow-md w-28 h-10 font-medium">Save</button>
            </div>
           </div>
           <div className="mt-5 grid grid-cols-2 gap-5 max-lg:grid-cols-1">
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg ">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <MdOutlineDriveFileRenameOutline  size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">Name</p>
                    <input
                      name="email"
                      value={workerInfo?.name}
                      type="email"
                      className="mt-1 w-full hover:border-b bg-tertiary  focus:border-black outline-none"
                      />
                </div>
            </div>
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <MdOutlineMail size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">Email Address</p>
                    <input
                      name="email"
                      value={workerInfo?.email}
                      type="email"
                      className="mt-1 w-full hover:border-b bg-tertiary  focus:border-black outline-none"
                      />
                </div>
            </div>
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <BsTelephoneInbound size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">Mobile</p>
                    <input
                      name="email"
                      value={workerInfo?.mobile}
                      type="email"
                      className="mt-1 w-full hover:border-b bg-tertiary  focus:border-black outline-none"
                      />
                </div>
            </div>
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <MdOutlineMiscellaneousServices  size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">Service</p>
                    <input
                      name="email"
                      value={workerInfo?.service}
                      type="email"
                      className="mt-1 w-full hover:border-b bg-tertiary  focus:border-black outline-none"
                      />
                </div>
            </div>
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <RiUserStarLine  size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">Experience</p>
                    <input
                      name="email"
                      value={workerInfo?.experience}
                      type="email"
                      className="mt-1 w-full hover:border-b bg-tertiary  focus:border-black outline-none"
                      />
                </div>
            </div>
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <MdOutlineLocationOn  size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">District</p>
                    <input
                      name="email"
                      value={workerInfo?.district}
                      type="email"
                      className="mt-1 w-full hover:border-b bg-tertiary  focus:border-black outline-none"
                      />
                </div>
            </div>
           </div>
           <div></div>
        </div>
    </div>
  )
}

export default AccountInfo