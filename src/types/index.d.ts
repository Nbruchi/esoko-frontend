enum UserRole {
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    CUSTOMER = "CUSTOMER",
}

enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
}

enum PaymentMethod {
    CARD = "CARD",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
}

enum NotificationType {
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
    SYSTEM_UPDATE = "SYSTEM_UPDATE",
    PROMOTIONAL = "PROMOTIONAL",
}

enum RefundStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    COMPLETED = "COMPLETED",
}

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phoneNumber?: string;
    profilePhoto?: string;
    isVerified: boolean;
    notificationPreferences?: {
        emailNotifications: boolean;
        smsNotifications: boolean;
        orderUpdates: boolean;
        promotions: boolean;
    };
    settings?: {
        language: string;
        currency: string;
        theme: string;
        timezone: string;
    };
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
}

interface Address {
    id: string;
    userId: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    sellerId: string;
    images: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface Category {
    id: string;
    name: string;
    description?: string;
    image?: string;
    parentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Order {
    id: string;
    userId: string;
    addressId: string;
    status: OrderStatus;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    paymentIntentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
}

interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Seller {
    id: string;
    userId: string;
    businessName: string;
    description?: string;
    logo?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    message: string;
    metadata?: Record<string, unknown>;
    isRead: boolean;
    createdAt: Date;
}

interface RefundRequest {
    id: string;
    orderId: string;
    userId: string;
    reason: string;
    status: RefundStatus;
    createdAt: Date;
    updatedAt: Date;
}

interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    image?: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface Wishlist {
    id: string;
    userId: string;
    productId: string;
    createdAt: Date;
}

interface Cart {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

interface SearchHistory {
    id: string;
    userId: string;
    query: string;
    createdAt: Date;
}

// Additional API Types
interface OrderTracking {
    id: string;
    orderId: string;
    status: string;
    location?: string;
    timestamp: string;
    description: string;
}

interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
}

interface WishlistItem {
    id: string;
    productId: string;
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
}

interface NotificationPreferences {
    emailNotifications: boolean;
    smsNotifications: boolean;
    orderUpdates: boolean;
    promotions: boolean;
}

interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
