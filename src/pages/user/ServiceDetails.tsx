import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/user/layouts/Footer";
import Navbar from "../../components/user/layouts/Navbar";
import { IoIosStar } from "react-icons/io";

function ServiceDetails() {
  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />
      <div className="">
      <div className=" relative flex justify-center p-10 max-md:p-5">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="max-md:grid max-md:w-full flex w-3/4">
          <div className="mt-5 w-1/2 max-md:w-full grid p-5 justify-center">
             <h1 className="relative text-5xl max-lg:text-4xl leading-tight text-primary font-Sans font-bold ">Top-Notch Services Await: Quality Solutions for Everyday Needs!</h1>
             <div className="flex justify-center">
             <button onClick={()=>navigate('/addLocation')} className="relative w-56 mt-5 bg-white rounded-lg text-primary p-2 px-5 font-semibold">Book This Service</button>
             </div>
          </div>
          <div className="w-1/2 max-md:w-full">
            <img
              className="w-full object-cover rounded-lg"
              src={data.service_img}
              alt=""
            />
          </div>
        </div>
      </div>

        <div className="bg-white mt-10 flex justify-center shadow-sm">
          <div className="text-primary font-Sans text-4xl max-md:text-3xl font-medium p-5 w-3/4">
            {data.serviceName}
            <div className="flex items-center mt-2">
              <IoIosStar size={20} className="text-yellow-400" />
              <IoIosStar size={20} className="text-yellow-400" />
              <IoIosStar size={20} className="text-yellow-400" />
              <IoIosStar size={20} className="text-yellow-400" />
              <IoIosStar size={20} className="text-yellow-400" />
              <p className="text-base font-normal ml-2 text-black">
                Reviews(34)
              </p>
            </div>
            <div className="flex mt-5 gap-5">
                <div>
                    <p className="text-xs">First Hour Charge</p>
                    <p className="text-lg">₹{data.firstHourCharge}.00</p>
                </div>
                <div className="border"></div>
                <div>
                    <p className="text-xs">Later Hour Charge</p>
                    <p className="text-lg">₹{data.laterHourCharge}.00</p>
                </div>
                <div></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-3/4 max-md:w-full max-md:p-4">
            <div className="w-2/3 max-md:w-full shadow-lg bg-white mt-10 rounded-lg p-5" data-aos="fade-up">
              <div className="text-primary font-Sans text-xl font-medium">
                Description
              </div>
              <p className="text-sm text-gray-500 mt-2">{data.description}</p>
            </div>

            <div className="w-2/3 max-md:w-full shadow-lg bg-white mt-10 rounded-lg p-5" data-aos="fade-up">
              <div className="text-primary font-Sans text-xl font-medium">
                Customer Reviews
              </div>
              <div className="mt-5 p-5">
                <div>
                  <div className="flex gap-10 items-center">
                    <div className="rounded-full h-10 w-10 bg-gray-400"></div>
                    <div className="w-1/2">
                        <p className="font-semibold">Adhil Ali</p>
                        <p className="text-sm text-gray-500">08:45 AM - 03/03/2021</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-3">
                    Great User Experience and implemented a well defined process
                    in all service categories. A app like this is a must in this
                    current world.
                  </div>
                </div>
              </div>
              <div className="mt-5 p-5">
                <div>
                  <div className="flex gap-10 items-center">
                    <div className="rounded-full h-10 w-10 bg-gray-400"></div>
                    <div className="w-1/2">
                        <p className="font-semibold">Adhil Ali</p>
                        <p className="text-sm text-gray-500">08:45 AM - 03/03/2021</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-3">
                    Great User Experience and implemented a well defined process
                    in all service categories. A app like this is a must in this
                    current world.
                  </div>
                </div>
              </div>
              <div className="mt-5 p-5">
                <div>
                  <div className="flex gap-10 items-center">
                    <div className="rounded-full h-10 w-10 bg-gray-400"></div>
                    <div className="w-1/2">
                        <p className="font-semibold">Adhil Ali</p>
                        <p className="text-sm text-gray-500">08:45 AM - 03/03/2021</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                      <IoIosStar size={20} className="text-yellow-400" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-3">
                    Great User Experience and implemented a well defined process
                    in all service categories. A app like this is a must in this
                    current world.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary h-16 rounded-lg flex justify-end p-3 mt-10" data-aos="fade-up">
                <button onClick={()=>navigate('/addLocation')} className="rounded-lg  bg-white text-primary p-2 px-5 font-semibold">
                    Book This Service
                </button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceDetails;
