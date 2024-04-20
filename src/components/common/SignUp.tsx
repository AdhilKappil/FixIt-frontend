
import Modal from "react-modal";
import { CustomStyles } from "./ModalStyle";
import { useDispatch, useSelector } from "react-redux";
import { closeSignupModal } from "../../slices/modalSlices/signupModal";
import { openLoginModal } from "../../slices/modalSlices/loginModal";
import { useFormik } from "formik";
import { validationSchema } from "../../validation/yupValidation";
import { RootState } from "../../app/store";
import { toast } from "react-toastify";
import { useSendOtpToEmailMutation } from "../../slices/userApiSlice";
import { clearRegister, setRegister } from "../../slices/authSlice";
import OTP from "./OTP";
import { openOtpModal } from "../../slices/modalSlices/OtpModal";
import { FormValues, MyError } from "../../validation/validationTypes";
import Spinner from "./Spinner";
import { useState } from "react";


function SignUp() {
    
  const modalIsOpen = useSelector((state: RootState) => state.signupModal.value)
  const [sendOtpToEmail] = useSendOtpToEmailMutation();
  const [isSumbit, setSubmit] = useState(false)
  const dispatch = useDispatch()


  const initialValues : FormValues= {
    name: "",
    mobile: "",
    password: "",
    cpassword: "",
    email: "",
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(setRegister({ ...values }));
      setSubmit(true)
      try {
        const { name, email } = values; // Destructure values
        const res = await sendOtpToEmail({ name, email }).unwrap();
        dispatch(closeSignupModal())
        dispatch(openOtpModal())
        setSubmit(false)
        toast.success(res.message)
      } catch (err) { 
        dispatch(clearRegister());
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });
  
  function closeModal() { 
    dispatch(closeSignupModal())
    
  }

  const handleSigninButtonClick = () => {
    dispatch(closeSignupModal());
    dispatch(openLoginModal())
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
      <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 mb-0 text-center font-Sans font-semibold text-2xl text-primary bg-white border-b-0 rounded-t-2xl">
            <h5>Register</h5>
          </div> 
          <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12 justify-center">
           
          </div>
          <div className="flex-auto">
            <form role="form text-left" className="md:w-80" onSubmit={handleSubmit}>
            <div className="mb-4">
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Name"
                    type="text"
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500">{errors.name}</div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    placeholder="Mobile"
                    type="text"
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"                  />
                  {errors.mobile && touched.mobile && (
                    <div className="text-red-500">{errors.mobile}</div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"                  />
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
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"                  />
                  {errors.cpassword && touched.cpassword && (
                    <div className="text-red-500">{errors.cpassword}</div>
                  )}
                </div>
              <div className="text-center">
                <button type="submit" className="bg-primary hover:bg-black w-full text-white p-2 rounded-md">
                  {isSumbit ? <Spinner/> : "Sign Up"} </button>
              </div>
              <p className="mt-4 mb-0 leading-normal text-sm">
                Already have an account?
                <button onClick={handleSigninButtonClick}
                    className="font-bold text-slate-700">
                      Sign in
                  </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Modal>
    <OTP/>
  </div>
  )
}

export default SignUp