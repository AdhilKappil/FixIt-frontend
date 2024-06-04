import { apiSlice } from "./apiSlice";

const WORKER_URL = `${import.meta.env.VITE_BASE_URL}/api/worker`;

export const workerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // for worker login
    workerLogin: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // worker login
    workerLogout: builder.mutation({
      query: () => ({
        url: `${WORKER_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    // worker register
    workerRegister: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/signup`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

      // Get worker
      getWorker: builder.mutation({
        query: ({email}) => ({
          url: `${WORKER_URL}/getWorker`,
          method: "GET",
          params: {email},
          credentials: "include",
        }),
      }),

      // For updating worker profile
    updateWorkerProfile: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/updateProfile`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

    // Get bookings
    getBookings: builder.mutation({
      query: ({ userId, status, service,workerId }) => ({
        url: `${WORKER_URL}/getBookings`,
        method: "GET",
        params: { userId, status, service,workerId },
        credentials: "include",
      }),
    }),

    // Commit work
    commitWork: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/commitWork`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

   // start work otp verification
    sendOtpToEmailStartWork: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/sendOtpToEmail`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

   // start work otp verification
   verifyEmailOtp: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/verifyEmail`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

   // generate bill
   generateBill: builder.mutation({
    query: (data) => ({
      url: `${WORKER_URL}/generateBill`,
      method: "POST",
      body: data,
      credentials: "include",
    }),
  }),


  }),
});

export const {
  useWorkerLoginMutation,
  useWorkerLogoutMutation,
  useWorkerRegisterMutation,
  useUpdateWorkerProfileMutation,
  useGetBookingsMutation,
  useCommitWorkMutation,
  useSendOtpToEmailStartWorkMutation,
  useVerifyEmailOtpMutation,
  useGenerateBillMutation,
  useGetWorkerMutation
} = workerApiSlice;
