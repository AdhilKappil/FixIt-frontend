import { useFormik } from "formik";
import { FormLogin, MyError } from "../../validation/validationTypes";
import { loginValidation } from "../../validation/yupValidation";
import { useAdminLoginMutation } from "../../slices/adminApiSlices";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAdminCredentials } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";


function AdminLogin() {

    const dispatch = useDispatch()
    const [login] = useAdminLoginMutation();
    const navigate = useNavigate()

  const initialValues: FormLogin = {
    password: "",
    email: "",
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        console.log(values);
        
        const { password, email } = values; // Destructure values
        const res = await login({ password, email }).unwrap();
        dispatch(setAdminCredentials({ ...res.data}));
        navigate('/admin')
        toast.success(res.message);
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
        <form action="" onSubmit={handleSubmit}>
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Log In</div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
          />
          {errors.email && touched.email && (
            <div className="text-red-500">{errors.email}</div>
          )}
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
        <input
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
          />
          {errors.password && touched.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>

        <button
          className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
        >
          LOG IN
        </button>
      </section>
        </form>
    </main>
  );
}

export default AdminLogin;
