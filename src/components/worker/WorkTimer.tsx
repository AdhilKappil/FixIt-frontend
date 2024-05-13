import { useEffect, useState } from "react";
import { IBooking } from "../../@types/schema";

function WorkTimer(props:{item:IBooking}) {

    const [remainingTime, setRemainingTime] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
      } | null>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
      useEffect(() => {
        const calculateRemainingTime = () => {
          const currentDate = new Date();
          const bookingDate = new Date(props.item.date + " " + props.item.startTime);
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
              seconds: seconds
            });
          } else {
            setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          }
        };
    
        calculateRemainingTime();
        const interval = setInterval(calculateRemainingTime, 1000);
    
        return () => clearInterval(interval);
      }, [props.item]);
  return (
    <div>
            <div className="flex justify-center text-primary font-Sans text-2xl font-medium">
              Manage Your Work
            </div>
            <div className="bg-tertiary rounded-xl shadow-md mt-5">
              <div className="text-gray-500 font-Sans font-medium text-lg p-5">
                Booking Id :{" "}
                <span className="text-primary font-medium font-Sans">
                {props.item._id.slice(-8).toUpperCase()}
                </span>
              </div>
              <hr />
              <div className="grid justify-center my-5">
                <div className="flex gap-2 text-4xl font-bold">
                  <p className="">
                    {remainingTime ? String(remainingTime.days).padStart(2, "0") : "00"} :
                  </p>
                  <p className="">
                    {remainingTime ? String(remainingTime.hours).padStart(2, "0") : "00"} :
                  </p>
                  <p className="">
                    {remainingTime ? String(remainingTime.minutes).padStart(2, "0") : "00"} :
                  </p>
                  <p className="">
                    {remainingTime ? String(remainingTime.seconds).padStart(2, "0") : "00"}
                  </p>
                </div>
                <div className="flex mt-3 gap-2">
                  <p className="font-Sans text-lg">Days :</p>
                  <p className="font-Sans text-lg">Hours :</p>
                  <p className="font-Sans text-lg">Minutes :</p>
                  <p className="font-Sans text-lg">Seconds</p>
                </div>
                <button className="bg-primary hover:bg-black text-white rounded p-2 mt-3">
                  Start Your Work
                </button>
              </div>
              <hr />
              <div className="text-gray-500 font-Sans font-medium text-lg p-5">
                Location :{" "}
                <span className="text-gray-400">{props.item.location}</span>
              </div>
            </div>
          </div>
  )
}

export default WorkTimer