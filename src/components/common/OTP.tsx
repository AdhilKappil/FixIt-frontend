import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { CustomStyles } from "./ModalStyle";
import { RootState } from "../../app/store";
import "../common/commonStyle.css";
import {
  useForgotPasswordMutation,
  useOtpVerificationMutation,
  useRegisterMutation,
  useSendOtpToEmailMutation,
} from "../../slices/api/userApiSlice";
import { clearForgotEmail, clearRegister, setCredential } from "../../slices/authSlice";
import { closeOtpModal } from "../../slices/modalSlices/OtpModal";
import { toast } from "react-toastify";
import { CSSProperties, useEffect, useState } from "react";
import { MyError, forgetValues } from "../../validation/validationTypes";
import { useFormik } from "formik";
import { fogotPasswordShema } from "../../validation/yupValidation";
import OtpInput from "react-otp-input";
import { IoMdLock } from "react-icons/io";


function OTP() {
  const modalIsOpen = useSelector((state: RootState) => state.OtpModal.value);
  const dispatch = useDispatch();
  const { registerInfo } = useSelector((state: RootState) => state.auth);
  const { forgotEmailInfo } = useSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState("");
  const [forgot, setForgot] = useState(false);

  const [otpVerification] = useOtpVerificationMutation();
  const [register] = useRegisterMutation();
  const [sendOtpToEmail] = useSendOtpToEmailMutation();
  const [forgotPassword] = useForgotPasswordMutation()

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
  const resendOtpHandler = async (e: any) => {
    // Reset the timer and hide the resend button
    e.preventDefault();
    setTimer(60);
    setShowResendButton(false);
    try {
      const { name, email }: any = registerInfo; // Destructure values
      const res = await sendOtpToEmail({ name, email }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
    }
  };

  const submitRegisterHandler = async (e: any) => {
    e.preventDefault();
    if(!otp){
      return toast.error("Please enter the OTP")
    }
    if(otp.length<6){
      return toast.error("Please enter 6 digits OTP")
    }
    try {
      if (!registerInfo) {
        const email = forgotEmailInfo;
        const res = await otpVerification({ otp, email }).unwrap();
        if (res.success) {
          setForgot(true);
        }
      }
      const { email }: any = registerInfo;
      console.log(otp,"otp");
        console.log("submit");
      const res = await otpVerification({ otp, email }).unwrap();

      if (res.success) {
        const { name, password, mobile }: any = registerInfo;
        const result = await register({
          name,
          email,
          mobile,
          password,
        }).unwrap();
        dispatch(setCredential({ ...result.user }));
        dispatch(closeOtpModal());
        dispatch(clearRegister());
        toast.success("Successfully Registerd");
      }
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
    }
  };

  function closeModal() {
    dispatch(closeOtpModal());
    dispatch(clearRegister());
  }
 
  const initialValues: forgetValues = {
    password: "",
    cpassword: "",
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: fogotPasswordShema,
    onSubmit: async (values) => {
      console.log('Form submitted'); // Check if handleSubmit is being called
      try {
        const email = forgotEmailInfo;
        const { password } = values; // Destructure values
        const res = await forgotPassword({ password, email }).unwrap();
        dispatch(setCredential({ ...res.user }));
        dispatch(closeOtpModal());
        dispatch(clearForgotEmail());
        toast.success(res.message);
      } catch (err) {
        dispatch(clearRegister());
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });

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
  

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={CustomStyles}
        contentLabel="Example Modal"
      >
        {forgot ? (
          <div className="">
            <form
              role="form text-left"
              className="md:w-80"
              onSubmit={handleSubmit}
            >
              <div className="p-4 mb-0 text-center bg-white border-b-0 rounded-t-2xl font-Sans text-2xl text-primary">
                <h5>Create new password</h5>
              </div>
              <div className="flex justify-center">
                <span className="text-gray-500 text-sm">
                  We'll ask this password whenever you sign in
                </span>
              </div>
              <div className="p-4">
              <div className="mb-4">
                  <div className="relative flex items-center">
                    <IoMdLock size={22} className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Password"
                      type="password"
                      className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pl-8 pr-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    />
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
                <div className="mb-4">
                  <div className="relative flex items-center">
                    <IoMdLock size={22} className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name="cpassword"
                      value={values.cpassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      type="password"
                      className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pl-8 pr-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    />
                  </div>
                  {errors.cpassword && touched.cpassword && (
                    <div className="text-red-500">{errors.cpassword}</div>
                  )}
                </div>
              <div className="text-center">
                <button 
                  type="submit"
                  className="bg-primary my-2 hover:bg-black w-full text-white p-2 rounded-md"
                >
                  Save 
                </button>
              </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="">
          <div className="w-full px-10">
            <div className="font-Sans text-2xl my-5 flex justify-center">OTP</div>
            <div className="flex justify-center">
              <hr className="border w-full" />
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
                  onClick={resendOtpHandler}
                  className="bg-primary p-2 w-28 text-white rounded"
                >
                  Resend OTP
                </button>
              ) : (
                <button
                  onClick={submitRegisterHandler}
                  className="bg-primary p-2 w-28 text-white rounded"
                >
                  Verify
                </button>
              )}
            </div>
            <div className="flex justify-center h-10">
             <hr className="border w-full" />
            </div>
          </div>
        </div>
        )}
      </Modal>
    </div>
  );
}

export default OTP;
