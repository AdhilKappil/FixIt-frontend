import { MdOutlineMail, MdOutlineDriveFileRenameOutline, MdOutlineMiscellaneousServices, MdOutlineLocationOn } from "react-icons/md";
import { BsTelephoneInbound } from "react-icons/bs";
import { RiUserStarLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetWorkerMutation } from "../../slices/api/workerApiSlice";
import { useEffect, useState } from "react";

function AccountInfo() {
  const { workerInfo } = useSelector((state: RootState) => state.auth);
  const [getWorker] = useGetWorkerMutation();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchWorker() {
      const email = workerInfo?.email;
      try {
        const res = await getWorker({ email }).unwrap();
        setBalance(res.worker.wallet); // Ensure using lowercase 'wallet'
      } catch (error) {
        console.log(error);
      }
    }
    if (workerInfo?.email) {
      fetchWorker();
    }
  }, [workerInfo, getWorker]); // Add dependencies to ensure it only runs once

  return (
    <div>
      <div className="">
        <div className="font-Sans font-semibold text-xl text-primary">My Wallet</div>
        <div className="bg-gray-700 w-80 rounded-lg mt-3">
          <div className="flex">
            <div className="w-2/3 p-5">
              <p className="text-white font-semibold text-3xl mt-2 font-Sans">Balance</p>
              <p className="text-white font-bold text-5xl mt-7 font-Sans">₹ {balance}</p>
            </div>
            <div className="">
              <img className="" src="/assets/icons/wallet_icone.png" alt="Wallet Icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex w-full">
          <div className="flex w-1/2 font-Sans font-semibold text-xl text-primary">Account info</div>
          <div className="flex justify-end w-1/2">
            <button className="bg-tertiary rounded-md shadow-md w-28 h-10 font-medium">Save</button>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
            <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
              <MdOutlineDriveFileRenameOutline size={25} />
            </div>
            <div className="ml-5">
              <p className="font-medium">Name</p>
              <input
                name="name"
                value={workerInfo?.name}
                type="text"
                className="mt-1 w-full hover:border-b bg-tertiary focus:border-black outline-none"
                readOnly
              />
            </div>
          </div>
          <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
            <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
              <MdOutlineMail size={25} />
            </div>
            <div className="ml-5">
              <p className="font-medium">Email Address</p>
              <input
                name="email"
                value={workerInfo?.email}
                type="email"
                className="mt-1 w-full hover:border-b bg-tertiary focus:border-black outline-none"
                readOnly
              />
            </div>
          </div>
          <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
            <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
              <BsTelephoneInbound size={25} />
            </div>
            <div className="ml-5">
              <p className="font-medium">Mobile</p>
              <input
                name="mobile"
                value={workerInfo?.mobile}
                type="text"
                className="mt-1 w-full hover:border-b bg-tertiary focus:border-black outline-none"
                readOnly
              />
            </div>
          </div>
          <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
            <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
              <MdOutlineMiscellaneousServices size={25} />
            </div>
            <div className="ml-5">
              <p className="font-medium">Service</p>
              <input
                name="service"
                value={workerInfo?.service}
                type="text"
                className="mt-1 w-full hover:border-b bg-tertiary focus:border-black outline-none"
                readOnly
              />
            </div>
          </div>
          <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
            <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
              <RiUserStarLine size={25} />
            </div>
            <div className="ml-5">
              <p className="font-medium">Experience</p>
              <input
                name="experience"
                value={workerInfo?.experience}
                type="text"
                className="mt-1 w-full hover:border-b bg-tertiary focus:border-black outline-none"
                readOnly
              />
            </div>
          </div>
          <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
            <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
              <MdOutlineLocationOn size={25} />
            </div>
            <div className="ml-5">
              <p className="font-medium">District</p>
              <input
                name="district"
                value={workerInfo?.district}
                type="text"
                className="mt-1 w-full hover:border-b bg-tertiary focus:border-black outline-none"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
