
import { apiSlice } from './apiSlice';
const ADMIN_URL = '/api/admin';


export const adminApiSlice = apiSlice.injectEndpoints({
    
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: 'POST',
        body: data
      })
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
        method: 'GET',
      })
    }),

    // deleteUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${ADMIN_URL}/users/delete?id=${data}`,
    //     method: 'DELETE',
    //   })
    // }),


    // updateUserData: builder.mutation({
    //   query: (data) => ({
    //     url: `${ADMIN_URL}/users/update-user`,
    //     method: 'PUT',
    //     body: data
    //   })
    // }),

    putBlockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users/unblock-block?id=${data}`,
        method: 'PATCH',
      })
    })

  })
});

export const {
  useAdminLoginMutation,
//   useAdminLogoutMutation,
  useGetUsersDataMutation,
//   useDeleteUserMutation,
//   useUpdateUserDataMutation,
  usePutBlockUserMutation
} = adminApiSlice;
