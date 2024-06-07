import { useFormik } from "formik";
import { FormLogin, MyError } from "../../validation/validationTypes";
import { loginValidation } from "../../validation/yupValidation";
import { useWorkerLoginMutation } from "../../slices/api/workerApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setWorkerCredential } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../app/store";

function WorkerLogin() {
  const [login] = useWorkerLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workerInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (workerInfo) {
      navigate("/worker");
    }
  }, [navigate, workerInfo]);

  const initialValues: FormLogin = {
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
        dispatch(setWorkerCredential({ ...res.data }));
        navigate("/worker");
        toast.success(res.message);
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });

  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <img className="w-28" src="/src/assets/icons/adhil-02.png" alt="" />
        </div>
        <div className="my-auto mx-auto flex flex-col justify-center px-6 md:justify-start lg:w-[28rem]">
          <p className="font-Sans text-primary text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
            Welcome back <br />
            to <span className="text-yellow-500">FixIt</span>
          </p>
          <p className="mt-6 text-center font-medium md:text-left">
            Sign in to your account below.
          </p>

          <form
            className="flex flex-col items-stretch pt-3 md:pt-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>
              {errors.email && touched.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  name="password"
                  type="password"
                  id="login-password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
              </div>
              {errors.password && touched.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-black w-full text-white p-2 rounded-md"
            >
              Sign in
            </button>
          </form>
          <div className="py-6 text-center">
            <p className="text-gray-600">
              Don't have an account?
              <button
                onClick={() => navigate("/worker/signup")}
                className="whitespace-nowrap font-semibold text-gray-900 underline underline-offset-4 hover:text-blue-500"
              >
                Join our team for free.
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden h-screen select-non bg-primary bg-gradient-to-br md:block md:w-1/2">
        <div className="mt-16 px-8 text-white xl:w-[40rem]">
          <p className="my-6 text-3xl font-semibold leading-10">
            Find your happiness by offering your best skills at the right place
            and time.
            <span className="abg-white whitespace-nowrap py-2 text-yellow-500">
              We'll achieve greatness.
            </span>
          </p>
        </div>
        <div className="flex justify-center mt-8">
        <img className="ml-8 w-11/12 max-w-lg rounded-lg" src="/assets/img/workerLogin.png" />
        </div>
      </div>
    </div>
  );
}

export default WorkerLogin;
