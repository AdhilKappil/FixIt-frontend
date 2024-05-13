import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "../common/commonStyle.css";
import {
  useGetMessageMutation,
  useSendMessageMutation,
} from "../../slices/api/chatApiSlice";
import { IConversation, IMessage } from "../../@types/schema";
import { useSocket } from "../../App";
import { IoIosSend } from "react-icons/io";
import { useLocation } from "react-router-dom";


function UserChat()  {
      const { userInfo } = useSelector((state: RootState) => state.auth);
      const [sendMessage] = useSendMessageMutation();
      const [getMessage] = useGetMessageMutation();
      const [chatText, setChatText] = useState("");
      const [message, setMessage] = useState<IMessage[]>([]);
      const scrollRef = useRef<HTMLDivElement>(null);
      const socket = useSocket(); 
      const location = useLocation()
      const conversationData:IConversation = location.state?.conversationData;
    
      useEffect(() => {
        socket?.emit("addUser", userInfo?._id);
        socket?.on("getMessage", (data: any) => {
          console.log(data);
    
          // Append the new message to the existing array
          setMessage((prev) => [
            ...prev,
            {
              _id: "", // You may need to assign an ID here
              conversationId: "",
              senderId: data.senderId,
              text: data.text,
              createdAt: new Date().toString(),  // Convert to string
            },
          ]);
        });
        return () => {
          socket?.off("getMessage");
        };
      }, [socket]);

    
      useEffect(() => {
        const fetchChat = async () => {
          try {
            const res = await getMessage({
              conversationId: conversationData._id,
            }).unwrap();
            if (res) {
              console.log(res, "ehllo");
    
              setMessage(res.message.data);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchChat();
      }, [conversationData._id]);
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [message]);
    
      const sendChat = async () => {
        const receiverId = conversationData.members.find(
          (member) => member !== userInfo?._id
        );
    
        socket?.emit("sendMessage", {
          senderId: userInfo?._id,
          receiverId,
          text: chatText,
        });
    
        try {
          const res = await sendMessage({
            conversationId:conversationData._id,
            senderId: userInfo?._id,
            text: chatText,
          }).unwrap();
          setMessage([...message, res.newConversation]);
          setChatText("");
        } catch (error) {
          console.error(error);
        }
      };
  return (
        <div className="lg:flex justify-center">
            <div
          className="bg-tertiary rounded-xl shadow-md h-[540px] relative lg:w-2/3"
          style={{
            overflowY: "scroll",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <div className="sticky top-0 z-10 bg-tertiary">
            <div className="flex items-center gap-5 p-3 ">
              <div className="">
                <img
                  className="h-16 w-16 rounded-full"
                  src={conversationData.worker_profile}
                  alt=""
                />
              </div>
              <div className="font-Sans text-2xl">
                {conversationData.worker}
              </div>
            </div>
            <hr />
          </div>
          <div>
            <div className="flex flex-col h-full  p-2">
              {message.map((mes) => (
                <div
                  ref={scrollRef}
                  key={mes._id}
                  className="grid grid-cols-12 gap-y-2"
                >
                  {mes.senderId != userInfo?._id ? (
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 flex-shrink-0">
                          <img className="rounded-full" src={conversationData.worker_profile} alt="" />
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <p className="max-w-48 md:max-w-96 break-words">
                            {mes.text}
                          </p>
                        </div>
                      </div>
                      <p className="text-[11px] font-thin m-1">
                        {new Date(mes.createdAt).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  ) : (
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 flex-shrink-0">
                          <img className="rounded-full" src={userInfo.profile_img} alt="" />
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <p className="max-w-48 md:max-w-96 break-words">
                            {mes.text}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <p className="text-[11px] font-thin m-1">
                          {new Date(mes.createdAt).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-row h-16 items-center rounded-xl bg-gray-00 w-full px-4 mb-2">
              <div className="flex-grow ml-4 items-center">
                <div className="relative w-fulla">
                  <input
                    type="text"
                    onChange={(e) => setChatText(e.target.value)}
                    value={chatText}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                </div>
              </div>
              <div className="ml-4">
                {chatText && (
                  <button
                    onClick={sendChat}
                    className="rounded-full flex  p-2 bg-blue-600"
                  >
                    <IoIosSend color="white" size={25} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      );
}

export default UserChat