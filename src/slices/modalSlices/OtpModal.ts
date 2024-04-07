import { createSlice } from '@reduxjs/toolkit'
import { ModalState } from './loginModal'

const initialState: ModalState = {
  value: false,
}

export const OtpModalSlice = createSlice({
  name: 'OtpModal',
  initialState,
  reducers: {
    openOtpModal: (state) => {
      state.value = true
    },
    closeOtpModal: (state) => {
      state.value = false
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { openOtpModal, closeOtpModal } = OtpModalSlice.actions

export default OtpModalSlice.reducer