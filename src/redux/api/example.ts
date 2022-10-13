import { baseApiSlice } from "./baseApi";

export const exampleApi = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<undefined, void>({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
  }),
});
export const { useGetPostsQuery } = exampleApi;
