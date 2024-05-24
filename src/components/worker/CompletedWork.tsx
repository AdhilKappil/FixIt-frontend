import { useEffect, useState } from "react";
import { useGetBookingsMutation } from "../../slices/api/workerApiSlice";
import { IBooking } from "../../@types/schema";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

function CompletedWork() {

  const [getBookings] = useGetBookingsMutation();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const { workerInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await getBookings({
          userId: "",
          status: "completed",
          workerId: workerInfo?._id,
          service: "",
        }).unwrap();
      setBookings(res.data)
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchBooking();
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div>
       <div className="flex justify-center text-primary font-Sans text-3xl font-medium">
        Works History
      </div>
  <section className="relative mt-10">
      <div className="w-full mb-12">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-tertiary ">
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Booking ID</th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">User ID</th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Date</th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Amount</th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Transation Id</th>                 
                   <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Payment Status</th>
                </tr>
              </thead>
              <tbody>
              {bookings.map((items)=>(
                <tr key={items._id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <span className="font-Sans font-medium text-sm">{items._id}</span>
                  </th>
                  <td className="font-medium text-sm border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">{items.userId}</td>
                  <td className="font-medium text-sm border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    <i className="fas fa-circle mr-2"></i>{formatDate(items.updatedAt)}
                  </td>
                  <td className="font-medium text-sm border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    <p>₹{items.price}</p>
                  </td>
                  <td className="font-medium text-sm border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    <p>{items.paymentId}</p>
                  </td>
                  <td className="font-medium text-sm border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    <p>{items.payment ? "Success" : "pending"}</p>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default CompletedWork