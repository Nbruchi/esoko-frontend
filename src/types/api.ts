// Common Types
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Auth Types
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isVerified: boolean;
    phoneNumber?: string;
    profilePhoto?: string;
}

// Product Types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    categoryId: string;
    stock: number;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
}

// Category Types
export interface Category {
    id: string;
    name: string;
    description?: string;
    parentId?: string;
    image?: string;
}

// Order Types
export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: string;
    shippingAddress: Address;
    paymentMethod: PaymentMethod;
    trackingNumber?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product: {
        id: string;
        name: string;
        image: string;
    };
}

export interface OrderTracking {
    id: string;
    orderId: string;
    status: string;
    location?: string;
    timestamp: string;
    description: string;
}

// Cart Types
export interface CartItem {
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

// User Types
export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: string;
    type: string;
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
}

// Review Types
export interface Review {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
    };
}

// Wishlist Types
export interface WishlistItem {
    id: string;
    productId: string;
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
}

// Notification Types
export interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    data?: Record<string, unknown>;
}

export interface NotificationPreferences {
    emailNotifications: boolean;
    smsNotifications: boolean;
    orderUpdates: boolean;
    promotions: boolean;
}

// Request Types
export interface CreateOrderRequest {
    items: Array<{
        productId: string;
        quantity: number;
    }>;
    shippingAddress: string;
    paymentMethod: string;
}

export interface UpdateOrderRequest {
    status?: string;
    trackingNumber?: string;
}

export interface AddToCartRequest {
    productId: string;
    quantity: number;
}

export interface UpdateCartItemRequest {
    quantity: number;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profilePhoto?: string;
}

export interface SearchParams {
    query: string;
    filters?: Record<string, unknown>;
    page?: number;
    limit?: number;
}
