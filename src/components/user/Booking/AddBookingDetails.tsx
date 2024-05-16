import { useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import BookingProgess from "./BookingProgess";
import { useFormik } from "formik";
import { AddBookService, MyError } from "../../../validation/validationTypes";
import { addBookingDetails } from "../../../validation/yupValidation";
import { useSelector } from "react-redux";
import { useBookServiceMutation } from "../../../slices/api/userApiSlice";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { useEffect } from "react";
import Swal from 'sweetalert2'


function AddBookingDetails() {
  const navigate = useNavigate();
  const [bookService] = useBookServiceMutation();
  const { latitude, longitude,service} = useSelector((state: RootState) => state.location);
  const { userInfo } = useSelector((state:RootState) => state.auth);
  
  useEffect(() => {
    if(!service.serviceName){
      navigate("/services")
      toast.error("Please restart your booking process")
    }
}, []);

  const startTimes = [
    "8:00 AM", "9:00 AM",  "10:00 AM",
    "11:00 AM", "12:00 PM","1:00 PM", "2:00 PM","3:00 PM",
    "4:00 PM","5:00 PM", "6:00 PM","7:00 PM","8:00 PM",
  ];

  const endTimes = [
    "9:00 AM",  "10:00 AM",
    "11:00 AM", "12:00 PM","1:00 PM", "2:00 PM","3:00 PM",
    "4:00 PM","5:00 PM", "6:00 PM","7:00 PM","8:00 PM","9:00 PM",
  ];

  const initialValues : AddBookService= {
    date: "",
    startTime:"",
    endTime : "",
    description:"",
    
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: addBookingDetails,
    onSubmit: async (values) => {
      try {
        const {date, startTime, endTime,description} = values
        const userId = userInfo?._id 
        const res = await bookService({userId,latitude,longitude, date, startTime, endTime, description,service:service.serviceName,
          serviceImg:service.serviceImg, firstHourCharge:service.firstHourCharge, laterHourCharge:service.laterHourCharge}).unwrap();

        navigate('/profile')
        Swal.fire({
          title: "Your booking has been successfully completed and is now in progress",
          text: res.message,
          icon: "success"
        });
      } catch (err) { 
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });

  return (
    <>
      <Navbar />
      <BookingProgess />
     <form action="" onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <div className="w-4/5 sm:w-3/5 md:w-2/5 mt-5">
          <div className="relative flex overflow-hidden rounded-md border-gray-300 border-2 transition focus-within:border-blue-600">
            <input
              name="date"
              placeholder="Email"
              type="date"
              value={values.date}
              onChange={handleChange}
              className="w-full text-gray-400 flex-shrink appearance-none h-14 bg-white py-2 px-4 text-base placeholder-gray-400 focus:outline-none"
            />
          </div>
          {errors.date && touched.date && (
                    <div className="text-red-500">{errors.date}</div>
           )}
          <div className="md:flex gap-5">
            <div className="md:w-1/2 mt-5 relative flex overflow-hidden rounded-md border-gray-300 border-2 transition focus-within:border-blue-600">
              <select
                name="startTime"
                className="w-full p-3 text-gray-400 h-14"
                value={values.startTime}
                onChange={handleChange}
              >
                <option value="">Start Time</option>
                {startTimes?.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            {errors.startTime && touched.startTime && (
              <div className="text-red-500">{errors.startTime}</div>
            )}
            <div className="md:w-1/2 mt-5 relative flex overflow-hidden rounded-md border-gray-300 border-2 transition focus-within:border-blue-600">
              <select
                id="endTime"
                className="w-full p-3 text-gray-400 h-14"
                value={values.endTime}
                onChange={handleChange}
              >
                <option value="">End Time</option>
                {endTimes?.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            {errors.endTime && touched.endTime && (
                    <div className="text-red-500">{errors.endTime}</div>
                  )}
          </div>
          <div className="mt-5 relative flex overflow-hidden rounded-md border-gray-300 border-2 transition focus-within:border-blue-600">
            <input
              name="description"
              placeholder="Is there anything else you would like to share with the service provider"
              type="text"
              value={values.description}
              onChange={handleChange}
              className="w-full flex-shrink appearance-none h-20 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-8">
        <button
          onClick={() => navigate("/addLocation")}
          className="text-blue-600 font-bold text-xl"
        >
          Back
        </button>
        <button className="bg-primary max-md:text-sm w-36 hover:bg-black text-white p-2 md:w-52 rounded">
          Confirm Booking
        </button>
      </div>
      </form>
      <Footer />
    </>
  );
}

export default AddBookingDetails;
