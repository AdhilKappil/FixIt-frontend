import {apiSlice} from './apiSlice'

const USER_URL = '/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: ()=>({
                url: `${USER_URL}/logout`,
                method: 'POST'
            })
        }),

        register: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/signup`,
              method: 'POST',
              body: data,
            }),
          }),

          googleAuth: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/googleAuth`,
              method: 'POST',
              body: data,
            }),
          }),

          sendOtpToEmail: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/sendEmail`,
              method: 'POST',
              body: data,
            }),
          }),
          
          otpVerification: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/verifyEmail`,
              method: 'POST',
              body: data,
            }),
          }),
          
          sendOTPforgotPassword: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/sendOTPforgotPassword`,
              method: 'POST',
              body: data,
            }),
          }),

          // user forgot password
          forgotPassword: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/forgotPassword`,
              method: 'POST',
              body: data,
            }),
          }),

          // For update user profile
          updateProfile: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/updateProfile`,
              method: 'PATCH',
              body: data,
            }),
          }),

          // For set and update user image
          setUserImg: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/addProfile`,
              method: 'PATCH', 
              body: data,
            }), 
          }),

          // For booking a service
          bookService: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/bookService`,
              method: 'POST',
              body: data,
            }),
          }),

          // Get bookings
          getBooking: builder.mutation({
            query: ({ userId, status }) => ({
                url: `${USER_URL}/getBooking`,
                method: 'GET',
                params: { userId, status }, 
            }),
          }),

          
    })
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useSendOtpToEmailMutation,
    useOtpVerificationMutation,useGoogleAuthMutation,useSendOTPforgotPasswordMutation,
    useForgotPasswordMutation,useSetUserImgMutation,useUpdateProfileMutation,useBookServiceMutation,
    useGetBookingMutation
} = userApiSlice