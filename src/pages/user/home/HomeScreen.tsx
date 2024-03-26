import Banner from "../../../components/banner/Banner"
import Navbar from "../../../components/layouts/Navbar"


function HomeScreen() {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <div className="flex justify-center">
        <div className="w-3/4" style={{height:'500px'}}>
           <div className="justify-center mt-14">
            <p className="text-primary font-bold text-3xl">We Follow The Process</p>
           </div>
           <div className="grid mt-14 text-center justify-between sm:grid-cols-2 lg:grid-cols-3 xl:flex">
            <div className="">
                <div className="h-52 w-52 rounded-full flex items-center justify-center" style={{background:'#FAE084'}}>
                    <img src="/booking (1) 1.png" alt=""/>
                </div>
                <div className="mt-10 text-primary font-bold text-xl">Booking Online </div>
            </div>
          <div>
          <div className="h-52 w-52 rounded-full flex items-center justify-center" style={{background:'#FAE084'}}>
                <img src="Frame.png" alt="" />
            </div>
            <div className="mt-10 text-primary font-bold text-xl">Booking Online </div>
          </div>
         <div>
         <div className="h-52 w-52 rounded-full flex items-center justify-center" style={{background:'#FAE084'}}>
               <img src="image 73.png" alt="" />
            </div>
            <div className="mt-10 text-primary font-bold text-xl">Booking Online </div>
         </div>
         <div>
         <div className="h-52 w-52 rounded-full flex items-center justify-center" style={{background:'#FAE084'}}>
                <div className="h-20 w-20 bg-primary rounded-full flex justify-center items-center">
                <img src="/Vector 153 (Stroke).png" alt=""/>
                </div>
            </div>
            <div className="mt-10 text-primary font-bold text-xl">Booking Online </div>
         </div>
           </div>
        </div>
    </div>
    </div>
  )
}

export default HomeScreen