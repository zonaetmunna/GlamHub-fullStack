import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
  }),
  tagTypes: ["product", "auth", "store", "category", "order"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
