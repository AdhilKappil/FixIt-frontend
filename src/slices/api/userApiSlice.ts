import { apiSlice } from "./apiSlice";

const USER_URL = `${import.meta.env.VITE_BASE_URL}/api/user`;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // user login
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // user log out
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    // user register
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // for googleauth
    googleAuth: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/googleAuth`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // for send otp to email
    sendOtpToEmail: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/sendEmail`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // here verifiying otp
    otpVerification: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/verifyEmail`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // send forgot password
    sendOTPforgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/sendOTPforgotPassword`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // user forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgotPassword`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // For update user profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/updateProfile`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

    // For set and update user image
    setUserImg: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/addProfile`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

    // For booking a service
    bookService: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/bookService`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // Get bookings
    getBooking: builder.mutation({
      query: ({ userId, status,workerId,service }) => ({
        url: `${USER_URL}/getBookings`,
        method: "GET",
        params: { userId, status,workerId,service },
        credentials: "include" as const,
      }),
    }),

     // Cancel booking
     cancelBooking: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/cancelBooking`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

     // Cancel booking
     payment: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/payment`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSendOtpToEmailMutation,
  useOtpVerificationMutation,
  useGoogleAuthMutation,
  useSendOTPforgotPasswordMutation,
  useForgotPasswordMutation,
  useSetUserImgMutation,
  useUpdateProfileMutation,
  useBookServiceMutation,
  useGetBookingMutation,
  useCancelBookingMutation,
  usePaymentMutation
} = userApiSlice;
