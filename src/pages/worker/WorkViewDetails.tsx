import { useLocation } from "react-router-dom";
import { IBooking, IConversation } from "../../@types/schema";
import WorkTimer from "../../components/worker/WorkTimer";
import WorkerChat from "../../components/worker/WorkerChat";
import { useState } from "react";
import OtpConfirm from "../../components/worker/OtpConfirm";

function WorkViewDetails() {
  const location = useLocation();
  const item: IBooking = location.state?.item;
  const conversationData:IConversation = location.state?.conversationData;
  const [otpConfirm, setOtpConfirm] = useState(false)

  return (
    <>
      <div className="grid lg:flex gap-10">
        <div className="lg:w-1/2 mt-10">
        <div className="flex justify-center text-primary font-Sans text-2xl font-medium">
              Manage Your Work
            </div>
          {otpConfirm ? <OtpConfirm/>:
          <WorkTimer item={item} setOtpConfirm={setOtpConfirm}/>
          }
        </div>
        <div className="lg:w-1/2">
          <WorkerChat key="workerChat" conversationData={conversationData}/>
        </div>
      </div>
    </>
  );
}

export default WorkViewDetails;
