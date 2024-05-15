import { useEffect, useState } from "react";
import { IBooking, IConversation } from "../../@types/schema";
import { toast } from "react-toastify";
import { MyError } from "../../validation/validationTypes";
import { useSendOtpToEmailStartWorkMutation } from "../../slices/api/workerApiSlice";
function WorkTimer(props: {
  item: IBooking;
  conversationData: IConversation;
  setOtpConfirm: (value: boolean) => void;
}) {
  const [sendOtpToEmail] = useSendOtpToEmailStartWorkMutation();

  const [remainingTime, setRemainingTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentDate = new Date();
      const bookingDate = new Date(
        props.item.date + " " + props.item.startTime
      );
      const timeDifference = bookingDate.getTime() - currentDate.getTime();

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setRemainingTime({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        });
      } else {
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [props.item]);

  const handleStartWork = async () => {
    try {
      props.setOtpConfirm(true);
      const res = await sendOtpToEmail({
        email: props.conversationData.userEmail,
        name: props.conversationData.user,
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
    }
  };

  return (
    <div>
      <div className="bg-tertiary rounded-xl shadow mt-10">
        <div className="text-gray-500 font-Sans font-medium text-xl p-7">
          Booking Id :{" "}
          <span className="text-primary font-medium font-Sans">
            {props.item._id.slice(-8).toUpperCase()}
          </span>
        </div>
        <hr />
       {props.item.price === 1 ? 
       <div>Work Started you can genarate the bill after work</div>
       : <div className="grid justify-center my-7">
       <div className="flex gap-3 text-4xl font-bold">
         <p className="">
           {remainingTime
             ? String(remainingTime.days).padStart(2, "0")
             : "00"}{" "}
           :
         </p>
         <p className="">
           {remainingTime
             ? String(remainingTime.hours).padStart(2, "0")
             : "00"}{" "}
           :
         </p>
         <p className="">
           {remainingTime
             ? String(remainingTime.minutes).padStart(2, "0")
             : "00"}{" "}
           :
         </p>
         <p className="">
           {remainingTime
             ? String(remainingTime.seconds).padStart(2, "0")
             : "00"}
         </p>
       </div>
       <div className="flex mt-5 gap-3">
         <p className="font-Sans text-lg">Days :</p>
         <p className="font-Sans text-lg">Hours :</p>
         <p className="font-Sans text-lg">Minutes :</p>
         <p className="font-Sans text-lg">Seconds</p>
       </div>
       <button
         onClick={handleStartWork}
         className="bg-primary hover:bg-black text-white rounded p-2 mt-5"
       >
         Start Your Work
       </button>
     </div>
       }
        <hr />
        <div className="text-gray-500 font-Sans font-medium text-lg p-5">
          Location :{" "}
          <span className="text-gray-400">{props.item.location}</span>
        </div>
      </div>
    </div>
  );
}

export default WorkTimer;
