import { useEffect, useState } from "react";
import {
  useCancelBookingMutation,
  useGetBookingMutation,
} from "../../slices/api/userApiSlice";
import { IBooking } from "../../@types/schema";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { FaRocketchat } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { toast } from "react-toastify";
import { useCreateConversationMutation } from "../../slices/api/chatApiSlice";
import { useNavigate } from "react-router-dom";

function MyBooking() {
  const [getBookings] = useGetBookingMutation();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [title, setTitle] = useState("All Bookings");
  const [cancelBooking] = useCancelBookingMutation();
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate()
  const [conversation] = useCreateConversationMutation ();
  
  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await getBookings({
          userId: userInfo?._id,
          status: "all",
          workerId: "",
          service: "",
        }).unwrap();
        const bookingsWithLocation = await Promise.all(
          res.data.map(async (booking: any) => {
            const { latitude, longitude } = booking;
            if (latitude !== 0 && longitude !== 0) {
              const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
                  import.meta.env.VITE_MAPBOX_TOKEN
                }`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch location data");
              }
              const data = await response.json();
              if (data.features && data.features.length > 0) {
                const location = data.features[0].place_name;
                return { ...booking, location };
              }
            }
            return booking;
          })
        );
        setBookings(bookingsWithLocation);
        setTitle("All Bookings");
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchBooking();
  }, [refresh]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = async (status: string) => {
    if (status === "pending") {
      setTitle("Pending");
    } else if (status === "commited") {
      setTitle("Commited");
    } else if (status === "completed") {
      setTitle("Completed");
    } else {
      setTitle("All Bookings");
    }
    try {
      const res = await getBookings({
        userId: userInfo?._id,
        status,
        workerId: "",
        service: "",
      }).unwrap();
      const bookingsWithLocation = await Promise.all(
        res.data.map(async (booking: any) => {
          const { latitude, longitude } = booking;
          if (latitude !== 0 && longitude !== 0) {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
                import.meta.env.VITE_MAPBOX_TOKEN
              }`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch location data");
            }
            const data = await response.json();
            if (data.features && data.features.length > 0) {
              const location = data.features[0].place_name;
              return { ...booking, location };
            }
          }
          return booking;
        })
      );
      setBookings(bookingsWithLocation);
      console.log(bookingsWithLocation);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Formating date here
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleCancel = async (_id: string) => {
    try {
      const res = await cancelBooking({
        workerId: "",
        status: "cancelled",
        _id,
      }).unwrap();
      setRefresh(!refresh);
      toast.success(res.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChat = async(receiverId:string) => {
    try {
      const res = await conversation({ senderId:userInfo?._id,receiverId}).unwrap();
      navigate('/profile/userChat', { state: { conversationData: res.newConversation.data } });
    } catch (error) {
      console.error(error);
    }
  };  


  return (
    <div className="">
      <div className="relative">
        <div className="flex justify-center items-center gap-3 text-primary font-Sans text-3xl font-medium">
          <div onClick={handleMenuClick} className="relative">
            <IoMdMenu />
            {isDropdownOpen && (
              <div className="absolute z-10 top-full left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <button
                  className="block px-4 py-2 text-sm text-gray-600"
                  onClick={() => handleOptionClick("pending")}
                >
                  Pending
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-600"
                  onClick={() => handleOptionClick("commited")}
                >
                  Committed
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-600"
                  onClick={() => handleOptionClick("completed")}
                >
                  Completed
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-600"
                  onClick={() => handleOptionClick("all")}
                >
                  All Bookings
                </button>
              </div>
            )}
          </div>
          {title}
        </div>
      </div>

      <div className="grid xl:grid-cols-2 mt-10 gap-10">
        {bookings.map((items) => (
          <div key={items._id} className="bg-tertiary rounded-lg shadow-md">
            {/* head */}
            <div className="grid sm:flex justify-between p-4">
              <div className="max-sm:flex max-sm:justify-between">
                <p className="text-gray-500 font-Sans">Booking Id</p>
                <p className="text-primary font-medium font-Sans sm:mt-2">
                  {items._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="flex gap-5 max-sm:mt-2">
                <div>
                  <p className="text-gray-500 font-Sans">Order Status</p>
                  <p className="text-primary font-Sans font-medium mt-2">
                    {items.status}
                  </p>
                </div>
                <div className="border max-sm:mx-4"></div>
                <div>
                  <p className="text-gray-500 font-Sans">Payment Status</p>
                  {items.payment ? (
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
                  src={items.serviceImg}
                  alt={items.service}
                />
              </div>
              <div className="ml-5">
                <p className="text-primary font-Sans text-lg font-medium max-sm:my-2">
                  {items.service}
                </p>
                <p className="text-gray-500 font-San text-sm">
                  {items.location}
                </p>
              </div>
            </div>
            <div className="sm:flex justify-between px-5 max-sm:mt-2 ">
              <div className="text-gray-500 gap-3 font-Sans flex max-sm:text-sm">
                Booking At {formatDate(items.date)}{" "}
                <span className="text-primary font-medium font-Sans">
                  {items.startTime}-{items.endTime}
                </span>{" "}
              </div>
              <div className="text-primary font-Sans font-medium max-sm:mt-2">
                Total : ₹{items.price}.00
              </div>
            </div>
            <div className="flex justify-end p-3 gap-3">
              {items.status === "commited" ? (
                <button
                  onClick={()=>handleChat(items.workerId)}
                  className="bg-gray-300 p-2 rounded-lg shadow-md w-24 flex justify-center font-medium text-primary gap-2 items-center font-Sans"
                >
                  <FaRocketchat size={20} />
                  Chat
                </button>
              ) : (
                <button
                  onClick={() => handleCancel(items._id)}
                  className="bg-red-600 text-white p-2 font-Sans rounded-lg w-24"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBooking;
