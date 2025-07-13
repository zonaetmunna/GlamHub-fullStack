import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    // Add auth token if available
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  credentials: "include", // Include cookies for authentication
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Product",
    "Service",
    "ServiceCategory",
    "Category",
    "Brand",
    "User",
    "Auth",
    "Order",
    "Appointment",
    "Staff",
    "Job",
    "Application",
    "Notification",
    "Review",
    "Cart",
    "Wishlist",
    "Admin",
    "Settings",
    "Analytics",
    "Blog",
    "Message",
    "Invoice",
  ],

  endpoints: (builder) => ({}),
});

export default apiSlice;
