import { TiTick } from "react-icons/ti";

function BookingProgess() {
  return (
    <div className="flex justify-center mt-10">
    <div className="w-3/5 flex gap-3 items-center">
      <div className="flex flex-col items-center">
        <div className="rounded-full h-7 w-7 bg-blue-600 flex justify-center items-center text-xs text-white">
         <TiTick size={15}/>
        </div>
        <div className="font-semibold mt-1">Location</div>
      </div>
      <div className="w-full h-0.5 bg-gray-400"></div>
      <div className="flex flex-col items-center">
        <div className="rounded-full h-7 w-7 bg-gray-400 flex justify-center items-center text-xs text-white">
          2
        </div>
        <div className="font-semibold mt-1">Details</div>
      </div>
    </div>
  </div>
  )
}

export default BookingProgess