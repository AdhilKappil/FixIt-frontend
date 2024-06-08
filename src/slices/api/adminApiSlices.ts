import { apiSlice } from "./apiSlice";
const ADMIN_URL = `${import.meta.env.VITE_BASE_URL}/api/admin`;

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // For admin login with jwt
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // for admin log out
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    // For get user data
    getUsersData: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getUsers`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // For block or unblock user
    putBlockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users/unblock-block?id=${data}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),

    // For block or un block worker
    blockWorker: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/worker/unblock-block?id=${data}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),

    // For create new service
    createService: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/createService`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // For get all service data
    getService: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getServices`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // For edit all service details
    editService: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/editService`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    // get all new worker join requests
    getJoinRequests: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getJoinRequests`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // Accept or Reject worker request
    acceptOrRejectRequest: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/worker/accept-rejectRequest`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

    // Get bookings
    adminGetBookings: builder.mutation({
      query: ({ userId, status, service, workerId }) => ({
        url: `${ADMIN_URL}/getBookings`,
        method: "GET",
        params: { userId, status, service, workerId },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useGetUsersDataMutation,
  usePutBlockUserMutation,
  useCreateServiceMutation,
  useGetServiceMutation,
  useEditServiceMutation,
  useGetJoinRequestsMutation,
  useAcceptOrRejectRequestMutation,
  useBlockWorkerMutation,
  useAdminGetBookingsMutation,
} = adminApiSlice;
