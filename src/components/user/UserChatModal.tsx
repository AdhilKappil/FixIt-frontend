import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { CustomStyles } from "../common/ModalStyle";
import { RootState } from "../../app/store";
import "../common/commonStyle.css";
import { closeUserChatModal } from "../../slices/modalSlices/chatSlice";
import {
  useGetMessageMutation,
  useSendMessageMutation,
} from "../../slices/api/chatApiSlice";
import { IMessage } from "../../@types/schema";

const UserChatModal = (props: {conversationId: string;}) => {
  const modalIsOpen = useSelector((state: RootState) => state.chatModal.userChatModal.value);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [sendMessage] = useSendMessageMutation();
  const [getMessage] = useGetMessageMutation();
  const [chatText, setChatText] = useState("");
  const [message, setMessage] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await getMessage({
          conversationId: props.conversationId,
        }).unwrap();
        if (res) {
          setMessage(res.message.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchChat();
  }, [props.conversationId]);

  const sendChat = async () => {
    try {
        await sendMessage({
        conversationId: props.conversationId,
        senderId:userInfo?._id,
        text: chatText,
      }).unwrap();
      setChatText("")
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    dispatch(closeUserChatModal());
  };

  console.log(message);

  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={CustomStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-[500px] md:w-[700px]">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              {message.map((mes) => (
                <div key={mes._id} className="grid grid-cols-12 gap-y-2">
                  {mes.senderId != userInfo?._id ?
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        W
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>{mes.text}</div>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        Me
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>{mes.text}</div>
                      </div>
                    </div>
                  </div>
                  }


                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center h-16  rounded-xl bg-gray-00 w-full px-4">
            <div>
              <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                {/* SVG */}
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  onChange={(e) => setChatText(e.target.value)}
                  value={chatText}
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  {/* SVG */}
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
                onClick={sendChat}
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span className="ml-2">{/* SVG */}</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserChatModal;
