import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { CustomStyles } from "./ModalStyle";
import { RootState } from "../../app/store";
import "../common/commonStyle.css";
import { useOtpVerificationMutation, useRegisterMutation } from "../../slices/userApiSlice";
import { setCredential } from "../../slices/authSlice";
import { closeOtpModal } from "../../slices/modalSlices/OtpModal";
import { toast } from "react-toastify";
import { useState } from "react";


function OTP() {
  const modalIsOpen = useSelector((state: RootState) => state.OtpModal.value);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state:RootState) => state.auth);
  const [otp, setOtp ] = useState('')

  const [otpVerification] = useOtpVerificationMutation();
  const [register] = useRegisterMutation();

  const submitRegisterHandler = async (e:any) => {
    
    e.preventDefault();
      try {
        const { email}:any = userInfo
        const res = await otpVerification({ otp, email }).unwrap();

        if(res.success){
            console.log('otp ver sucsses');
            
            const { name, password, mobile} : any = userInfo
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
            toast.success('Successfully Registerd')
        }

      } catch (err) {
        toast.error(err?.data?.message || err.error);
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
          <div className="title">OTP</div>
          <div className="title">Verification Code</div>
          <p className="message">
            We have sent a verification code to your email
          </p>
          <div className="mt-5">
            <input
            onChange={(e)=>setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="border-b border-gray-300 focus:border-blue-500 outline-none"
            />
          </div>
          <button onClick={submitRegisterHandler} className="action bg-primary">Verify me</button>
        </form>
      </Modal>
    </div>
  );
}

export default OTP;
