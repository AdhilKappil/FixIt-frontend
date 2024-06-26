import { useEffect, useState } from "react";
import Footer from "../../components/user/layouts/Footer";
import Navbar from "../../components/user/layouts/Navbar";
import { IoIosStar } from "react-icons/io";
import { useGetServiceMutation } from "../../slices/api/adminApiSlices";
import { IService } from "../../validation/validationTypes";
import { useNavigate } from "react-router-dom";

function Services() {

  const [service, setService] = useState<IService[]>([]);
  const [getService] = useGetServiceMutation();
  const navigate = useNavigate()

  useEffect(() => {

    async function fetchUser() { 
      try {
        const res = await getService("").unwrap();
        const unblockedServices = res.data.filter((service:Record<string,any>)=> !service.isBlocked);
        setService(unblockedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchUser();
  }, []); // Add dependencies if needed
  
  console.log(service);
  
  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-20 ">
        <div className="text-primary font-sans text-4xl font-semibold">
          Services
        </div>
      </div>
      <div className="flex justify-center bg-secondary">
        <div className="w-3/4 mb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-14">
         
         {service.map((item)=>(
           <div onClick={()=>navigate("/serviceDetails",{ state: { data: item } })} key={item._id} className="max-w-sm rounded overflow-hidden shadow-lg mt-10 hover:translate-x-4 transition duration-300 hover:cursor-pointer">
           <img
             className="w-full h-60 object-cover"
             src={item.service_img}
             alt={item.serviceName} 
           />
           <div className="px-6 py-4">
             <div className="text-xl mb-2 text-primary font-sans font-semibold">
               {item.serviceName}
             </div>
             <p className=" text-base text-gray-500">
               {item.description}
             </p>
             <div className="flex items-center mt-2">
               <IoIosStar size={20} className="text-yellow-400" />
               <IoIosStar size={20} className="text-yellow-400" />
               <IoIosStar size={20} className="text-yellow-400" />
               <IoIosStar size={20} className="text-yellow-400" />
               <IoIosStar size={20} className="text-yellow-400" />
             </div>
           </div>
         </div>
         ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
