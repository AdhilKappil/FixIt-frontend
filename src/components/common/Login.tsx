import Modal from "react-modal";
import { CustomStyles } from "./ModalStyle";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal } from "../../slices/modalSlices/loginModal";
import { openSignupModal } from "../../slices/modalSlices/signupModal";
import { RootState } from "../../app/store";
import { MyError } from "../../validation/validationTypes";
import { useFormik } from "formik";
import { loginValidation } from "../../validation/yupValidation";
import * as Yup from "yup"; // Import Yup

import SignUp from "./SignUp";
import {
  useGoogleAuthMutation,
  useLoginMutation,
  useSendOTPforgotPasswordMutation,
} from "../../slices/api/userApiSlice";
import { toast } from "react-toastify";
import { setCredential, setForgotEmail } from "../../slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { openOtpModal } from "../../slices/modalSlices/OtpModal";
import Spinner from "./Spinner";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";

Modal.setAppElement("#root");

function Login() {
  const modalIsOpen = useSelector((state: RootState) => state.loginModal.value);
  const [forgot, setForgot] = useState(false);
  const dispatch = useDispatch();
  const [isSumbit, setSubmit] = useState(false);

  const [login] = useLoginMutation();
  const [googleAuth] = useGoogleAuthMutation();
  const [sendOTPforgotPassword] = useSendOTPforgotPasswordMutation();

  function closeModal() {
    setForgot(false);
    dispatch(closeLoginModal());
  }

  const handleSignupButtonClick = () => {
    dispatch(closeLoginModal());
    dispatch(openSignupModal());
  };

  // Formik for login form
  const {
    values: loginValues,
    handleChange: loginHandleChange,
    handleSubmit: loginHandleSubmit,
    errors: loginErrors,
    touched: loginTouched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        const res = await login(values).unwrap();
        dispatch(setCredential({ ...res.data }));
        dispatch(closeLoginModal());
        toast.success(res.message);
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });

  // Formik for forgot password form
  const {
    values: forgotValues,
    handleChange: forgotHandleChange,
    handleSubmit: forgotHandleSubmit,
    errors: forgotErrors,
    touched: forgotTouched,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter your email"),
    }),
    onSubmit: async (values) => {
      setSubmit(true);
      try {
        const { email } = values;
        const name = email.split("@")[0]; // Extract the part before the @ symbol as the name
        dispatch(setForgotEmail(email));
        const res = await sendOTPforgotPassword({ name, email }).unwrap();
        dispatch(closeLoginModal());
        dispatch(openOtpModal());
        setSubmit(false);
        toast.success(res.message);
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });

  interface DecodedCredential {
    name: string;
    email: string;
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={CustomStyles}
        contentLabel="Example Modal"
      >
        <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 ">
          <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            {forgot ? (
              <div className="md:w-80">
                {/* Forgot password form */}
                <form onSubmit={forgotHandleSubmit}>
                  <div className="p-4 mb-0 bg-white border-b-0 rounded-t-2xl font-Sans font-medium text-2xl text-primary">
                    <h5>Find Your Account</h5>
                  </div>
                  <div className="flex ml-4">
                    <span className="text-gray-600 text-sm">
                      Enter the email address with your Fixit account.
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="relative flex items-center mt-1">
                      <MdEmail size={20} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="email"
                        value={forgotValues.email}
                        onChange={forgotHandleChange}
                        placeholder="Email"
                        type="email"
                        className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pl-8 pr-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      />
                      {forgotErrors.email && forgotTouched.email && (
                        <div className="text-red-500">{forgotErrors.email}</div>
                      )}
                    </div>
                    <button className="bg-primary hover:bg-black w-full text-white p-2 rounded-md mt-5">
                      {isSumbit ? <Spinner /> : "Continue"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                {/* Login form */}
                <form onSubmit={loginHandleSubmit}>
                  <div className="p-6 mb-0 text-center font-Sans font-semibold text-2xl text-primary bg-white border-b-0 rounded-t-2xl">
                    <h5>Login</h5>
                  </div>
                  <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12 justify-center">
                    <GoogleLogin
                      onSuccess={async (credentialResponse) => {
                        if (
                          credentialResponse &&
                          credentialResponse.credential
                        ) {
                          const credentialResponseDecoded = jwtDecode(
                            credentialResponse.credential
                          ) as DecodedCredential;

                          const { name, email } = credentialResponseDecoded;

                          const charset =
                            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                          let password = "";

                          for (let i = 0; i < 6; i++) {
                            const randomIndex = Math.floor(
                              Math.random() * charset.length
                            );
                            password += charset.charAt(randomIndex);
                          }

                          try {
                            const res = await googleAuth({
                              name,
                              email,
                              password,
                            }).unwrap();
                            dispatch(setCredential({ ...res.data }));
                            dispatch(closeLoginModal());
                            toast.success(res.message);
                          } catch (err) {
                            toast.error(
                              (err as MyError)?.data?.message ||
                                (err as MyError)?.error
                            );
                          }
                          console.log(credentialResponseDecoded);
                        } else {
                          console.log("Credential not found");
                        }
                      }}
                      onError={() => {
                        toast.error("Login failed");
                      }}
                    />
                    {/* Other login options */}
                    <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
                      <p className="z-20 inline px-4 mb-2 font-semibold leading-normal bg-white text-sm text-slate-400">
                        or
                      </p>
                    </div>
                  </div>
                  <div className="flex-auto p-4">
                    <div className="mb-4">
                      <div className="relative flex items-center">
                        <MdEmail size={19} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          name="email"
                          value={loginValues.email}
                          onChange={loginHandleChange}
                          placeholder="Email"
                          type="email"
                          className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pl-8 pr-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        />
                      </div>
                      {loginErrors.email && loginTouched.email && (
                        <div className="text-red-500">{loginErrors.email}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="relative flex items-center">
                        <IoMdLock
                          size={22}
                          className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          name="password"
                          value={loginValues.password}
                          onChange={loginHandleChange}
                          placeholder="Password"
                          type="password"
                          className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pl-8 pr-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        />
                      </div>
                      {loginErrors.password && loginTouched.password && (
                        <div className="text-red-500">
                          {loginErrors.password}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end mb-3">
                      <button
                        onClick={() => setForgot(true)}
                        className="text-sm font-medium hover:underline text-blue-600"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="text-center">
                      <button className="bg-primary hover:bg-black w-full text-white p-2 rounded-md">
                        Sign in
                      </button>
                    </div>
                    <p className="mt-4 mb-0 leading-normal text-sm">
                      Create new account
                      <button
                        onClick={handleSignupButtonClick}
                        className="font-bold text-slate-700"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </Modal>
      <SignUp />
    </div>
  );
}

export default Login;
