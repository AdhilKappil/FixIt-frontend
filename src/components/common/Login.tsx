import React from "react";
import Modal from "react-modal";
import { FcGoogle } from "react-icons/fc";
import { CustomStyles } from "./ModalStyle";


Modal.setAppElement("#root");

function Login() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={CustomStyles}
        contentLabel="Example Modal"
      >
        <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 ">
          <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
              <h5>Login with</h5>
            </div> 
            <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12 justify-center">
              <button className="bg-secondary rounded-md border p-3">
                Continue with Google <FcGoogle size={25} className="inline-block" />
              </button>

              <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
                <p className="z-20 inline px-4 mb-2 font-semibold leading-normal bg-white text-sm text-slate-400">
                  or
                </p>
              </div>
            </div>
            <div className="flex-auto p-4">
              <form role="form text-left">
                <div className="mb-4 4">
                  <input
                    aria-describedby="email-addon"
                    aria-label="Email"
                    placeholder="Email"
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    type="email"
                  />
                </div>
                <div className="mb-4">
                  <input
                    aria-describedby="password-addon"
                    aria-label="Password"
                    placeholder="Password"
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    type="password"
                  />
                </div>
                <div className="text-center">
                  <button className="bg-primary w-full text-white p-2 rounded-md">Sign in</button>
                </div>
                <p className="mt-4 mb-0 leading-normal text-sm">
                  Already have an account?{" "}
                  <a
                    className="font-bold text-slate-700"
                    href="../pages/sign-in.html"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Login;
