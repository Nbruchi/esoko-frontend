// Enums
export enum UserRole {
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER",
    ADMIN = "ADMIN",
}

export enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
    CARD = "CARD",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
}

export enum NotificationType {
    ORDER_PLACED = "ORDER_PLACED",
    ORDER_CONFIRMED = "ORDER_CONFIRMED",
    ORDER_SHIPPED = "ORDER_SHIPPED",
    ORDER_DELIVERED = "ORDER_DELIVERED",
    ORDER_CANCELLED = "ORDER_CANCELLED",
    PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
    PAYMENT_FAILED = "PAYMENT_FAILED",
    REFUND_REQUESTED = "REFUND_REQUESTED",
    REFUND_APPROVED = "REFUND_APPROVED",
    REFUND_REJECTED = "REFUND_REJECTED",
    PRODUCT_REVIEW = "PRODUCT_REVIEW",
    SELLER_VERIFICATION = "SELLER_VERIFICATION",
    ACCOUNT_VERIFICATION = "ACCOUNT_VERIFICATION",
    PASSWORD_RESET = "PASSWORD_RESET",
    PRICE_ALERT = "PRICE_ALERT",
    STOCK_ALERT = "STOCK_ALERT",
}

export enum RefundStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

// Base Types
export interface BaseModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

// User Types
export interface User extends BaseModel {
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phoneNumber?: string;
    profilePhoto?: string;
    isVerified: boolean;
    notificationPreferences: NotificationPreferences;
    settings: UserSettings;
    lastLogin?: Date;
}

export interface NotificationPreferences {
    emailNotifications: boolean;
    smsNotifications: boolean;
    orderUpdates: boolean;
    promotions: boolean;
}

export interface UserSettings {
    language: string;
    currency: string;
    theme: "light" | "dark";
    timezone: string;
}

// Address Types
export interface Address extends BaseModel {
    userId: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    isDefault: boolean;
}

// Product Types
export interface Product extends BaseModel {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    sellerId: string;
    images: string[];
    isActive: boolean;
    category?: Category;
    seller?: Seller;
}

// Category Types
export interface Category extends BaseModel {
    name: string;
    description?: string;
    image?: string;
    parentId?: string;
    parent?: Category;
    children?: Category[];
}

// Order Types
export interface Order extends BaseModel {
    userId: string;
    addressId: string;
    status: OrderStatus;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    paymentIntentId?: string;
    address?: Address;
    items?: OrderItem[];
    refundRequests?: RefundRequest[];
}

export interface OrderItem extends BaseModel {
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    product?: Product;
}

// Review Types
export interface Review extends BaseModel {
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
    user?: User;
    product?: Product;
}

// Seller Types
export interface Seller extends BaseModel {
    userId: string;
    businessName: string;
    description?: string;
    logo?: string;
    isVerified: boolean;
    user?: User;
}

// Notification Types
export interface NotificationMetadata {
    template?: string;
    variables?: Record<string, unknown>;
    priority?: "high" | "medium" | "low";
    expiresAt?: Date;
    [key: string]: unknown;
}

export interface Notification extends BaseModel {
    userId: string;
    type: NotificationType;
    message: string;
    metadata?: NotificationMetadata;
    isRead: boolean;
}

// Refund Types
export interface RefundRequest extends BaseModel {
    orderId: string;
    userId: string;
    reason: string;
    status: RefundStatus;
    order?: Order;
    user?: User;
}

// Blog Types
export interface BlogPost extends BaseModel {
    title: string;
    content: string;
    author: string;
    image?: string;
    isPublished: boolean;
}

// Wishlist Types
export interface Wishlist extends BaseModel {
    userId: string;
    productId: string;
    product?: Product;
}

// Cart Types
export interface Cart extends BaseModel {
    userId: string;
    productId: string;
    quantity: number;
    product?: Product;
}

// Search Types
export interface SearchHistory extends BaseModel {
    userId: string;
    query: string;
}

// Request/Response Types
export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    profilePhoto?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    images: string[];
}

export interface OrderRequest {
    addressId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    paymentMethod: PaymentMethod;
}

export interface AddressRequest {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    isDefault?: boolean;
}

export interface ReviewRequest {
    rating: number;
    comment?: string;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
