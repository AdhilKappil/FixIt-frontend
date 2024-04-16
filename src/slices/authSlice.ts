import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  _id?: string;
  email: string;
  name: string;
  mobile?: number;
  password?: string;
}

interface InitialState {
  userInfo: UserInfo | null;
  registerInfo: UserInfo | null;
  adminInfo: UserInfo | null;
}

const userInfoFromLocalStorage = localStorage.getItem("userInfo");
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo");

const initialState: InitialState = {
  userInfo: userInfoFromLocalStorage
    ? JSON.parse(userInfoFromLocalStorage)
    : null,

  registerInfo: registerInfoFromLocalStorage
    ? JSON.parse(registerInfoFromLocalStorage)
    : null,

  adminInfo: adminInfoFromLocalStorage
    ? JSON.parse(adminInfoFromLocalStorage)
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

    setRegister: (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem("registerInfo", JSON.stringify(action.payload));
      },
  
    clearRegister: (state) => {
        state.userInfo = null;
        localStorage.removeItem("registerInfo");
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

export const { setCredential, userLogOut, setAdminCredentials, adminLogout,setRegister ,clearRegister} =
  authSlice.actions;

export default authSlice.reducer;
