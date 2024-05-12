import { createSlice } from '@reduxjs/toolkit'

// Define the initial state for both modals
const initialState = {
  userChatModal: {
    value: false,
  },
  workerChatModal: {
    value: false,
  }
}

export const ChatModalSlice = createSlice({
  name: 'ChatModal',
  initialState,
  reducers: {
    openUserChatModal: (state) => {
      state.userChatModal.value = true
    },
    closeUserChatModal: (state) => {
      state.userChatModal.value = false
    },
    openWorkerChatModal: (state) => {
      state.workerChatModal.value = true
    },
    closeWorkerChatModal: (state) => {
      state.workerChatModal.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { openUserChatModal, closeUserChatModal, openWorkerChatModal, closeWorkerChatModal } = ChatModalSlice.actions

export default ChatModalSlice.reducer
