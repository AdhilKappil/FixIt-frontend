import { configureStore } from '@reduxjs/toolkit'
import loginModalReducer from '../slices/modalSlices/loginModal'
import  signupModalReducer  from '../slices/modalSlices/signupModal'
import OtpModalReducer from '../slices/modalSlices/OtpModal'
import { apiSlice } from '../slices/apiSlice'
import authReducer from '../slices/authSlice'


export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    signupModal: signupModalReducer,
    OtpModal:OtpModalReducer,
    auth:authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch