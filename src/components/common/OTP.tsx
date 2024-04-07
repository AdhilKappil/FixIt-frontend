import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { CustomStyles } from "./ModalStyle";
import { RootState } from "../../app/store";
import "../common/commonStyle.css";
import { useOtpVerificationMutation, useRegisterMutation, useSendOtpToEmailMutation } from "../../slices/userApiSlice";
import { clearRegister, setCredential } from "../../slices/authSlice";
import { closeOtpModal } from "../../slices/modalSlices/OtpModal";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MyError } from "../../@types/validationTypes";


function OTP() {
  const modalIsOpen = useSelector((state: RootState) => state.OtpModal.value);
  const dispatch = useDispatch();
  const { registerInfo } = useSelector((state:RootState) => state.auth);
  const [otp, setOtp ] = useState('')

  const [otpVerification] = useOtpVerificationMutation();
  const [register] = useRegisterMutation();
  const [sendOtpToEmail] = useSendOtpToEmailMutation();


  const [timer, setTimer] = useState(60);
  const [showResendButton, setShowResendButton] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (modalIsOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResendButton(true);
    }
  
    return () => clearInterval(interval);
  }, [modalIsOpen, timer]);
  
   // Function to handle resending OTP
   const resendOtpHandler = async(e:any) => {
    // Reset the timer and hide the resend button
    e.preventDefault();
    setTimer(60);
    setShowResendButton(false);
    try {
        const { name,email}:any = registerInfo // Destructure values
        const res = await sendOtpToEmail({ name, email }).unwrap();
        toast.success(res.message)
      } catch (err) { 
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
  };

  const submitRegisterHandler = async (e:any) => {
    
    e.preventDefault();
      try {
        const { email}:any = registerInfo
        const res = await otpVerification({ otp, email }).unwrap();

        if(res.success){
            console.log('otp ver sucsses');
            
            const { name, password, mobile} : any = registerInfo
            const result = await register({ name, email, mobile, password}).unwrap()
            const data = result.user
            const user = {
                name : data.name,
                email : data.email,
                mobile :data.mobile,
                id : data._id
            }
            dispatch(setCredential({...user}))
            dispatch(closeOtpModal())    
            dispatch(clearRegister())
            toast.success('Successfully Registerd')
        }

      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    
  };


  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        style={CustomStyles}
        contentLabel="Example Modal"
      >
        <form className="form">
          <div className="title text-primary">OTP</div>
          <div className="title text-primary">Verification Code</div>
          <p className="message">
            we have sent a verification code to your email
          </p>
          <div className="mt-5">
            <input
            onChange={(e)=>setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="border-b border-gray-300 focus:border-blue-500 outline-none"
            />
          </div>
          {showResendButton ? (
            <button onClick={resendOtpHandler} className="action bg-primary">
              Resend OTP
            </button>
          ) : (
            <button onClick={submitRegisterHandler} className="action bg-primary">
              Verify me
            </button>
          )}
          <p className="mt-3 text-red-500">
            {timer > 0 ? `Resend OTP in ${timer} seconds` : ''}
          </p>
        </form>
      </Modal>
    </div>
  );
}

export default OTP;
