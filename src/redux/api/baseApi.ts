/* eslint-disable @typescript-eslint/no-var-requires */
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const baseApiSlice = createApi({
  tagTypes: ["Settings", "Membergraph", "Location"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https:",

  }),

  endpoints: (build) => ({}),
});
