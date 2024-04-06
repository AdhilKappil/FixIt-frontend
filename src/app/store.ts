import { configureStore } from '@reduxjs/toolkit'
import loginModalReducer from '../slices/loginModal'
import  signupModalReducer  from '../slices/signupModal'
import OtpModalReducer from '../slices/OtpModal'


export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    signupModal: signupModalReducer,
    OtpModal:OtpModalReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch