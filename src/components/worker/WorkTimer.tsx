import React, { useEffect, useState } from "react";
import { IBooking, IConversation } from "../../@types/schema";
import { toast } from "react-toastify";
import { MyError } from "../../validation/validationTypes";
import { useGenerateBillMutation, useSendOtpToEmailStartWorkMutation } from "../../slices/api/workerApiSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


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

  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [hour, setHour] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null)
  const [generateBill] = useGenerateBillMutation()
  const navigate = useNavigate()
  
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

  const handleGenetateBill = async()=>{
    if(!hour){
      setHour(0)
      return
    }
    let price 
    if(hour<=1){
      price = props.item.firstHourCharge
    }else{
      price = props.item.firstHourCharge + props.item.laterHourCharge * (hour-1)
      if(minutes){
        price += Math.round((props.item.laterHourCharge / 60) * minutes)
      }
    }

    try {
      const res = await generateBill({price,_id:props.item._id}).unwrap()
      if(res.message === "You already generated the bill"){
        toast.error(res.message)
      }else{
        Swal.fire({
          title: res.message,
          text: "Please verify the amount received from the client",
          icon: "success"
        });
      }
      navigate('/worker/completedWork')
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
    }
  }

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
        {props.item.price === 1? (
          <div>
            <div className="mt-7 flex justify-center">
              <select
                id="service"
                className="w-3/5 rounded border p-2 text-gray-400"
                onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setHour(parseInt(e.target.value))}
              >
                <option value="">Select Worked hours</option>
                {hours.map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-7 flex justify-center">
              <input type="number"
              placeholder="Any Extra minutes ?"
              className="w-3/5 p-2" 
              onChange={(e)=>setMinutes(parseInt(e.target.value))}
              />
            </div>
            {hour === 0 &&
            <div className="flex justify-center">
            <p className="text-red-700 w-3/5">Please select worked hous</p>
          </div>
            }
            <div className="flex justify-center">
            <button onClick={handleGenetateBill}
              className="w-3/5 font-Sans my-7 bg-primary hover:bg-black text-white rounded p-2"
            >
              Generate bill
            </button>
            </div>
          </div>
        ) : (
          <div className="grid justify-center my-7">
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
        )}
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
