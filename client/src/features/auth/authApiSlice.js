import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogOut: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          //const { data } =
          await queryFulfilled;
        
          dispatch(logOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
      
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/api/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
            const {data} = await queryFulfilled;
            const {accessToken} = data;
            dispatch(setCredentials({accessToken}))
        } catch (err) {
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogOutMutation, useRefreshMutation } =
  authApiSlice;
