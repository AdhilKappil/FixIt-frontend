import { CSSProperties, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { IConversation } from "../../@types/schema";
import {
  useSendOtpToEmailStartWorkMutation,
  useVerifyEmailOtpMutation,
} from "../../slices/api/workerApiSlice";
import { toast } from "react-toastify";
import { MyError } from "../../validation/validationTypes";
import { useNavigate } from "react-router-dom";

function Otp(props: { bookingId: string; conversationData: IConversation }) {
  const inputStyles: CSSProperties = {
    width: "2.8rem",
    fontSize: "1.4rem",
    fontWeight: "600",
    height: "2.8rem",
    borderRadius: "7px",
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    backgroundColor: "#F7F7F7",
    border: "1px solid #C7C8CC",
    textAlign: "center",
    // borderColor: ${error ? "#FF204E" : '#C7C8CC'},
    // marginBottom: ${error ? "0px" : '12px'}
  };
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [showResendButton, setShowResendButton] = useState(false);
  const [sendOtpToEmail] = useSendOtpToEmailStartWorkMutation();
  const [verifyEmailOtp] = useVerifyEmailOtpMutation();
  const navigate = useNavigate();

  // for otp timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResendButton(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // resend otp
  const resendOtp = async () => {
    try {
      setTimer(60);
      setShowResendButton(false);
      const res = await sendOtpToEmail({
        email: props.conversationData.userEmail,
        name: props.conversationData.user,
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
    }
  };

  // cheking the enterd otp currect ot not
  const verifyEmailOtpHandler = async () => {
    if(!otp){
      return toast.error("Please enter the OTP")
    }
    if(otp.length<6){
      return toast.error("Please enter 6 digits OTP")
    }
    try {
      const res = await verifyEmailOtp({
        otp,
        email: props.conversationData.userEmail,
        bookingId: props.bookingId,
      }).unwrap();
      toast.success(res.message);
      navigate("/worker/commitedWorks");
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full bg-tertiary shadow rounded-xl">
        <div className="font-Sans text-2xl my-5 flex justify-center">OTP</div>
        <div className="flex justify-center">
          <hr className="border w-4/5" />
        </div>
        <div className="font-Sans text-3xl flex justify-center mt-5">
          Enter OTP
        </div>
        <div className="mt-5 flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span> &nbsp; </span>}
            renderInput={(props) => <input {...props} style={inputStyles} />}
          />
        </div>
        <div className="flex justify-center mt-5">
          {" "}
          {timer > 0 && `Resend OTP in ${timer} seconds`}
        </div>
        <div className="flex justify-center my-5">
          {showResendButton ? (
            <button
              onClick={resendOtp}
              className="bg-primary p-2 w-28 text-white rounded"
            >
              Resend OTP
            </button>
          ) : (
            <button
              onClick={verifyEmailOtpHandler}
              className="bg-primary p-2 w-28 text-white rounded"
            >
              Verify
            </button>
          )}
        </div>
        <div className="flex justify-center h-16">
          <hr className="border w-4/5" />
        </div>
      </div>
    </div>
  );
}

export default Otp;
