import { apiSlice } from "./apiSlice";

const USER_URL = "https://shopbrandhub.online/api/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // user login
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    // user log out
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),

    // user register
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),

    // for googleauth
    googleAuth: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/googleAuth`,
        method: "POST",
        body: data,
      }),
    }),

    // for send otp to email
    sendOtpToEmail: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/sendEmail`,
        method: "POST",
        body: data,
      }),
    }),

    // here verifiying otp
    otpVerification: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/verifyEmail`,
        method: "POST",
        body: data,
      }),
    }),

    // send forgot password
    sendOTPforgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/sendOTPforgotPassword`,
        method: "POST",
        body: data,
      }),
    }),

    // user forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgotPassword`,
        method: "POST",
        body: data,
      }),
    }),

    // For update user profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/updateProfile`,
        method: "PATCH",
        body: data,
      }),
    }),

    // For set and update user image
    setUserImg: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/addProfile`,
        method: "PATCH",
        body: data,
      }),
    }),

    // For booking a service
    bookService: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/bookService`,
        method: "POST",
        body: data,
      }),
    }),

    // Get bookings
    getBooking: builder.mutation({
      query: ({ userId, status,workerId,service }) => ({
        url: `${USER_URL}/getBookings`,
        method: "GET",
        params: { userId, status,workerId,service },
      }),
    }),

     // Cancel booking
     cancelBooking: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/cancelBooking`,
        method: "PATCH",
        body: data,
      }),
    }),

     // Cancel booking
     payment: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/payment`,
        method: "POST",
        body: data,
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
