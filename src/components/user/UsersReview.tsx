import { IoIosStar } from "react-icons/io";

function UsersReview() {
  return (
    <div className="flex justify-center " >
      <div className="w-3/4 mt-10" data-aos="fade-up">
        <div className="flex justify-center" >
          <p className="text-primary font-sans font-semibold text-xl lg:text-3xl">
            What Clients Say
          </p>
        </div>
        <div className="grid gap-5 mt-9 md:grid-cols-2 xl:flex">
          <div className=" duration-500 relative shadow-xl rounded-lg p-4 bg-secondary hover:-translate-y-2 hover:shadow-xl shadow-gray-300">
            <div className="flex">
              <div className="w-4/12 h-20">
                <div className="w-20 h-20 rounded-full bg-black">
                    <img className="rounded-full " src="/assets/img/headshot2_5000x.webp" alt="" />
                </div>
              </div>
              <div className="max-sm:ml-2 flex justify-start items-center">
                <p className="text-2xl font-semibold font">Laila T</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500">
               I am extremely pleased with the service provided by Fixit.
               The technicians were highly skilled and knowledgeable
              </p>
            </div>
            <div className="flex mt-3">
              <div className="w-5/12 flex">
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
              </div>
              <div className="w-7/12">
                <p className="text-gray-500">Reviewed on 30/03/2024</p>
              </div>
            </div>
          </div>
          <div className=" duration-500 relative shadow-xl rounded-lg p-4 bg-secondary hover:-translate-y-2 hover:shadow-xl shadow-gray-300">
            <div className="flex">
              <div className="w-4/12 h-20">
                <div className="w-20 h-20 rounded-full bg-black">
                    <img className="rounded-full " src="/assets/img/headshot2_5000x.webp" alt="" />
                </div>
              </div>
              <div className="max-sm:ml-2 w-8/1 flex justify-start items-center">
                <p className="text-2xl font-semibold font">Rosna CT</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500">
              I am extremely pleased with the service provided by Fixit.
               The technicians were highly skilled and knowledgeable
              </p>
            </div>
            <div className="flex mt-3">
              <div className="w-5/12 flex">
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
              </div>
              <div className="w-7/12">
                <p className="text-gray-500">Reviewed on 30/03/2024</p>
              </div>
            </div>
          </div>
          <div className=" duration-500 relative shadow-xl rounded-lg p-4 bg-secondary hover:-translate-y-2 hover:shadow-xl shadow-gray-300">
            <div className="flex">
              <div className="w-4/12 h-20">
                <div className="w-20 h-20 rounded-full bg-black">
                    <img className="rounded-full " src="/assets/img/headshot2_5000x.webp" alt="" />
                </div>
              </div>
              <div className="max-sm:ml-2 w-8/1 flex justify-start items-center">
                <p className="text-2xl font-semibold font">Ramsheena</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500">
              I am extremely pleased with the service provided by Fixit.
               The technicians were highly skilled and knowledgeable
              </p>
            </div>
            <div className="flex mt-3">
              <div className="w-5/12 flex">
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
                <IoIosStar size={20} className="text-yellow-400" />
              </div>
              <div className="w-7/12">
                <p className="text-gray-500">Reviewed on 30/03/2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersReview;
