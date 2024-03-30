import Banner from "../../components/user/Banner";
import Process from "../../components/user/Process";
import Footer from "../../components/user/layouts/Footer";
import Navbar from "../../components/user/layouts/Navbar";
import { MdVerified } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { FaMoneyCheck } from "react-icons/fa6";
import UsersReview from "../../components/user/UsersReview";



function HomeScreen() {
  
  return (
    <div>
      <Navbar />
      <Banner />
      <Process />
      <UsersReview/>
     <div>
     <div className="flex justify-center mt-12">
        <div className="w-3/4 ">
          <img className="w-full rounded-xl" src="src/assets/img/fixIt_banner.jpg" alt="" />
        </div>
      </div>
     </div>
       
     <div className="flex justify-center mt-10">
     <div className="w-3/4 border-2 rounded-md">
        <div className=" h-7 flex justify-center mt-5">
            <p className="text-xl font-serif text-primary">Happines Guaranty</p>
        </div>
        <div className="h-7 flex justify-center font-thin text-sm">
            <span>We love servicing you better</span>
        </div>

        <div className="grid justify-around mt-7 mb-7 md:grid-cols-2 lg:flex">
            <div className="grid shadow-lg p-10 rounded-lg">
              <div className="flex justify-center"><MdVerified size={30} className="text-primary"/></div>
               <div className="flex justify-center font-extralight mt-2">Verified Professionals</div>
            </div>
            <div className="grid shadow-lg p-10 rounded-lg">
              <div className="flex justify-center"><FaMoneyCheck size={30} className="text-primary"/></div>
               <div className="flex justify-center font-extralight mt-2">Predefined Pricing</div>
            </div>
            <div className="grid shadow-lg p-10 rounded-lg lg:w-52 mt-2">
              <div className="flex justify-center"><IoMdTime size={30} className="text-primary"/></div>
               <div className="flex justify-center font-extralight mt-2">Fast Service</div>
            </div>
            <div className="grid shadow-lg p-10 rounded-lg lg:w-52">
              <div className="flex justify-center"><AiOutlineMessage size={30} className="text-primary"/></div>
               <div className="flex justify-center font-extralight mt-2">Live Support</div>
            </div>
        </div>
      </div>
     </div>
      <Footer/>
    </div>
  );
}

export default HomeScreen;
