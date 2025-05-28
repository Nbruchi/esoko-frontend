// Auth Requests
interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    profilePhoto?: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        isVerified: boolean;
    };
}

interface ForgotPasswordRequest {
    email: string;
}

interface ResetPasswordRequest {
    token: string;
    password: string;
}

// Product Requests
interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    images: string[];
}

interface UpdateProductRequest {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: string;
    images?: string[];
    isActive?: boolean;
}

// Order Requests
interface CreateOrderRequest {
    addressId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    paymentMethod: "CARD" | "CASH_ON_DELIVERY";
}

interface UpdateOrderStatusRequest {
    status: OrderStatus;
    trackingNumber?: string;
}

interface UpdateOrderRequest {
    status?: string;
    trackingNumber?: string;
}

// Address Requests
interface CreateAddressRequest {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    isDefault?: boolean;
}

interface UpdateAddressRequest {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    isDefault?: boolean;
}

// Review Requests
interface CreateReviewRequest {
    productId: string;
    rating: number;
    comment?: string;
}

interface UpdateReviewRequest {
    rating?: number;
    comment?: string;
}

// Cart Requests
interface AddToCartRequest {
    productId: string;
    quantity: number;
}

interface UpdateCartItemRequest {
    quantity: number;
}

// Payment Requests
interface PaymentIntentRequest {
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
}

// Service Response Types
interface ServiceResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Pagination Types
interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Search Types
interface SearchParams {
    query: string;
    filters?: Record<string, unknown>;
    page?: number;
    limit?: number;
}

// Notification Requests
interface CreateNotificationRequest {
    type: NotificationType;
    message: string;
    metadata?: Record<string, unknown>;
}

// File Upload Types
interface FileUploadResponse {
    url: string;
    filename: string;
    mimetype: string;
    size: number;
}

// Category Requests
interface CreateCategoryRequest {
    name: string;
    description?: string;
    image?: string;
    parentId?: string;
}

interface UpdateCategoryRequest {
    name?: string;
    description?: string;
    image?: string;
    parentId?: string;
}

// Blog Requests
interface CreateBlogPostRequest {
    title: string;
    content: string;
    author: string;
    image?: string;
    isPublished?: boolean;
}

interface UpdateBlogPostRequest {
    title?: string;
    content?: string;
    author?: string;
    image?: string;
    isPublished?: boolean;
}

// Seller Requests
interface CreateSellerProfileRequest {
    businessName: string;
    description?: string;
    logo?: string;
}

interface UpdateSellerProfileRequest {
    businessName?: string;
    description?: string;
    logo?: string;
    isVerified?: boolean;
}

// Refund Requests
interface CreateRefundRequest {
    orderId: string;
    reason: string;
}

interface UpdateRefundRequest {
    status: RefundStatus;
}

// Wishlist Requests
interface AddToWishlistRequest {
    productId: string;
}

// User Settings Requests
interface UpdateUserSettingsRequest {
    language?: string;
    currency?: string;
    theme?: string;
    timezone?: string;
}

interface UpdateNotificationPreferencesRequest {
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    orderUpdates?: boolean;
    promotions?: boolean;
}

interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profilePhoto?: string;
}

interface CreatePaymentMethodRequest {
    type: string;
    token: string;
    isDefault?: boolean;
}
