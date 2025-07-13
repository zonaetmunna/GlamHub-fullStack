import { apiSlice } from "../api/apiSlice";

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
  serviceCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCategoriesResponse {
  success: boolean;
  data: ServiceCategory[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleServiceCategoryResponse {
  success: boolean;
  data: ServiceCategory;
}

export interface ServiceCategoriesQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export interface CreateServiceCategoryRequest {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface UpdateServiceCategoryRequest {
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive?: boolean;
}

export const serviceCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all service categories
    getServiceCategories: builder.query<
      ServiceCategoriesResponse,
      ServiceCategoriesQuery
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/service-categories?${searchParams.toString()}`;
      },
      providesTags: ["ServiceCategory"],
    }),

    // Get single service category
    getServiceCategory: builder.query<SingleServiceCategoryResponse, string>({
      query: (id) => `/service-categories/${id}`,
      providesTags: (result, error, id) => [{ type: "ServiceCategory", id }],
    }),

    // Create service category
    createServiceCategory: builder.mutation<
      SingleServiceCategoryResponse,
      CreateServiceCategoryRequest
    >({
      query: (categoryData) => ({
        url: "/service-categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["ServiceCategory"],
    }),

    // Update service category
    updateServiceCategory: builder.mutation<
      SingleServiceCategoryResponse,
      { id: string; data: UpdateServiceCategoryRequest }
    >({
      query: ({ id, data }) => ({
        url: `/service-categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ServiceCategory", id },
      ],
    }),

    // Delete service category
    deleteServiceCategory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/service-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "ServiceCategory", id }],
    }),
  }),
});

export const {
  useGetServiceCategoriesQuery,
  useGetServiceCategoryQuery,
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
} = serviceCategoryApiSlice;
