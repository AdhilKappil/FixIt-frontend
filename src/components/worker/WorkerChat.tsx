import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "../common/commonStyle.css";
import {
  useGetMessageMutation,
  useSendMessageMutation,
  useViewMessagesMutation,
} from "../../slices/api/chatApiSlice";
import { IConversation, IMessage } from "../../@types/schema";
import { useSocket } from "../../App";
import { IoIosSend } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiGrin } from "react-icons/bs";

function WorkerChat(props: { conversationData: IConversation }) {
  const { workerInfo } = useSelector((state: RootState) => state.auth);
  const [sendMessage] = useSendMessageMutation();
  const [getMessage] = useGetMessageMutation();
  const [viewMessages] = useViewMessagesMutation();
  const [chatText, setChatText] = useState("");
  const [message, setMessage] = useState<IMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();
  // for emoji picker
  const [emoji, setEmoji] = useState<boolean>(false);

  useEffect(() => {
    socket?.emit("addUser", workerInfo?._id);
    socket?.on("getMessage", (data: any) => {
      setMessage((prev) => [
        ...prev,
        {
          _id: "", // Ideally, this should be provided by the server
          conversationId: data.conversationId,
          senderId: data.senderId,
          text: data.text,
          createdAt: new Date().toISOString(),
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
          conversationId: props.conversationData._id,
        }).unwrap();
        if (res) {
          setMessage(res.message.data);
          const idsToUpdate = res.message.data
          .filter(
            (msg: IMessage) =>
              msg.status === false && msg.senderId !== workerInfo?._id
          )
          .map((msg: IMessage) => msg._id);

        if (idsToUpdate.length > 0) {
          // Send the array of IDs to the backend to update their status
          await viewMessages({ _id: idsToUpdate }).unwrap();
        }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchChat();
  }, [props.conversationData._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sendChat = async () => {
    const receiverId = props.conversationData.members.find(
      (member) => member !== workerInfo?._id
    );

    socket?.emit("sendMessage", {
      senderId: workerInfo?._id,
      receiverId,
      text: chatText,
    });

    try {
      const res = await sendMessage({
        conversationId: props.conversationData._id,
        senderId: workerInfo?._id,
        receiverId,
        text: chatText,
      }).unwrap();
      setMessage([...message, res.newConversation]);
      setChatText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setChatText((prevInput) => prevInput + emojiObject.emoji);
    setEmoji(false);
  };

  return (
    <div
      className="bg-tertiary rounded-xl shadow h-[540px]"
      style={{
        overflowY: "scroll",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div className="sticky top-0 z-10 bg-tertiary">
        <div className="flex items-center gap-5 p-3">
          <div>
            {props.conversationData.user_profile ? (
              <img
                className="h-16 w-16 rounded-full"
                src={props.conversationData.user_profile}
                alt=""
              />
            ) : (
              <img
                className="h-16 w-16 rounded-full"
                src="/assets/img/images.jpg"
                alt=""
              />
            )}
          </div>
          <div className="font-Sans text-2xl">{props.conversationData.user}</div>
        </div>
        <hr />
      </div>
      <div className="flex flex-col p-2 min-h-[370px]">
        {message.map((mes) => (
          <div
            ref={scrollRef}
            key={mes._id}
            className="grid grid-cols-12 gap-y-2"
          >
            {mes.senderId !== workerInfo?._id ? (
              <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="relative text-sm bg-gray-500 py-2 px-4 shadow rounded-lg ml-3">
                    <p className="max-w-48 md:max-w-96 break-words text-white">
                      {mes.text}
                    </p>
                    <VscTriangleDown className="absolute text-[30px] top-[-9px] left-[-12px] text-gray-500" />
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
                  <div className="relative text-sm bg-indigo-100 py-2 px-4 shadow rounded-lg mr-3">
                    <p className="max-w-48 md:max-w-96 break-words">{mes.text}</p>
                    <VscTriangleDown className="absolute text-[30px] top-[-10px] right-[-14px] text-indigo-100" />
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
      <div className="flex flex-row items-center border-t-[1px] bg-tertiary w-full px-4 py-4 sticky bottom-0">
        <div className="flex-grow ml-4 items-center">
          <div className="relative w-full">
            {emoji && (
              <div className="absolute bottom-[75px] transition-transform duration-300 ease-in-out transform">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <div className="flex relative">
              <BsEmojiGrin
                size={20}
                className="text-[25px] text-gray-400 absolute top-2.5 left-2"
                onClick={() => setEmoji(!emoji)}
              />
              <input
                type="text"
                placeholder="Message..."
                onChange={(e) => setChatText(e.target.value)}
                value={chatText}
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-8 h-10"
              />
            </div>
          </div>
        </div>
        <div className="ml-4">
          {chatText && (
            <button
              onClick={sendChat}
              className="rounded-full flex p-2 bg-blue-600"
            >
              <IoIosSend color="white" size={25} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerChat;
