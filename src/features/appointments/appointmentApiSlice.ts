import { apiSlice } from "../api/apiSlice";

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  staffId?: string;
  date: string;
  time: string;
  duration: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  notes?: string;
  totalAmount: number;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  service: {
    id: string;
    name: string;
    price: number;
    duration: number;
  };
  staff?: {
    id: string;
    name: string;
    specialization: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentsResponse {
  success: boolean;
  data: Appointment[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleAppointmentResponse {
  success: boolean;
  data: Appointment;
}

export interface AppointmentsQuery {
  page?: number;
  limit?: number;
  status?: string;
  serviceId?: string;
  staffId?: string;
  date?: string;
  userId?: string;
}

export interface CreateAppointmentRequest {
  serviceId: string;
  staffId?: string;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  serviceId?: string;
  staffId?: string;
  date?: string;
  time?: string;
  status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  notes?: string;
}

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all appointments
    getAppointments: builder.query<AppointmentsResponse, AppointmentsQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/appointments?${searchParams.toString()}`;
      },
      providesTags: ["Appointment"],
    }),

    // Get single appointment
    getAppointment: builder.query<SingleAppointmentResponse, string>({
      query: (id) => `/appointments/${id}`,
      providesTags: (result, error, id) => [{ type: "Appointment", id }],
    }),

    // Create appointment
    createAppointment: builder.mutation<
      SingleAppointmentResponse,
      CreateAppointmentRequest
    >({
      query: (appointmentData) => ({
        url: "/appointments",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
    }),

    // Update appointment
    updateAppointment: builder.mutation<
      SingleAppointmentResponse,
      { id: string; data: UpdateAppointmentRequest }
    >({
      query: ({ id, data }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Appointment", id }],
    }),

    // Cancel appointment
    cancelAppointment: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/appointments/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Appointment", id }],
    }),

    // Get user's appointments
    getUserAppointments: builder.query<AppointmentsResponse, AppointmentsQuery>(
      {
        query: (params) => {
          const searchParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
              searchParams.append(key, value.toString());
            }
          });
          return `/user/appointments?${searchParams.toString()}`;
        },
        providesTags: ["Appointment"],
      }
    ),

    // Get today's appointments
    getTodaysAppointments: builder.query<AppointmentsResponse, void>({
      query: () => "/appointments/today",
      providesTags: ["Appointment"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useCancelAppointmentMutation,
  useGetUserAppointmentsQuery,
  useGetTodaysAppointmentsQuery,
} = appointmentApiSlice;
