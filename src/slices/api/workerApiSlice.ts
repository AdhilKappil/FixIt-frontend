import { apiSlice } from "./apiSlice";

const WORKER_URL = "/api/worker";

export const workerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    workerLogin: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    workerLogout: builder.mutation({
      query: () => ({
        url: `${WORKER_URL}/logout`,
        method: "POST",
      }),
    }),

    workerRegister: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),

      // Get worker
      getWorker: builder.mutation({
        query: ({email}) => ({
          url: `${WORKER_URL}/getWorker`,
          method: "GET",
          params: {email},
        }),
      }),

      // For updating worker profile
    updateWorkerProfile: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/updateProfile`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Get bookings
    getBookings: builder.mutation({
      query: ({ userId, status, service,workerId }) => ({
        url: `${WORKER_URL}/getBookings`,
        method: "GET",
        params: { userId, status, service,workerId },
      }),
    }),

    // Commit work
    commitWork: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/commitWork`,
        method: "PATCH",
        body: data,
      }),
    }),

   // start work otp verification
    sendOtpToEmailStartWork: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/sendOtpToEmail`,
        method: "POST",
        body: data,
      }),
    }),

   // start work otp verification
   verifyEmailOtp: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/verifyEmail`,
        method: "POST",
        body: data,
      }),
    }),

     // generate bill
   generateBill: builder.mutation({
    query: (data) => ({
      url: `${WORKER_URL}/generateBill`,
      method: "POST",
      body: data,
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
