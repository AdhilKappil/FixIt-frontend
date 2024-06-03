import { apiSlice } from "./apiSlice";

const CHAT_URL = "https://shopbrandhub.online/api/chat";

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

     // Create message
     sendMessage: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/message`,
        method: "POST",
        body: data,
      }),
    }),

    // get all message
     getMessage: builder.mutation({
      query: ({conversationId}) => ({
        url: `${CHAT_URL}/message`,
        method: "GET",
        params: { conversationId},
      }),
    }),
 

  }),
});

export const {
   
    useCreateConversationMutation,
    useSendMessageMutation,
    useGetMessageMutation
    
} = userApiSlice;
