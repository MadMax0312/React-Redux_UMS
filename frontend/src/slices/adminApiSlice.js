// EndPoints to work with the backend
// Mutation is used to send data to the server not to fetch
// to fech data we use query

import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminlogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
        adminlogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: "POST",
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/dashboard`,
                method: "GET",
            }),
        }),
        editUsers: builder.query({
            query: (id) => ({
                url: `${ADMIN_URL}/editUser/${id}`,
                method: "GET",
            })
        }),
        updateUsers: builder.mutation({
            query: ({ _id, name }) => ({ 
                url: `${ADMIN_URL}/editUser/${_id}`, 
                method: "PUT",
                body: { name }, 
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}/deleteUser/${id}`,
                method: "POST",
            })
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url:`${ADMIN_URL}/addUser`,
                method: "POST",
                body: data
            })
        })
    }),
});

export const { useAdminloginMutation, useAdminlogoutMutation, useGetUsersQuery, useEditUsersQuery, useUpdateUsersMutation, useDeleteUserMutation, useAddUserMutation } = adminApiSlice;
