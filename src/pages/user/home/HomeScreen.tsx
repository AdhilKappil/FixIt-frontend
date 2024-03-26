import Banner from "../../../components/user/Banner";
import Process from "../../../components/user/Process";
import Footer from "../../../components/user/layouts/Footer";
import Navbar from "../../../components/user/layouts/Navbar";

function HomeScreen() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Process />
      <div className="flex justify-center mt-5">
        <div className="w-3/4 ">
          <img className="w-full rounded-xl" src="/fixIt_banner.jpg" alt="" />
        </div>
      </div>
       
     <div className="flex justify-center mt-10">
     <div className="bg-gray-400 h-52 w-3/4">
        <div className=" h-7 flex justify-center">
            <p className="text-lg font-serif">Happines Guaranty</p>
        </div>
        <div className="h-7 flex justify-center">
            <span>We love servicing you better</span>
        </div>
        <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
      </div>
     </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
