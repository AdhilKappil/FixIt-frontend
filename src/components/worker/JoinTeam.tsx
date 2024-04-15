import { useEffect, useState } from "react";
import { useGetServiceMutation } from "../../slices/adminApiSlices";
import { useFormik } from "formik";
import { validationWrokerJoin } from "../../validation/yupValidation";
import { IWorkerJoin } from "../../validation/validationTypes";

function JoinTeam() {
  const [service, setService] = useState<string[]>();
  const [getService] = useGetServiceMutation();

  useEffect(() => {
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
    firstHourCharge: "",
    laterHourCharge: "",
    profile_img: "",
    idCard_img: "",
    experience: "",
  };

  // Handling the validation and Submit
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationWrokerJoin,
    onSubmit: async (values) => {
      //   try {
      //     const { name, email } = values; // Destructure values
      //     const res = await sendOtpToEmail({ name, email }).unwrap();
      //     dispatch(closeSignupModal())
      //     dispatch(openOtpModal())
      //     toast.success(res.message)
      //   } catch (err) {
      //     dispatch(clearRegister());
      //     toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      //   }
    },
  });

  const districts: string[] = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  return (
    <div>
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
                    type="text"
                    id="firstHourCharge"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="First Hour Charge"
                    value={values.firstHourCharge}
                    onChange={handleChange}
                  />
                  {errors.firstHourCharge && touched.firstHourCharge && (
                    <div className="text-red-500">{errors.firstHourCharge}</div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    id="laterHourCharge"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Later Hours Charge"
                    value={values.laterHourCharge}
                    onChange={handleChange}
                  />
                  {errors.laterHourCharge && touched.laterHourCharge && (
                    <div className="text-red-500">{errors.laterHourCharge}</div>
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
              <div className="mt-2">
                <label htmlFor="profile" className="block text-gray-400 mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profile"
                  name="profile_img" // add name attribute for Formik
                  onChange={handleChange}
                  className="w-full rounded-lg border py-2 px-3"
                />
                {errors.profile_img && touched.profile_img && (
                  <div className="text-red-500">{errors.profile_img}</div>
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="profile" className="block text-gray-400 mb-1">
                  Id Card
                </label>
                <input
                  type="file"
                  id="idCard"
                  name="idCard_img" // add name attribute for Formik
                  onChange={handleChange}
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
                Join Our Team
              </button>
            </div>
            <div className="justify-center flex">
              <p className="mt-4 mb-0 leading-normal text-sm">
                Already have an account?
                <button className="font-bold text-slate-700">Sign in</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JoinTeam;
