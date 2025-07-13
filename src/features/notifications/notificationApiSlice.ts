import { apiSlice } from "../api/apiSlice";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "ORDER" | "APPOINTMENT" | "PROMOTION" | "SYSTEM" | "GENERAL";
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  data: Notification[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleNotificationResponse {
  success: boolean;
  data: Notification;
}

export interface NotificationsQuery {
  page?: number;
  limit?: number;
  type?: string;
  isRead?: boolean;
}

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get user notifications
    getNotifications: builder.query<NotificationsResponse, NotificationsQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/notifications?${searchParams.toString()}`;
      },
      providesTags: ["Notification"],
    }),

    // Get single notification
    getNotification: builder.query<SingleNotificationResponse, string>({
      query: (id) => `/notifications/${id}`,
      providesTags: (result, error, id) => [{ type: "Notification", id }],
    }),

    // Mark notification as read
    markNotificationAsRead: builder.mutation<
      SingleNotificationResponse,
      string
    >({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "PUT",
        body: { isRead: true },
      }),
      invalidatesTags: (result, error, id) => [{ type: "Notification", id }],
    }),

    // Delete notification
    deleteNotification: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Notification", id }],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationQuery,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApiSlice;
