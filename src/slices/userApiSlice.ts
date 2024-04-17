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


        //   update: builder.mutation({
        //     query: (data) => ({
        //       url: `${USER_URL}/profile`,
        //       method: 'PUT',
        //       body: data,
        //     }),
        //   }),

        //   setImg: builder.mutation({
        //     query: (data) => ({
        //       url: `${USER_URL}/addProfile`,
        //       method: 'POST', // Corrected method to POST
        //       body: data,
        //     }), 
        //   }),
          
    })
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useSendOtpToEmailMutation,
    useOtpVerificationMutation,useGoogleAuthMutation,useSendOTPforgotPasswordMutation,
    useForgotPasswordMutation
} = userApiSlice