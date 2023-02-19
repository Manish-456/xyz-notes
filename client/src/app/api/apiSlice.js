import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://xyz-notes-api.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // if you want , handle other status code too
  if (result?.error?.status === 403) {
    
    // send refresh token to get new access token;
    const refreshResult = await baseQuery("/api/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
        // store the new token
    api.dispatch(setCredentials({ ...refreshResult.data }));
    
    // retry original query with new access token
    result = await baseQuery(args, api, extraOptions);
} else {
    if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired";
    }
    return refreshResult;
}
}
  return result;
};

export const apiSlice = createApi({
  baseQuery : baseQueryWithReAuth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
