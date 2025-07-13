import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  description?: string;
  type: "PRODUCT" | "SERVICE";
  parentId?: string;
  parent?: Category;
  children?: Category[];
  imageUrl?: string;
  productCount: number;
  serviceCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleCategoryResponse {
  success: boolean;
  data: Category;
}

export interface CategoriesQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: "PRODUCT" | "SERVICE";
  parentId?: string;
}

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query<CategoriesResponse, CategoriesQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/categories?${searchParams.toString()}`;
      },
      providesTags: ["Category"],
    }),

    // Get single category
    getCategory: builder.query<SingleCategoryResponse, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    // Get product categories
    getProductCategories: builder.query<
      CategoriesResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) =>
        `/categories?type=PRODUCT&page=${page}&limit=${limit}`,
      providesTags: ["Category"],
    }),

    // Get service categories
    getServiceCategories: builder.query<
      CategoriesResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) =>
        `/categories?type=SERVICE&page=${page}&limit=${limit}`,
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetProductCategoriesQuery,
  useGetServiceCategoriesQuery,
} = categoryApiSlice;
