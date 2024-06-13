import { useLocation } from "react-router-dom";
import { IBooking, IConversation } from "../../@types/schema";
import WorkTimer from "../../components/worker/WorkTimer";
import WorkerChat from "../../components/worker/WorkerChat";
import { useState } from "react";
import Otp from "../../components/worker/Otp";
import LocationTracking from "../../components/worker/LocationTracking";

function WorkViewDetails() {
  const location = useLocation();
  const item: IBooking = location.state?.item;
  const conversationData:IConversation = location.state?.conversationData;
  const [otpConfirm, setOtpConfirm] = useState(false)
  

  return (
    <>
     <div>
     <div className="grid lg:flex gap-10">
        <div className="lg:w-1/2 mt-10">
        <div className="flex justify-center text-primary font-Sans text-2xl font-medium">
              Manage Your Work
            </div>
          {otpConfirm ? <Otp bookingId={item._id} conversationData={conversationData}/>:
          <WorkTimer item={item} conversationData={conversationData} setOtpConfirm={setOtpConfirm}/>
          }
        </div>
        <div className="lg:w-1/2">
          <WorkerChat key="workerChat" conversationData={conversationData}/>
        </div>
      </div>
      <div className="mt-10">
        <LocationTracking bookings={item}/>
      </div>
     </div>
    </>
  );
}

export default WorkViewDetails;
