import { useEffect, useState } from "react";
import { useGetServiceMutation } from "../../slices/api/adminApiSlices";
import { useFormik } from "formik";
import { validationWrokerJoin } from "../../validation/yupValidation";
import { IWorkerJoin, MyError } from "../../validation/validationTypes";
import { toast } from "react-toastify";
import { useWorkerRegisterMutation } from "../../slices/api/workerApiSlice";
import { storage } from "../../app/firebase/confiq";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Swal from "sweetalert2";



function JoinTeam() {
  const [service, setService] = useState<string[]>();
  const [getService] = useGetServiceMutation();
  const [register] = useWorkerRegisterMutation();
  const [isSumbit, setSubmit] = useState(false)
  const navigate = useNavigate()
  const { workerInfo } = useSelector((state:RootState) => state.auth);

  useEffect(() => {
    if(workerInfo){
      navigate('/worker')
    }
    async function fetchUser() {
      try {
        const res = await getService("").unwrap();
        const serviceNames = res.data.map(
          (item: { serviceName: string }) => item.serviceName
        );
        setService(serviceNames);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchUser();
  }, []);

  // validaton feileds
  const initialValues: IWorkerJoin = {
    name: "",
    mobile: "",
    password: "",
    cpassword: "",
    email: "",
    district: "",
    service: "",
    profile_img: "",
    idCard_img: "",
    experience: "",
  };

  // Handling the validation and Submit
  const { values,setFieldValue, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationWrokerJoin,
    onSubmit: async (values) => {
      setSubmit(true)
      const profile: any = values.profile_img;
      const idCard: any = values.idCard_img;
    
      const profileFileName = `profile.${Date.now()}.jpg`;
      const idCardFileName = `idCard.${Date.now()}.jpg`;

      const profileStorageRef = ref(storage, `/images/worker/profile/${profileFileName}`);
      const idCardStorageRef = ref(storage, `/images/worker/idCard/${idCardFileName}`);
      // Upload the file
      const profilesnapshot = await uploadBytes(profileStorageRef, profile);
      const idCardSnapshot = await uploadBytes(idCardStorageRef, idCard);

      // Get the download URL of the uploaded image
      const profileDownloadURL = await getDownloadURL(profilesnapshot.ref);
      const idCardDownloadURL = await getDownloadURL(idCardSnapshot.ref);

      const profile_img = profileDownloadURL;
      const idCard_img = idCardDownloadURL;

      try {
        const {
          name, mobile,password, cpassword,email,district,service,
            experience,
        } = values;
        const res = await register({
          name,mobile,password, cpassword, email,district,service, 
           profile_img, idCard_img, experience,  }).unwrap();
          navigate('/worker')
          setSubmit(false)
          Swal.fire({
            title: res.message,
            icon: "success"
          });
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        setSubmit(false)
      }
    },
  });


  // setup the image for upload
  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    setFieldValue("profile_img", file || null);
  };

  const handleIdCardImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    setFieldValue("idCard_img", file || null);
  };

  const districts: string[] = [
    "Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod",
    "Kollam", "Kottayam","Kozhikode", "Malappuram","Palakkad",
    "Pathanamthitta", "Thiruvananthapuram","Thrissur","Wayanad",
  ];

  return (
    <div className="">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="grid place-items-center">
            <img
              className="w-24 sm:w-28"
              src="/src/assets/icons/adhil-02.png"
              alt=""
            />
            <h2 className="font-Sans text-lg sm:text-xl text-primary md:text-2xl mb-2 mt-3 md:mt-5">
              Join FixIt to change your Life
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6 mt-5">
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500">{errors.name}</div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    id="mobile"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Mobile"
                    value={values.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && touched.mobile && (
                    <div className="text-red-500">{errors.mobile}</div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    id="email"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>
                <div className="text-gray-400">
                  <select
                    id="district"
                    className="w-full rounded-lg border py-2 px-3"
                    value={values.district}
                    onChange={handleChange}
                  >
                    <option value="">Select District</option>
                    {districts?.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && touched.district && (
                    <div className="text-red-500">{errors.district}</div>
                  )}
                </div>
                <div className="text-gray-400">
                  <select
                    id="service"
                    className="w-full rounded-lg border py-2 px-3"
                    value={values.service}
                    onChange={handleChange}
                  >
                    <option value="">Select Service</option>
                    {service?.map((serviceName, index) => (
                      <option key={index} value={serviceName}>
                        {serviceName}
                      </option>
                    ))}
                  </select>
                  {errors.service && touched.service && (
                    <div className="text-red-500">{errors.service}</div>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    id="experience"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Experience "
                    value={values.experience}
                    onChange={handleChange}
                  />
                  {errors.experience && touched.experience && (
                    <div className="text-red-500">{errors.experience}</div>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    id="cpassword"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Confirm Password"
                    value={values.cpassword}
                    onChange={handleChange}
                  />
                  {errors.cpassword && touched.cpassword && (
                    <div className="text-red-500">{errors.cpassword}</div>
                  )}
                </div>
                <div className="">
                  <label htmlFor="profile" className="block text-gray-400 mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="profile"
                    name="profile_img" // add name attribute for Formik
                    onChange={handleProfileImage}
                    className="w-full rounded-lg border py-2 px-3"
                  />
                  {errors.profile_img && touched.profile_img && (
                    <div className="text-red-500">{errors.profile_img}</div>
                  )}
                </div>
                <div className="">
                  <label htmlFor="profile" className="block text-gray-400 mb-1">
                    Id Card
                  </label>
                  <input
                    type="file"
                    id="idCard"
                    name="idCard_img" // add name attribute for Formik
                    onChange={handleIdCardImage}
                    className="w-full rounded-lg border py-2 px-3"
                  />
                  {errors.idCard_img && touched.idCard_img && (
                    <div className="text-red-500">{errors.idCard_img}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="bg-primary hover:bg-black text-white h-10 w-2/3 rounded font-Sans text-sm"
              >
                {isSumbit? <Spinner/> :"Join Our Team" }
              </button>
            </div>
            <div className="justify-center flex">
              <p className="mt-4 mb-0 leading-normal text-sm">
                Already have an account?
                <button onClick={()=>navigate('/worker')} className="font-bold text-slate-700">Sign in</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JoinTeam;
