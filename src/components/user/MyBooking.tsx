import { useEffect, useState } from "react";
import { useGetBookingMutation } from "../../slices/api/userApiSlice";
import { IBooking } from "../../@types/schema";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

function MyBooking() {

    const [getBooking] = useGetBookingMutation();
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const { userInfo } = useSelector((state: RootState) => state.auth);


    useEffect(() => {
        async function fetchBooking() { 
          try {
            const res = await getBooking({userId:userInfo?._id, status:'all'}).unwrap();
            setBookings(res)
          } catch (error) {
            console.error("Error fetching services:", error);
          }
        }
        fetchBooking();
      }, []);
      console.log(bookings);
      

  return (
    <div className="">
        <div className="flex justify-center text-primary font-Sans text-3xl font-medium">
            All Bookings
        </div>
     <div className="grid xl:grid-cols-2 mt-10 gap-10">
        <div className="rounded-lg" style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'}}>
            {/* head */}
            <div className="flex justify-between p-4">
                <div>
                <p className="text-gray-400">Booking Id</p>
                <p className="text-primary font-medium">67856fjf77f7</p>
                </div>
                <div className="flex gap-5">
                    <div>
                        <p className="text-gray-400">Order Status</p>
                        <p className="text-primary font-medium">Pending</p>
                    </div>
                    <div className="border"></div>
                    <div>
                        <p className="text-gray-400">Payment Status</p>
                        <p className="text-primary font-medium">Not Paid</p>
                    </div>
                </div>
            </div>
            <hr/>
            {/* section */}
            <div className="flex md:p-5 p-2">
                <div className="h-14 w-20 bg-slate-600">
                    <img className="h-full" src="/src/assets/img/electrician.jpg" alt="" />
                </div>
                <div className="ml-5">
                    <p className="text-primary font-medium">Electrical</p>
                    <p className="text-gray-400">wandoor, 679328, malappuram, kerla</p>
                </div>
            </div>
            <div className="flex justify-between px-5">
                <div className="text-gray-400 gap-3 flex">Booking At 22/04/2024 <span className="text-primary font-medium">9.00AM-11.00AM</span> </div>
                <div className="text-primary font-medium">Total : ₹0.00</div>
            </div>
            <div className="flex justify-end p-3">
                <button className="bg-red-600 text-white p-2 font-Sans rounded md:w-24">Cancel</button>
            </div>
        </div>

     </div>
    </div>
  )
}

export default MyBooking