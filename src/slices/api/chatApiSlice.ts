import { apiSlice } from "./apiSlice";

const CHAT_URL = `${import.meta.env.VITE_BASE_URL}/api/chat`

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    // Create conversation
    createConversation: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/conversation`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

     // Create message
     sendMessage: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/message`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // get all message
     getMessage: builder.mutation({
      query: ({conversationId}) => ({
        url: `${CHAT_URL}/message`,
        method: "GET",
        params: { conversationId},
        credentials: "include",
      }),
    }),

      // get all messages
      viewMessages: builder.mutation({
        query: (data) => ({
          url: `${CHAT_URL}/viewMessages`,
          method: "PATCH",
          body: data,
          credentials: "include",
        }),
      }),

      
    // get all un read messages
     getUnReadMessages: builder.mutation({
      query: ({id}) => ({
        url: `${CHAT_URL}/getUnReadMessages`,
        method: "GET",
        params: {id},
        credentials: "include",
      }),
    }),
 

  }),
});

export const {
   
    useCreateConversationMutation,
    useSendMessageMutation,
    useGetMessageMutation,
    useViewMessagesMutation,
    useGetUnReadMessagesMutation
    
} = userApiSlice;
