import { useEffect, useState } from "react";
import { IBooking } from "../../@types/schema";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import {
  useCommitWorkMutation,
  useGetBookingsMutation,
} from "../../slices/api/workerApiSlice";
import { toast } from "react-toastify";

function NewWorks() {
  const [getBookings] = useGetBookingsMutation();
  const [commitWork] = useCommitWorkMutation();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const { workerInfo } = useSelector((state: RootState) => state.auth);
  const [refresh, setRefresh] = useState(false)

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
          status: "pending",
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
  }, [refresh]);

  const handleCommitWork = async (_id: string) => {
    try {
      const res = await commitWork({
        workerId: workerInfo?._id,
        status: "commited",
        _id,
      }).unwrap();
      setRefresh(!refresh)
      toast.success(res.message);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(refresh);
  

  return (
    <div className="">
      <div className="flex justify-center text-primary font-Sans text-3xl font-medium">
        All Bookings
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
              <button
                onClick={() => handleCommitWork(items._id)}
                className="bg-primary text-white p-2 font-Sans rounded w-24"
              >
                Commit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewWorks;
