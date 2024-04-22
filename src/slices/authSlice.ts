import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  _id?: string;
  email: string;
  name: string;
  mobile?: number;
  password?: string;
 
}

export interface WorkerInfo extends UserInfo{
  img:string,
  joinDate:string
}

interface InitialState {
  userInfo: UserInfo | null;
  registerInfo: UserInfo | null;
  workerInfo: WorkerInfo | null;
  adminInfo: UserInfo | null;
  forgotEmailInfo: string | null;
}

const userInfoFromLocalStorage = localStorage.getItem("userInfo");
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const workerInfoFromLocalStorage = localStorage.getItem("workerInfo");
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo");
const forgotEmailInfoFromLocalStorage = localStorage.getItem("forgotEmailInfo");

const initialState: InitialState = {
  userInfo: userInfoFromLocalStorage
    ? JSON.parse(userInfoFromLocalStorage)
    : null,

  registerInfo: registerInfoFromLocalStorage
    ? JSON.parse(registerInfoFromLocalStorage)
    : null,

  workerInfo: workerInfoFromLocalStorage
    ? JSON.parse(workerInfoFromLocalStorage)
    : null,

  adminInfo: adminInfoFromLocalStorage
    ? JSON.parse(adminInfoFromLocalStorage)
    : null,

  forgotEmailInfo: forgotEmailInfoFromLocalStorage
    ? JSON.parse(forgotEmailInfoFromLocalStorage)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    userLogOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },

    setWorkerCredential: (state, action) => {
      state.workerInfo = action.payload;
      localStorage.setItem("workerInfo", JSON.stringify(action.payload));
    },

    workerLogOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem("workerInfo");
    },

    setRegister: (state, action) => {
      state.registerInfo = action.payload;
      localStorage.setItem("registerInfo", JSON.stringify(action.payload));
    },

    clearRegister: (state) => {
      state.registerInfo = null;
      localStorage.removeItem("registerInfo");
    },

    setForgotEmail: (state, action) => {
      state.forgotEmailInfo = action.payload;
      localStorage.setItem("forgotEmailInfo", JSON.stringify(action.payload));
    },

    clearForgotEmail: (state) => {
      state.forgotEmailInfo = null;
      localStorage.removeItem("forgotEmailInfo");
    },

    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },

    adminLogout: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const {
  setCredential,
  userLogOut,
  setAdminCredentials,
  adminLogout,
  setRegister,
  clearRegister,
  setForgotEmail,
  clearForgotEmail,
  setWorkerCredential,
  workerLogOut
} = authSlice.actions;

export default authSlice.reducer;
