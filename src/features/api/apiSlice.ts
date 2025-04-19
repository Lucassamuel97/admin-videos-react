import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "http://localhost:8080/api";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Categories", "CastMembers"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
});