import { createSlice } from '@reduxjs/toolkit'


export interface CounterState {
  value: boolean
}

const initialState: CounterState = {
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