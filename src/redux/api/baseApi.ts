/* eslint-disable @typescript-eslint/no-var-requires */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const baseApiSlice = createApi({
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: () => ({}),
});
