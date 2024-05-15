import { MdOutlineMail,MdOutlineDriveFileRenameOutline  } from "react-icons/md";
import { BsTelephoneInbound } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { MyError, UpdateUser } from "../../validation/validationTypes";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useUpdateProfileMutation } from "../../slices/api/userApiSlice";
import { validationForUserUpdate } from "../../validation/yupValidation";
import { setCredential } from "../../slices/authSlice";



function AccountInfo() {

  const { userInfo } = useSelector((state:RootState) => state.auth);
  const [updateUser] = useUpdateProfileMutation()
  const dispatch = useDispatch()


  const initialValues : UpdateUser= {
    name: userInfo?.name,
    mobile: userInfo?.mobile,
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationForUserUpdate,
    onSubmit: async (values) => {
      try {
        const _id = userInfo?._id;
        const { name, mobile } = values; // Destructure values
        const res = await updateUser({_id, name, mobile}).unwrap();
        dispatch(setCredential({ ...res.user }));
        toast.success(res.message)
      } catch (err) { 
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });


  return (
    <div>
       <form action="" onSubmit={handleSubmit}>
       <div className="">
           <div className="flex w-full">
            <div className="flex w-1/2 font-Sans font-semibold text-xl">Account info</div>
            <div className="flex justify-end w-1/2">
                <button className="bg-tertiary rounded-md shadow-md w-28 h-10 font-medium">Save</button>
            </div>
           </div>
          <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg ">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <MdOutlineDriveFileRenameOutline  size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">Name</p>
                    <input
                      name="name"
                      value={values.name}
                      placeholder={userInfo?.name}
                      type="text"
                      onChange={handleChange}
                      className="mt-1 w-full hover:border-b bg-tertiary text-black focus:border-black outline-none"
                      />
                        {errors.name && touched.name && (
                        <div className="text-red-500">{errors.name}</div>
                      )}
                </div>
            </div>
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <MdOutlineMail size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">Email Address</p>
                    <p className="mt-1 w-full hover:border-b bg-tertiary  focus:border-black outline-none">{userInfo?.email}</p>
                </div>
            </div>
            <div className="bg-tertiary shadow-sm p-3 flex rounded-lg">
                <div className="bg-white flex justify-center items-center w-12 h-12 rounded-lg">
                <BsTelephoneInbound size={25}/>
                </div>
                <div className="ml-5">
                    <p className="font-medium">Mobile</p>
                    <input
                      name="mobile"
                      value={values.mobile}
                      placeholder={userInfo?.mobile}
                      onChange={handleChange}
                      type="text"
                      className="mt-1 w-full hover:border-b bg-tertiary  focus:border-black outline-none"
                      />
                       {errors.mobile && touched.mobile && (
                    <div className="text-red-500">{errors.mobile}</div>
                  )}
                </div>
            </div>
           </div>
           <div></div>
        </div>
       </form>
    </div>
  )
}

export default AccountInfo