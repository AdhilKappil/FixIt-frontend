
import Modal from "react-modal";
import { FcGoogle } from "react-icons/fc";
import { CustomStyles } from "./ModalStyle";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal } from "../../slices/modalSlices/loginModal";
import { openSignupModal } from "../../slices/modalSlices/signupModal";
import { RootState } from "../../app/store";
import { FormLogin, MyError } from "../../@types/validationTypes";
import { useFormik } from "formik";
import { loginValidation } from "./Validation";
import SignUp from "./SignUp";
import { useLoginMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredential } from "../../slices/authSlice";


Modal.setAppElement("#root");

function Login() {
  // const [modalIsOpen, setIsOpen] = useState(false);
  const modalIsOpen = useSelector((state: RootState) => state.loginModal.value)
  const dispatch = useDispatch()

  const [login] = useLoginMutation();
  
  function closeModal() {
    dispatch(closeLoginModal())
  }

  const handleSignupButtonClick = () => {
    dispatch(closeLoginModal())
    dispatch(openSignupModal());
  };


  const initialValues : FormLogin= {
    password: "",
    email: "",
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {

        const { password, email } = values; // Destructure values
        const res = await login({ password, email }).unwrap();
        const data = res.data
        const user = {
            name : data.name,
            email : data.email,
            mobile :data.mobile,
            id : data._id
        }
        dispatch(setCredential({...user}))
        dispatch(closeLoginModal())
        toast.success(res.message)
      } catch (err) { 
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
        <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 ">
          <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
              <h5>Login with</h5>
            </div> 
            <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12 justify-center">
              <button className="bg-secondary rounded-md border p-3">
                Continue with Google <FcGoogle size={25} className="inline-block" />
              </button>

              <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
                <p className="z-20 inline px-4 mb-2 font-semibold leading-normal bg-white text-sm text-slate-400">
                  or
                </p>
              </div>
            </div>
            <div className="flex-auto p-4">
              <form role="form text-left" onSubmit={handleSubmit}>
                <div className="mb-4 4">
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
                <div className="text-center">
                  <button  className="bg-primary w-full text-white p-2 rounded-md">Sign in</button>
                </div>
                <p className="mt-4 mb-0 leading-normal text-sm">
                  Already have an account?
                  <button onClick={handleSignupButtonClick}
                    className="font-bold text-slate-700">
                      Sign up
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <SignUp/>
    </div>
  );
}

export default Login;
