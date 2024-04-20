import { apiSlice } from "./apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    // adminLogout: builder.mutation({
    //   query: () => ({
    //     url: `${ADMIN_URL}/logout`,
    //     method: 'POST'
    //   })
    // }),

    getUsersData: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getUsers`,
        method: "GET",
      }),
    }),

    putBlockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users/unblock-block?id=${data}`,
        method: "PATCH",
      }),
    }),

    createService: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/createService`,
        method: "POST",
        body: data,
      }),
    }),

    getService: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getServices`,
        method: "GET",
      }),
    }),

    editService: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/editService`,
        method: "PUT",
        body: data,
      }),
    }),

    // get all new worker join requests
    getJoinRequests: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getJoinRequests`,
        method: "GET",
      }),
    }),

    // Accept or Reject worker request
    acceptOrRejectRequest: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/worker/accept-rejectRequest`,
        method: "PATCH",
        body: data,
      }),
    }),


  }),
});

export const {
  useAdminLoginMutation,
  //   useAdminLogoutMutation,
  useGetUsersDataMutation,
  usePutBlockUserMutation,
  useCreateServiceMutation,
  useGetServiceMutation,
  useEditServiceMutation,
  useGetJoinRequestsMutation,
  useAcceptOrRejectRequestMutation
} = adminApiSlice;
