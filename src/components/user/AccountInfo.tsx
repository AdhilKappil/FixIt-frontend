import { MdOutlineMail,MdOutlineDriveFileRenameOutline  } from "react-icons/md";
import { BsTelephoneInbound } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";


function AccountInfo() {

  const { userInfo } = useSelector((state:RootState) => state.auth);

  return (
    <div>
        <div className="">
           <div className="flex w-full">
            <div className="flex w-1/2 font-Sans font-semibold text-xl">Account info</div>
            <div className="flex justify-end w-1/2">
                <button className="bg-tertiary rounded-md shadow-md w-28 h-10 font-medium">Save</button>
            </div>
           </div>
           <div className="mt-5 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg ">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <MdOutlineDriveFileRenameOutline  size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">Name</p>
                    <input
                      name="email"
                      value={userInfo?.name}
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
                      value={userInfo?.email}
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
                      value={userInfo?.mobile}
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