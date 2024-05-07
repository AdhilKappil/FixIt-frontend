import { apiSlice } from "./apiSlice";

const CHAT_URL = "/api/chat";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    // Create conversation
    createConversation: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/conversation`,
        method: "POST",
        body: data,
      }),
    }),

    getConversation: builder.mutation({
      query: ({ senderId, receiverId}) => ({
        url: `${CHAT_URL}/conversation`,
        method: "GET",
        params: { senderId, receiverId},
      }),
    }),
 

  }),
});

export const {
   
    useCreateConversationMutation,
    useGetConversationMutation
    
} = userApiSlice;
