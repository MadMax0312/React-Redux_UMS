// EndPoints to work with the backend

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
        dashboard: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/dashboard`,
                method: "GET",
                body: data,
            }),
        }),
    }),
});

export const { useAdminloginMutation, useAdminlogoutMutation, useDashboardMutation } = adminApiSlice;
