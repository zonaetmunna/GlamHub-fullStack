import { apiSlice } from "../api/apiSlice";

export interface ProductsResponse {
  success: boolean;
  data: IProduct[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleProductResponse {
  success: boolean;
  data: IProduct;
}

export interface ProductsQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  featured?: boolean;
}

export interface ReviewRequest {
  rating: number;
  comment: string;
}

export interface ReviewsResponse {
  success: boolean;
  data: IReview[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query<ProductsResponse, ProductsQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/products?${searchParams.toString()}`;
      },
      providesTags: ["Product"],
    }),

    // Get featured products
    getFeaturedProducts: builder.query<ProductsResponse, void>({
      query: () => "/products/featured",
      providesTags: ["Product"],
    }),

    // Get single product
    getProduct: builder.query<SingleProductResponse, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Get product reviews
    getProductReviews: builder.query<
      ReviewsResponse,
      { productId: string; page?: number; limit?: number }
    >({
      query: ({ productId, page = 1, limit = 10 }) =>
        `/products/${productId}/reviews?page=${page}&limit=${limit}`,
      providesTags: (result, error, { productId }) => [
        { type: "Review", id: productId },
      ],
    }),

    // Create product review
    createProductReview: builder.mutation<
      { success: boolean; message: string },
      { productId: string; review: ReviewRequest }
    >({
      query: ({ productId, review }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Review", id: productId },
      ],
    }),

    // Search products
    searchProducts: builder.query<
      ProductsResponse,
      { query: string; page?: number; limit?: number }
    >({
      query: ({ query, page = 1, limit = 10 }) =>
        `/products/search?q=${query}&page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductQuery,
  useGetProductReviewsQuery,
  useCreateProductReviewMutation,
  useSearchProductsQuery,
} = productApiSlice;
