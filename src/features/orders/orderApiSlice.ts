import { apiSlice } from "../api/apiSlice";

// Order Query Types
export interface OrdersQuery {
  page?: number;
  limit?: number;
  status?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface OrdersResponse {
  success: boolean;
  data: IOrder[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleOrderResponse {
  success: boolean;
  data: IOrder;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
  billingAddress: string;
  paymentMethod?: string;
  discountCode?: string;
  notes?: string;
}

export interface UpdateOrderRequest {
  status?: string;
  shippingAddress?: string;
  billingAddress?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  notes?: string;
}

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all orders
    getOrders: builder.query<OrdersResponse, OrdersQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/orders?${searchParams.toString()}`;
      },
      providesTags: ["Order"],
    }),

    // Get single order
    getOrder: builder.query<SingleOrderResponse, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Create order
    createOrder: builder.mutation<SingleOrderResponse, CreateOrderRequest>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    // Update order
    updateOrder: builder.mutation<
      SingleOrderResponse,
      { id: string; data: UpdateOrderRequest }
    >({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),

    // Cancel order
    cancelOrder: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Get user's orders
    getUserOrders: builder.query<OrdersResponse, OrdersQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/user/orders?${searchParams.toString()}`;
      },
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useCancelOrderMutation,
  useGetUserOrdersQuery,
} = orderApiSlice;
