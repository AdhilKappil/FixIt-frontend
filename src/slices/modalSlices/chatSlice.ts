import { createSlice } from '@reduxjs/toolkit'
import { ModalState } from './loginModal'

const initialState: ModalState = {
  value: false,
}

export const ChatModalSlice = createSlice({
  name: 'ChatModal',
  initialState,
  reducers: {
    openChatModal: (state) => {
      state.value = true
    },
    closeChatModal: (state) => {
      state.value = false
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { openChatModal, closeChatModal } = ChatModalSlice.actions

export default ChatModalSlice.reducer