import { apiSlice } from "../api/apiSlice";

export interface Application {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  experience?: string;
  status: "PENDING" | "REVIEWING" | "INTERVIEW" | "ACCEPTED" | "REJECTED";
  appliedDate: string;
  notes?: string;
  job?: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationsResponse {
  success: boolean;
  data: Application[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleApplicationResponse {
  success: boolean;
  data: Application;
}

export interface ApplicationsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  jobId?: string;
  date?: string;
}

export interface CreateApplicationRequest {
  jobId: string;
  applicantName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  experience?: string;
}

export interface UpdateApplicationRequest {
  status?: "PENDING" | "REVIEWING" | "INTERVIEW" | "ACCEPTED" | "REJECTED";
  notes?: string;
}

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all applications
    getApplications: builder.query<ApplicationsResponse, ApplicationsQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/applications?${searchParams.toString()}`;
      },
      providesTags: ["Application"],
    }),

    // Get single application
    getApplication: builder.query<SingleApplicationResponse, string>({
      query: (id) => `/applications/${id}`,
      providesTags: (result, error, id) => [{ type: "Application", id }],
    }),

    // Create application
    createApplication: builder.mutation<
      SingleApplicationResponse,
      CreateApplicationRequest
    >({
      query: (applicationData) => ({
        url: "/applications",
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update application
    updateApplication: builder.mutation<
      SingleApplicationResponse,
      { id: string; data: UpdateApplicationRequest }
    >({
      query: ({ id, data }) => ({
        url: `/applications/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Application", id }],
    }),

    // Delete application
    deleteApplication: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Application", id }],
    }),

    // Get applications by job
    getApplicationsByJob: builder.query<
      ApplicationsResponse,
      { jobId: string; page?: number; limit?: number }
    >({
      query: ({ jobId, page = 1, limit = 10 }) =>
        `/jobs/${jobId}/applications?page=${page}&limit=${limit}`,
      providesTags: (result, error, { jobId }) => [
        { type: "Application", id: jobId },
      ],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
  useGetApplicationsByJobQuery,
} = applicationApiSlice;
