import { useNavigate } from "react-router-dom"
import Footer from "../user/layouts/Footer"
import WorkerNavbar from "./Layout/WorkerNavbar"

function Home() {
    const navigate = useNavigate()
  return (
    <>
    <WorkerNavbar/>
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
      Why Join Us
    </span>
    <h2 className="mb-5 text-3xl font-bold text-dark sm:text-[40px]/[48px] text-primary">
      Find your happiness by offering your best skills at the right place and time.
    </h2>
    <p className="mb-5 text-base text-body-color dark:text-dark-6">
      At FixIt, we value your expertise and are committed to providing you with exceptional opportunities tailored to your specific skills and preferences. We understand that flexibility and reliability are essential for you, which is why we ensure that our platform offers top-notch opportunities available at your preferred locations and schedules.
    </p>
    <p className="mb-8 text-base text-body-color dark:text-dark-6">
      Joining FixIt means being part of a team that prioritizes excellence and supports your growth. With a focus on your satisfaction and a proven track record of success, FixIt is your trusted partner in achieving your professional goals, precisely where and when it matters most.
    </p>
    <button
      onClick={()=>navigate("/worker/workerLogin")}
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
  )
}

export default Home

