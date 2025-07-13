import { apiSlice } from "../api/apiSlice";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
  images?: string[];
  isActive: boolean;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };
  staff?: {
    id: string;
    name: string;
    specialization: string;
  }[];
  bookingCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  success: boolean;
  data: Service[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleServiceResponse {
  success: boolean;
  data: Service;
}

export interface ServicesQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  staffId?: string;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
  categoryId?: string;
  staffIds?: string[];
}

export interface UpdateServiceRequest {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  imageUrl?: string;
  categoryId?: string;
  staffIds?: string[];
  isActive?: boolean;
}

export const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all services
    getServices: builder.query<ServicesResponse, ServicesQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/services?${searchParams.toString()}`;
      },
      providesTags: ["Service"],
    }),

    // Get single service
    getService: builder.query<SingleServiceResponse, string>({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) => [{ type: "Service", id }],
    }),

    // Create service
    createService: builder.mutation<
      SingleServiceResponse,
      CreateServiceRequest
    >({
      query: (serviceData) => ({
        url: "/services",
        method: "POST",
        body: serviceData,
      }),
      invalidatesTags: ["Service"],
    }),

    // Update service
    updateService: builder.mutation<
      SingleServiceResponse,
      { id: string; data: UpdateServiceRequest }
    >({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Service", id }],
    }),

    // Delete service
    deleteService: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Service", id }],
    }),

    // Search services
    searchServices: builder.query<
      ServicesResponse,
      { query: string; page?: number; limit?: number }
    >({
      query: ({ query, page = 1, limit = 10 }) =>
        `/services/search?q=${query}&page=${page}&limit=${limit}`,
      providesTags: ["Service"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useSearchServicesQuery,
} = serviceApiSlice;
