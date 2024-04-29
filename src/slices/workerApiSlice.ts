import {apiSlice} from './apiSlice'

const WORKER_URL = '/api/worker';

export const workerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        workerLogin: builder.mutation({
            query: (data)=>({
                url: `${WORKER_URL}/login`,
                method: 'POST',
                body: data
            })
        }),

        workerLogout: builder.mutation({
            query: ()=>({
                url: `${WORKER_URL}/logout`,
                method: 'POST'
            })
        }),

        workerRegister: builder.mutation({
            query: (data) => ({
              url: `${WORKER_URL}/signup`,
              method: 'POST',
              body: data,
            }),
          }),


          updateWorkerProfile: builder.mutation({
            query: (data) => ({
              url: `${WORKER_URL}/updateProfile`,
              method: 'PATCH',
              body: data,
            }),
          }),

        //   setImg: builder.mutation({
        //     query: (data) => ({
        //       url: `${USER_URL}/addProfile`,
        //       method: 'POST', // Corrected method to POST
        //       body: data,
        //     }), 
        //   }),
          
    })
})

export const {useWorkerLoginMutation, useWorkerLogoutMutation, useWorkerRegisterMutation, 
    useUpdateWorkerProfileMutation
} = workerApiSlice