import { useLocation } from "react-router-dom";
import Footer from "../../components/user/layouts/Footer";
import Navbar from "../../components/user/layouts/Navbar";
import { IoIosStar } from "react-icons/io";

function ServiceDetails() {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);

  return (
    <div>
      <Navbar />
      <div className="">
        <div className="flex justify-center">
          <div className="w-3/4 mt-5">
            <img
              className="w-full object-cover h-[400px] rounded-lg"
              src="/src/assets/img/Electrical-details-img.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="bg-white mt-10 flex justify-center shadow-sm">
          <div className="text-primary font-Sans text-4xl font-medium p-5 w-3/4">
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
          <div className="w-3/4">
            <div className="w-2/3 shadow-lg bg-white mt-10 rounded-lg p-5" data-aos="fade-up">
              <div className="text-primary font-Sans text-xl font-medium">
                Description
              </div>
              <p className="text-sm text-gray-500 mt-2">{data.description}</p>
            </div>

            <div className="w-2/3 shadow-lg bg-white mt-10 rounded-lg p-5" data-aos="fade-up">
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
                <button className="rounded-lg  bg-white text-primary p-2 px-5 font-semibold">
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
