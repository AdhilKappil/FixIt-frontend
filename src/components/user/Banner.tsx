import { useNavigate } from "react-router-dom"


function Banner() {

  const navigate = useNavigate()

  return (
    <div className="">
       <div className=" relative flex justify-center pt-5 max-md:p-5">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="max-md:grid max-md:w-full flex w-3/4">
            <div className="mt-20 w-1/2 max-md:w-full grid p-5 justify-center" data-aos="fade-down">
              <h1 className="relative text-5xl max-lg:text-4xl leading-tight text-primary font-Sans font-light">
              Your Home, Our Priority Premier Services for Every Corner of Your House!
              </h1>
              <div className="flex justify-center">
                <button
                  onClick={()=>navigate("/services")}
                  className="relative w-56 h-14 mb-28 bg-white rounded-lg text-primary p-2 px-5 font-semibold hover:bg-gray-300"
                >
                  Book Services
                </button>
              </div>
            </div>
            <div className="w-1/2 max-md:w-full" data-aos="fade-up">
              <img
              style={{ height: "calc(100vh - 80px)"}}
                className="w-full rounded-lg"
                src="/src/assets/img/banner_img.png"
                alt=""
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Banner