// User types
interface IUser {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  profileImage?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  STAFF = "STAFF",
}

// Category types
interface ICategory {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  type: CategoryType;
  parentId?: string;
  parent?: ICategory;
  children?: ICategory[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

enum CategoryType {
  PRODUCT = "PRODUCT",
  SERVICE = "SERVICE",
}

// Enhanced Product types
interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  images: string[];
  stockCount: number;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: string;
  category: ICategory;
  reviews: IReview[];
  quantity: number; // For cart/wishlist
  createdAt: Date;
  updatedAt: Date;
}

// Review types
interface IReview {
  id: string;
  userId: string;
  user: IUser;
  productId: string;
  rating: number;
  comment?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order types
interface IOrder {
  id: string;
  userId: string;
  user: IUser;
  orderNumber: string;
  items: IOrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  paymentMethod?: string;
  paymentStatus: PaymentStatus;
  stripePaymentId?: string;
  shippingCost: number;
  discountCode?: string;
  discountAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: IProduct;
  quantity: number;
  price: number;
  createdAt: Date;
}

enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

// Service types
interface IService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
  images: string[];
  categoryId: string;
  category: ICategory;
  staff: IStaff[];
  timeSlots: ITimeSlot[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Staff types
interface IStaff {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialization?: string;
  imageUrl?: string;
  services: IService[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Time Slot types
interface ITimeSlot {
  id: string;
  serviceId: string;
  staffId: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Appointment types
interface IAppointment {
  id: string;
  userId: string;
  user: IUser;
  serviceId: string;
  service: IService;
  staffId: string;
  staff: IStaff;
  timeSlotId: string;
  timeSlot: ITimeSlot;
  scheduledTime: Date;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

enum AppointmentStatus {
  REQUESTED = "REQUESTED",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

// Job types
interface IJob {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  jobType: JobType;
  salary?: string;
  status: JobStatus;
  applications: IJobApplication[];
  createdAt: Date;
  updatedAt: Date;
}

enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
}

enum JobStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  DRAFT = "DRAFT",
}

// Job Application types
interface IJobApplication {
  id: string;
  jobId: string;
  job: IJob;
  userId: string;
  user: IUser;
  coverLetter?: string;
  resumeUrl: string;
  status: JobApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

enum JobApplicationStatus {
  PENDING = "PENDING",
  REVIEWED = "REVIEWED",
  SHORTLISTED = "SHORTLISTED",
  REJECTED = "REJECTED",
  HIRED = "HIRED",
}

// Notification types
interface INotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  data?: string;
  createdAt: Date;
  updatedAt: Date;
}

enum NotificationType {
  ORDER_PLACED = "ORDER_PLACED",
  ORDER_CONFIRMED = "ORDER_CONFIRMED",
  ORDER_SHIPPED = "ORDER_SHIPPED",
  ORDER_DELIVERED = "ORDER_DELIVERED",
  APPOINTMENT_BOOKED = "APPOINTMENT_BOOKED",
  APPOINTMENT_CONFIRMED = "APPOINTMENT_CONFIRMED",
  APPOINTMENT_REMINDER = "APPOINTMENT_REMINDER",
  JOB_APPLICATION_RECEIVED = "JOB_APPLICATION_RECEIVED",
  GENERAL = "GENERAL",
}

// Redux State types
interface IWishlistState {
  wishlist: IProduct[];
}

interface ICartState {
  cart: IProduct[];
  shippingOption: string;
  shippingCost: number;
  discountCode: string;
  subtotal: number;
  total: number;
  billingAddress: IBillingAddress;
}

interface IBillingAddress {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  city?: string;
  zip?: number;
}

// Search and Filter types
interface IProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  search?: string;
  sortBy?: "price" | "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

// API Response types
interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form types
interface ILoginForm {
  email: string;
  password: string;
}

interface ISignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IProfileUpdateForm {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
}
