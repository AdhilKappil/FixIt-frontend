import { useLocation } from "react-router-dom";
import { IBooking, IConversation } from "../../@types/schema";
import WorkTimer from "../../components/worker/WorkTimer";
import WorkerChat from "../../components/worker/WorkerChat";

function WorkViewDetails() {
  const location = useLocation();
  const item: IBooking = location.state?.item;
  const conversationData:IConversation = location.state?.conversationData;

  return (
    <>
      <div className="flex h-[520px] gap-10">
        <div className="w-1/2 mt-16">
          <WorkTimer item={item}/>
        </div>
        <div className="w-1/2">
          <WorkerChat key="workerChat" conversationData={conversationData}/>
        </div>
      </div>
    </>
  );
}

export default WorkViewDetails;
