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
import { useEffect, useState } from "react";
import { MyError, forgetValues } from "../../validation/validationTypes";
import { useFormik } from "formik";
import { fogotPasswordShema } from "../../validation/yupValidation";

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
    try {
      if (!registerInfo) {
        const email = forgotEmailInfo;
        const res = await otpVerification({ otp, email }).unwrap();
        if (res.success) {
          setForgot(true);
        }
      }
      const { email }: any = registerInfo;
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
          <div>
            <form
              role="form text-left"
              className="md:w-80"
              onSubmit={handleSubmit}
            >
              <div className="p-4 mb-0 text-center bg-white border-b-0 rounded-t-2xl font-Sans font-semibold text-2xl text-primary">
                <h5>Create new password</h5>
              </div>
              <div className="flex justify-center">
                <span className="text-gray-500 text-sm">
                  We'll ask for this password whenever you sign in
                </span>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    name="cpassword"
                    value={values.cpassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    type="password"
                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                  {errors.cpassword && touched.cpassword && (
                    <div className="text-red-500">{errors.cpassword}</div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <button 
                  type="submit"
                  className="bg-primary mb-2 hover:bg-black w-full text-white p-2 rounded-md"
                >
                  Save and Sign in
                </button>
              </div>
            </form>
          </div>
        ) : (
          <form className="form">
            <div className="title text-primary">OTP</div>
            <div className="title text-primary">Verification Code</div>
            <p className="message">
              we have sent a verification code to your email
            </p>
            <div className="mt-5">
              <input
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                placeholder="Enter OTP"
                className="border-b border-gray-300 focus:border-blue-500 outline-none"
              />
            </div>
            {showResendButton ? (
              <button
                onClick={resendOtpHandler}
                className="action bg-primary hover:bg-black"
              >
                Resend OTP
              </button>
            ) : (
              <button
                onClick={submitRegisterHandler}
                className="action bg-primary hover:bg-black"
              >
                Verify me
              </button>
            )}
            <p className="mt-3 text-red-500">
              {timer > 0 && `Resend OTP in ${timer} seconds`}
            </p>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default OTP;
