import Footer from "../../components/user/layouts/Footer"
import Navbar from "../../components/user/layouts/Navbar"
import { IoIosStar } from "react-icons/io";



function Services() {
  return (
    <div>
        <Navbar/>
        <div className="flex justify-center py-20 ">
            <div className="text-primary font-sans text-4xl font-semibold">Services</div>
        </div>
    <div className="flex justify-center bg-secondary">
      <div className="w-3/4 mb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-14">
      <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10 hover:translate-x-4 transition duration-300 hover:cursor-pointer">
        <img className="w-full" src="/src/assets/img/electrician.jpg" alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
          <div className="text-xl mb-2 text-text_head font-sans font-semibold">Electrical</div>
          <p className=" text-base text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
          <div className="flex items-center mt-2">
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-700 font-semibold">$24.99</p>
          </div>
        </div>
      </div>

      <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10 hover:translate-x-4 transition duration-300 hover:cursor-pointer">
        <img className="w-full" src="/src/assets/img/electrician.jpg" alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
          <div className="text-xl mb-2 text-text_head font-sans font-semibold">Electrical</div>
          <p className=" text-base text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
          <div className="flex items-center mt-2">
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-700 font-semibold">$24.99</p>
          </div>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10 hover:translate-x-4 transition duration-300 hover:cursor-pointer">
        <img className="w-full" src="/src/assets/img/electrician.jpg" alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
          <div className="text-xl mb-2 text-text_head font-sans font-semibold">Electrical</div>
          <p className=" text-base text-gray-500">
         elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
          <div className="flex items-center mt-2">
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-700 font-semibold">$24.99</p>
          </div>
        </div>
      </div>

      <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10 hover:translate-x-4 transition duration-300 hover:cursor-pointer">
        <img className="w-full" src="/src/assets/img/electrician.jpg" alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
          <div className="text-xl mb-2 text-text_head font-sans font-semibold">Electrical</div>
          <p className=" text-base text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
          <div className="flex items-center mt-2">
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          <IoIosStar size={20} className="text-yellow-400"/>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-700 font-semibold">$24.99</p>
          </div>
        </div>
      </div>

      </div>
    </div>

    <Footer/>
    </div>
  )
}

export default Services