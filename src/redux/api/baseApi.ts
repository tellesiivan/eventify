/* eslint-disable @typescript-eslint/no-var-requires */
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const baseApiSlice = createApi({
  tagTypes: ["Settings", "Membergraph"],
  baseQuery: fakeBaseQuery(),

  endpoints: () => ({}),
});
