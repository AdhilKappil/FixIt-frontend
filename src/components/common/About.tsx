import { useNavigate } from "react-router-dom";
import Footer from "../user/layouts/Footer";
import Navbar from "../user/layouts/Navbar";

const About = () => {
    const navigate = useNavigate()
  return (
    <>
    <Navbar/>
      <section className="overflow-hidden bg-tertiary dark:bg-dark px-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src="/src/assets/img/kitchen.png"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src="/src/assets/img/download.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative my-4">
                    <img
                      src="/src/assets/img/service-maintenance.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                    <span className="absolute -right-7 -bottom-7 z-[-1]">
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-primary">
                  Why Choose Us
                </span>
                <h2 className="mb-5 text-3xl font-bold text-dark sm:text-[40px]/[48px] text-primary">
                  Make your happy by giving the best service at the right time.
                </h2>
                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                At FixIt, we are dedicated to delivering exceptional service tailored to your specific needs, right where and when you need it. We understand that convenience and reliability are crucial, which is why we go the extra mile to ensure that our services are not only top-notch but also available at your preferred location and time.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                Our commitment to excellence means that you can count on us to be there with the best solutions, designed to enhance your experience and meet your expectations. With a focus on customer satisfaction and a track record of success, FixIt is your trusted partner in achieving the results you desire, precisely when and where it matters most.
                </p>
                <button 
                  onClick={()=>navigate("/")}
                  className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default About;
