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

 

  }),
});

export const {
   
    useCreateConversationMutation
    
} = userApiSlice;
