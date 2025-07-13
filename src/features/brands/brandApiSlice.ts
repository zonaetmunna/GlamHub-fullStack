import { apiSlice } from "../api/apiSlice";

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BrandsResponse {
  success: boolean;
  data: Brand[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleBrandResponse {
  success: boolean;
  data: Brand;
}

export interface BrandsQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export interface CreateBrandRequest {
  name: string;
  description?: string;
  logo?: string;
  website?: string;
}

export interface UpdateBrandRequest {
  name?: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive?: boolean;
}

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all brands
    getBrands: builder.query<BrandsResponse, BrandsQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/brands?${searchParams.toString()}`;
      },
      providesTags: ["Brand"],
    }),

    // Get single brand
    getBrand: builder.query<SingleBrandResponse, string>({
      query: (id) => `/brands/${id}`,
      providesTags: (result, error, id) => [{ type: "Brand", id }],
    }),

    // Create brand
    createBrand: builder.mutation<SingleBrandResponse, CreateBrandRequest>({
      query: (brandData) => ({
        url: "/brands",
        method: "POST",
        body: brandData,
      }),
      invalidatesTags: ["Brand"],
    }),

    // Update brand
    updateBrand: builder.mutation<
      SingleBrandResponse,
      { id: string; data: UpdateBrandRequest }
    >({
      query: ({ id, data }) => ({
        url: `/brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Brand", id }],
    }),

    // Delete brand
    deleteBrand: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Brand", id }],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApiSlice;
