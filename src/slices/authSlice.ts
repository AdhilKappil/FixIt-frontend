import { createSlice } from "@reduxjs/toolkit"


export interface UserInfo {
    id?: string;
    email : string
    name: string;
    mobile : number;
    password?:string
}

interface InitialState {
    userInfo: UserInfo | null;
    adminInfo: UserInfo | null;
}

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const adminInfoFromLocalStorage = localStorage.getItem('adminInfo');

const initialState: InitialState = {
    userInfo: userInfoFromLocalStorage 
        ? JSON.parse(userInfoFromLocalStorage)
        : null,

    adminInfo: adminInfoFromLocalStorage 
        ? JSON.parse(adminInfoFromLocalStorage)
        : null
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

        setCredential : (state, action)=>{
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        },

        userLogOut: (state)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        },

        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
          },

          adminLogout: (state) => {
            state.adminInfo = null;
            localStorage.removeItem('adminInfo');
          }
    }
})

export const {setCredential, userLogOut, setAdminCredentials, adminLogout} = authSlice.actions;

export default authSlice.reducer