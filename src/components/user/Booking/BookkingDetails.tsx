import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer"
import Navbar from "../layouts/Navbar"
import BookingProgess from "./BookingProgess"
import { useEffect, useState } from "react";

function BookkingDetails() {

    const location = useLocation();
    const { data } = location.state;
    const [locationData,setLocationData] = useState("")
    const navigate = useNavigate()

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      useEffect(() => {
        async function fetchLocation() {
          const { latitude, longitude } = data;
          if (latitude !== 0 && longitude !== 0) {
            try {
              const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
                  import.meta.env.VITE_MAPBOX_TOKEN
                }`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch location data");
              }
              const locationData = await response.json();
              if (locationData.features && locationData.features.length > 0) {
                const location = locationData.features[0].place_name;
                setLocationData(location);
              }
            } catch (error) {
              console.error(error);
            }
          }
        }
        fetchLocation();
      }, [data]);
      
      
  return (
    <div>
      <Navbar />
      <BookingProgess status="true"/>
      <div className="flex justify-center text-primary font-Sans text-xl font-medium my-5">
        Booked Service Details
      </div>
      <div className="flex justify-center">
      <div className="w-1/2 my-5">
          <div className="bg-tertiary rounded-lg shadow">
            {/* head */}
            <div className="grid sm:flex justify-between p-4">
              <div className="max-sm:flex max-sm:justify-between">
                <p className="text-gray-500 font-Sans">Booking Id</p>
                <p className="text-primary font-medium font-Sans sm:mt-2">
                  {data._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="flex gap-5 max-sm:mt-2">
                <div>
                  <p className="text-gray-500 font-Sans">Work Status</p>
                  <p className="text-primary font-Sans font-medium mt-2">
                    {data.status}
                  </p>
                </div>
                <div className="border max-sm:mx-4"></div>
                <div>
                  <p className="text-gray-500 font-Sans">Payment Status</p>
                  {data.payment ? (
                    <p className="text-primary font-Sans font-medium mt-2">
                      Paid
                    </p>
                  ) : (
                    <p className="text-primary font-Sans font-medium mt-2">
                      Not Paid
                    </p>
                  )}
                </div>
              </div>
            </div>
            <hr />
            {/* section */}
            <div className="flex md:p-5">
              <div className="h-14 w-20 mt-1 max-sm:hidden">
                <img
                  className="h-full"
                  src={data.serviceImg}
                  alt={data.service}
                />
              </div>
              <div className="ml-5">
                <p className="text-primary font-Sans text-lg font-medium max-sm:my-2">
                  {data.service}
                </p>
                <p className="text-gray-500 font-San text-sm">
                  {locationData}
                </p>
              </div>
            </div>
            <div className="sm:flex justify-between px-5 max-sm:mt-2 pb-5">
              <div className="text-gray-500 gap-3 font-Sans flex max-sm:text-sm">
                Booking At {formatDate(data.date)}{" "}
                <span className="text-primary font-medium font-Sans">
                  {data.startTime}-{data.endTime}
                </span>{" "}
              </div>
              <div className="text-primary font-Sans font-medium max-sm:mt-2">
                Total : ₹{data.price}.00
              </div>
            </div>
          </div>
      </div>
    </div>
      <div className="flex justify-center">
        <button onClick={()=>navigate("/profile")} className="bg-primary text-white p-2 w-60 rounded">Continue</button>
      </div>
      <Footer/>
    </div>
  )
}

export default BookkingDetails