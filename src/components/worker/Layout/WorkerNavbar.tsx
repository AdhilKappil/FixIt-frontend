
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../common/Login';
import { workerLogOut } from '../../../slices/authSlice';
import { RootState } from '../../../app/store';
import { useWorkerLogoutMutation } from '../../../slices/api/workerApiSlice';
import { toast } from 'react-toastify';
// import { useGetUnReadMessagesMutation } from '../../../slices/api/chatApiSlice';
// import { useSocket } from '../../../App';
// import { IMessage } from '../../../@types/schema';
// import { useWorkerLogoutMutation } from '../../../slices/workerApiSlice';

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/worker/home', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function WorkerNavbar() {

  const dispatch = useDispatch()
  const { workerInfo } = useSelector((state:RootState) => state.auth);
  const navigate = useNavigate()
  const [logOut] = useWorkerLogoutMutation();
  // const [getUnReadMessages] = useGetUnReadMessagesMutation();
  // const socket = useSocket();
  // const [message, setMessage] = useState<IMessage[]>([]);

  // // for get all un read messages
  // useEffect(() => {
  //   const fetchChat = async () => {
  //     try {
  //       if(workerInfo){
  //         const res = await getUnReadMessages({ id: workerInfo?._id }).unwrap();
  //         setMessage(res.message.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchChat();
  // }, []);

  
  // // for live new message notification
  // useEffect(() => {
  //   socket?.emit("addUser", workerInfo?._id);
  //   socket?.on("getMessage", (data: any) => {
  //     console.log(data);
  //     // Append the new message to the existing array
  //     setMessage((prev) => [
  //       ...prev,
  //       {
  //         _id: "", // You may need to assign an ID here
  //         conversationId: "",
  //         senderId: data.senderId,
  //         text: data.text,
  //         createdAt: new Date().toString(), // Convert to string
  //       },
  //     ]);
  //   });
  //   return () => {
  //     socket?.off("getMessage");
  //   };
  // }, [socket]);
  

  const handleLogout = async()=>{
    try {
      const res = await logOut("").unwrap()
      toast.success(res.message)
      dispatch(workerLogOut())
      navigate('/worker/workerLogin')
    //   await logOut('').unwrap()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 ">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center  sm:items-stretch justify-start max-sm:ml-10">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/assets/icons/adhil-02.png"
                    alt="FixIt"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 text-primary font-semibold">
                    {navigation.map((item) => (
                       <Link
                       key={item.name}
                       to={item.href} // Use `to` instead of `href`
                       className={classNames(
                         item.current ? 'text-indigo-600' : 'hover:text-indigo-600',
                         'px-3 py-2 rounded-md text-base font-medium'
                       )}
                     >
                       {item.name}
                     </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <div className='relative'>
             <button
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true"/>
                </button>
               {message.length>0 && 
                <div className="absolute top-[-8px] left-5 bg-red-700 rounded-full w-5 h-5 flex justify-center items-center text-xs text-white">
                {message.length}
            </div>
               }
             </div> */}

                {workerInfo ?
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={workerInfo?.profile_img}
                        alt="Profile"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95" 
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                          <button
                           onClick={()=>navigate("/worker")}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                      {({ active }) => (
                        <a onClick={handleLogout}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                    </Menu.Items>
                  
                  </Transition>
                </Menu> 
                  : <button  onClick={()=>navigate("/worker/workerLogin")}  className='bg-primary hover:bg-black text-white rounded w-20 h-8 ml-3 text-sm'>Login
                  </button>
                   } 
              </div>
            </div>
          <Login/>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
