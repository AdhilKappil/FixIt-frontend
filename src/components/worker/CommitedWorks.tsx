
import { useEffect, useState } from "react";
import { IBooking } from "../../@types/schema";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
//   useCommitWorkMutation,
  useGetBookingsMutation,
} from "../../slices/api/workerApiSlice";
// import { toast } from "react-toastify";
import { FaRocketchat } from "react-icons/fa";
import { useCreateConversationMutation } from "../../slices/api/chatApiSlice";
import WorkerChatModal from "./WorkerChatModal";
import { openWorkerChatModal } from "../../slices/modalSlices/chatSlice";


function CommitedWorks() {
  const [getBookings] = useGetBookingsMutation();
  const [conversation] = useCreateConversationMutation();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const { workerInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
  const [conversationId, setCoversationId] = useState("")
  const modalIsOpen = useSelector((state: RootState) => state.chatModal.workerChatModal.value);


// Formating date here
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await getBookings({
          status: "commited",
          service: workerInfo?.service,
          userId: "",
          workerId: "",
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
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchBooking();
  }, []);

  const handleChat = async(receiverId:string) => {
    try {
      const res = await conversation({ senderId:workerInfo?._id,receiverId}).unwrap();
      setCoversationId(res.newConversation.data._id)
      dispatch(openWorkerChatModal())
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div className="">
      <div className="flex justify-center text-primary font-Sans text-3xl font-medium">
        Commited Works
      </div>
      <div className="grid xl:grid-cols-2 mt-10 gap-10">
        {bookings.map((items) => (
          <div key={items._id} className="bg-tertiary rounded-lg">
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
            <div className="flex justify-end p-3">
            <button onClick={()=>handleChat(items.userId)} className="bg-gray-300 rounded-lg p-2 shadow-md w-24 flex justify-center font-medium text-primary gap-2 items-center font-Sans">
                  <FaRocketchat size={20} />
                  Chat
                </button>
              {/* <button
                // onClick={() => handleCommitWork(items._id)}
                className="bg-primary text-white p-2 font-Sans rounded-lg w-24"
              >
                Commit
              </button> */}

            </div>
            {modalIsOpen && 
            <WorkerChatModal conversationId={conversationId}/>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommitedWorks;
