import { apiSlice } from "../api/apiSlice";

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  location: string;
  department: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  benefits: string[];
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  resumeUrl: string;
  status: "PENDING" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "ACCEPTED";
  appliedAt: string;
  job: Job;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface JobsResponse {
  success: boolean;
  data: Job[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleJobResponse {
  success: boolean;
  data: Job;
}

export interface JobApplicationsResponse {
  success: boolean;
  data: JobApplication[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface JobsQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  location?: string;
  department?: string;
}

export interface CreateJobApplicationRequest {
  jobId: string;
  coverLetter: string;
  resumeUrl: string;
}

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all jobs
    getJobs: builder.query<JobsResponse, JobsQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/jobs?${searchParams.toString()}`;
      },
      providesTags: ["Job"],
    }),

    // Get single job
    getJob: builder.query<SingleJobResponse, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "Job", id }],
    }),

    // Apply for job
    applyForJob: builder.mutation<
      { success: boolean; message: string },
      CreateJobApplicationRequest
    >({
      query: (applicationData) => ({
        url: `/jobs/${applicationData.jobId}/applications`,
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: ["Application"],
    }),

    // Get user's job applications
    getUserApplications: builder.query<
      JobApplicationsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) =>
        `/applications?page=${page}&limit=${limit}`,
      providesTags: ["Application"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useApplyForJobMutation,
  useGetUserApplicationsQuery,
} = jobApiSlice;
