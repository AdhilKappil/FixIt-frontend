import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
  value: boolean
}

const initialState: ModalState = {
  value: false,
}

export const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.value = true
    },
    closeLoginModal: (state) => {
      state.value = false
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { openLoginModal, closeLoginModal } = loginModalSlice.actions

export default loginModalSlice.reducer