import { apiSlice } from "../api/apiSlice";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  profileImage?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  preferences: {
    notifications: boolean;
    marketing: boolean;
    newsletter: boolean;
  };
  stats: {
    totalOrders: number;
    totalSpent: number;
    totalAppointments: number;
  };
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  profileImage?: string;
  currentPassword?: string;
  newPassword?: string;
  preferences?: {
    notifications?: boolean;
    marketing?: boolean;
    newsletter?: boolean;
  };
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),

    // Update user profile
    updateUserProfile: builder.mutation<
      UserProfileResponse,
      UpdateProfileRequest
    >({
      query: (profileData) => ({
        url: "/user/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["User", "Auth"],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
  userApiSlice;
