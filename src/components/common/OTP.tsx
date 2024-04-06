// import { useDispatch, useSelector } from "react-redux";
// import Modal from "react-modal";

// function OTP() {
//         const modalIsOpen = useSelector((state: RootState) => state.OtpModal.value)
//   const dispatch = useDispatch()
  
// //   function closeModal() {
// //     dispatch(closeLoginModal())
// //   }

// //   const handleOTPButtonClick = () => {
// //     dispatch(closeLoginModal())
// //     dispatch(openSignupModal());
// //   };

//   return (
//     <div>
//       <Modal
//         isOpen={modalIsOpen}
//         // onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={CustomStyles}
//         contentLabel="Example Modal"
//       >
//     <form className="flex flex-col items-center justify-center bg-white rounded-lg p-8 space-y-6 w-72">
//       <div className="text-xl font-bold text-black">OTP</div>
//       <div className="text-xl font-bold text-black">Verification Code</div>
//       <p className="text-sm text-gray-500">We have sent a verification code to your mobile number</p>
//       <div className="flex items-center justify-center space-x-4">
//         <input id="input1" type="text" maxLength={1} className="w-12 h-12 text-center border-none border-b-2 border-gray-300 focus:border-royalblue-outline appearance-none" />
//         <input id="input2" type="text" maxLength={1} className="w-12 h-12 text-center border-none border-b-2 border-gray-300 focus:border-royalblue-outline appearance-none" />
//         <input id="input3" type="text" maxLength={1} className="w-12 h-12 text-center border-none border-b-2 border-gray-300 focus:border-royalblue-outline appearance-none" />
//         <input id="input4" type="text" maxLength={1} className="w-12 h-12 text-center border-none border-b-2 border-gray-300 focus:border-royalblue-outline appearance-none" />
//       </div>
//       <button className="mt-6 px-4 py-2 rounded-lg bg-royalblue text-white">verify me</button>
//     </form>
//       </Modal>
//     </div>
//   );

// }

// export default OTP