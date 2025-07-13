import { apiSlice } from "../api/apiSlice";

// User Query Types
export interface UsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UsersResponse {
  success: boolean;
  data: IUser[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleUserResponse {
  success: boolean;
  data: IUser;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  profileImage?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  profileImage?: string;
  isActive?: boolean;
}

export interface UserStatsResponse {
  success: boolean;
  data: {
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    usersByRole: {
      [key: string]: number;
    };
    userGrowth: {
      month: string;
      count: number;
    }[];
  };
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users (Admin only)
    getUsers: builder.query<UsersResponse, UsersQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/admin/users?${searchParams.toString()}`;
      },
      providesTags: ["User"],
    }),

    // Get single user (Admin only)
    getUser: builder.query<SingleUserResponse, string>({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Create user (Admin only)
    createUser: builder.mutation<SingleUserResponse, CreateUserRequest>({
      query: (userData) => ({
        url: "/admin/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // Update user (Admin only)
    updateUser: builder.mutation<
      SingleUserResponse,
      { id: string; data: UpdateUserRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // Delete user (Admin only)
    deleteUser: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/admin/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, id) => [{ type: "User", id }],
      }
    ),

    // Make user admin (Admin only)
    makeUserAdmin: builder.mutation<
      SingleUserResponse,
      { id: string; role: UserRole }
    >({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // Toggle user active status (Admin only)
    toggleUserStatus: builder.mutation<
      SingleUserResponse,
      { id: string; isActive: boolean }
    >({
      query: ({ id, isActive }) => ({
        url: `/admin/users/${id}/status`,
        method: "PUT",
        body: { isActive },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // Get user statistics (Admin only)
    getUserStats: builder.query<UserStatsResponse, void>({
      query: () => "/admin/users/stats",
      providesTags: ["User"],
    }),

    // Search users (Admin only)
    searchUsers: builder.query<
      UsersResponse,
      { query: string; page?: number; limit?: number }
    >({
      query: ({ query, page = 1, limit = 10 }) =>
        `/admin/users/search?q=${query}&page=${page}&limit=${limit}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useMakeUserAdminMutation,
  useToggleUserStatusMutation,
  useGetUserStatsQuery,
  useSearchUsersQuery,
} = usersApiSlice;
