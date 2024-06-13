import Banner from "../../components/user/Banner";
import Process from "../../components/user/Process";
import Footer from "../../components/user/layouts/Footer";
import Navbar from "../../components/user/layouts/Navbar";
import { MdVerified } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { FaMoneyCheck } from "react-icons/fa6";
import UsersReview from "../../components/user/UsersReview";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <Banner />
      <Process />
      <UsersReview />
      <div>
        <div className="flex justify-center mt-12 relative" data-aos="fade-up">
          <div className="w-3/4 ">
            <img
              className="w-full rounded-xl max-md:hidden"
              src="/assets/img/banner normal.jpg"
              alt=""
            />
            <img
              className="w-full rounded-xl md:hidden"
              src="/assets/img/FINAL MOBILE BANNER-01.png"
              alt=""
            />
          </div>
          <button
            onClick={() => navigate("/worker")}
            className="absolute max-sm:bottom-5 bottom-10 md:bottom-10 md:left-60 lg:bottom-20 lg:left-80 md:w-56 h-14 bg-white rounded-lg text-primary p-2 px-5 font-semibold hover:bg-gray-300"
          >
            Join Our Team
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-10" data-aos="fade-up">
        <div className="w-3/4 border-2 rounded-md">
          <div className=" h-7 flex justify-center mt-5">
            <p className="text-xl font-serif text-primary">Happines Guaranty</p>
          </div>
          <div className="h-7 flex justify-center font-thin text-sm">
            <span>We love servicing you better</span>
          </div>

          <div className="grid justify-around mt-7 mb-7 md:grid-cols-2 lg:flex">
            <div className="grid shadow-lg p-10 rounded-lg">
              <div className="flex justify-center">
                <MdVerified size={30} className="text-primary" />
              </div>
              <div className="flex justify-center font-extralight mt-2">
                Verified Professionals
              </div>
            </div>
            <div className="grid shadow-lg p-10 rounded-lg">
              <div className="flex justify-center">
                <FaMoneyCheck size={30} className="text-primary" />
              </div>
              <div className="flex justify-center font-extralight mt-2">
                Predefined Pricing
              </div>
            </div>
            <div className="grid shadow-lg p-10 rounded-lg lg:w-52 mt-2">
              <div className="flex justify-center">
                <IoMdTime size={30} className="text-primary" />
              </div>
              <div className="flex justify-center font-extralight mt-2">
                Fast Service
              </div>
            </div>
            <div className="grid shadow-lg p-10 rounded-lg lg:w-52">
              <div className="flex justify-center">
                <AiOutlineMessage size={30} className="text-primary" />
              </div>
              <div className="flex justify-center font-extralight mt-2">
                Live Support
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
