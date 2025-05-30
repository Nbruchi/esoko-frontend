# API Documentation

## Authentication

### Register User

-   **POST** `/api/auth/register`
-   **Body:**
    ```typescript
    {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phoneNumber?: string;
      profilePhoto?: string;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        user: User;
        token: string;
      };
      error?: string;
    }
    ```

### Login

-   **POST** `/api/auth/login`
-   **Body:**
    ```typescript
    {
        email: string;
        password: string;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        user: User;
        token: string;
      };
      error?: string;
    }
    ```

### Verify Email

-   **GET** `/api/auth/verify/:token`
-   **Response:**
    ```typescript
    {
        success: boolean;
        message: string;
    }
    ```

### Request Password Reset

-   **POST** `/api/auth/forgot-password`
-   **Body:**
    ```typescript
    {
        email: string;
    }
    ```
-   **Response:**
    ```typescript
    {
        success: boolean;
        message: string;
    }
    ```

### Reset Password

-   **POST** `/api/auth/reset-password`
-   **Body:**
    ```typescript
    {
        token: string;
        password: string;
    }
    ```
-   **Response:**
    ```typescript
    {
        success: boolean;
        message: string;
    }
    ```

## User Management

### Get User Profile

-   **GET** `/api/users/profile`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: User;
      error?: string;
    }
    ```

### Update User Profile

-   **PUT** `/api/users/profile`
-   **Body:**
    ```typescript
    {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      profilePhoto?: string;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: User;
      error?: string;
    }
    ```

### Update Notification Preferences

-   **PUT** `/api/users/notifications/preferences`
-   **Body:**
    ```typescript
    {
        emailNotifications: boolean;
        smsNotifications: boolean;
        orderUpdates: boolean;
        promotions: boolean;
        priceAlerts: boolean;
        stockAlerts: boolean;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: User;
      error?: string;
    }
    ```

## Address Management

### Get User Addresses

-   **GET** `/api/users/addresses`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Address[];
      error?: string;
    }
    ```

### Add Address

-   **POST** `/api/users/addresses`
-   **Body:**
    ```typescript
    {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
      isDefault?: boolean;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Address;
      error?: string;
    }
    ```

### Update Address

-   **PUT** `/api/users/addresses/:id`
-   **Body:**
    ```typescript
    {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
      isDefault?: boolean;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Address;
      error?: string;
    }
    ```

### Delete Address

-   **DELETE** `/api/users/addresses/:id`
-   **Response:**
    ```typescript
    {
        success: boolean;
        message: string;
    }
    ```

## Products

### Get Products

-   **GET** `/api/products`
-   **Query Parameters:**
    -   `page`: number
    -   `limit`: number
    -   `category`: string
    -   `search`: string
    -   `sort`: string
    -   `minPrice`: number
    -   `maxPrice`: number
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        items: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      error?: string;
    }
    ```

### Get Product Details

-   **GET** `/api/products/:id`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Product;
      error?: string;
    }
    ```

### Create Product (Seller)

-   **POST** `/api/products`
-   **Body:**
    ```typescript
    {
      name: string;
      description: string;
      price: number;
      stock: number;
      categoryId: string;
      images: string[];
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Product;
      error?: string;
    }
    ```

### Update Product (Seller)

-   **PUT** `/api/products/:id`
-   **Body:**
    ```typescript
    {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
      categoryId?: string;
      images?: string[];
      isActive?: boolean;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Product;
      error?: string;
    }
    ```

### Delete Product (Seller)

-   **DELETE** `/api/products/:id`
-   **Response:**
    ```typescript
    {
        success: boolean;
        message: string;
    }
    ```

## Categories

### Get Categories

-   **GET** `/api/categories`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Category[];
      error?: string;
    }
    ```

### Get Category Details

-   **GET** `/api/categories/:id`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Category;
      error?: string;
    }
    ```

## Cart

### Get Cart

-   **GET** `/api/cart`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Cart[];
      error?: string;
    }
    ```

### Add to Cart

-   **POST** `/api/cart`
-   **Body:**
    ```typescript
    {
        productId: string;
        quantity: number;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Cart;
      error?: string;
    }
    ```

### Update Cart Item

-   **PUT** `/api/cart/:id`
-   **Body:**
    ```typescript
    {
        quantity: number;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Cart;
      error?: string;
    }
    ```

### Remove from Cart

-   **DELETE** `/api/cart/:id`
-   **Response:**
    ```typescript
    {
        success: boolean;
        message: string;
    }
    ```

## Orders

### Create Order

-   **POST** `/api/orders`
-   **Body:**
    ```typescript
    {
        addressId: string;
        items: {
            productId: string;
            quantity: number;
        }
        [];
        paymentMethod: PaymentMethod;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Order;
      error?: string;
    }
    ```

### Get Orders

-   **GET** `/api/orders`
-   **Query Parameters:**
    -   `page`: number
    -   `limit`: number
    -   `status`: OrderStatus
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        items: Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      error?: string;
    }
    ```

### Get Order Details

-   **GET** `/api/orders/:id`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Order;
      error?: string;
    }
    ```

### Cancel Order

-   **POST** `/api/orders/:id/cancel`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Order;
      error?: string;
    }
    ```

## Reviews

### Create Review

-   **POST** `/api/products/:id/reviews`
-   **Body:**
    ```typescript
    {
      rating: number;
      comment?: string;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Review;
      error?: string;
    }
    ```

### Get Product Reviews

-   **GET** `/api/products/:id/reviews`
-   **Query Parameters:**
    -   `page`: number
    -   `limit`: number
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        items: Review[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      error?: string;
    }
    ```

## Notifications

### Get Notifications

-   **GET** `/api/notifications`
-   **Query Parameters:**
    -   `page`: number
    -   `limit`: number
    -   `type`: NotificationType
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        items: Notification[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      error?: string;
    }
    ```

### Mark Notification as Read

-   **PUT** `/api/notifications/:id/read`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Notification;
      error?: string;
    }
    ```

### Mark All Notifications as Read

-   **PUT** `/api/notifications/read-all`
-   **Response:**
    ```typescript
    {
        success: boolean;
        message: string;
    }
    ```

### Delete Notification

-   **DELETE** `/api/notifications/:id`
-   **Response:**
    ```typescript
    {
        success: boolean;
        message: string;
    }
    ```

## File Upload

### Upload File

-   **POST** `/api/files/upload`
-   **Body:** FormData
    -   `file`: File
    -   `type`: 'product' | 'profile' | 'blog'
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        url: string;
        filename: string;
      };
      error?: string;
    }
    ```

## Blog

### Get Blog Posts

-   **GET** `/api/blog`
-   **Query Parameters:**
    -   `page`: number
    -   `limit`: number
    -   `search`: string
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        items: BlogPost[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      error?: string;
    }
    ```

### Get Blog Post

-   **GET** `/api/blog/:id`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: BlogPost;
      error?: string;
    }
    ```

## Seller Features

### Get Seller Profile

-   **GET** `/api/seller/profile`
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Seller;
      error?: string;
    }
    ```

### Update Seller Profile

-   **PUT** `/api/seller/profile`
-   **Body:**
    ```typescript
    {
      businessName: string;
      description?: string;
      logo?: string;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Seller;
      error?: string;
    }
    ```

### Get Seller Products

-   **GET** `/api/seller/products`
-   **Query Parameters:**
    -   `page`: number
    -   `limit`: number
    -   `status`: 'active' | 'inactive'
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        items: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      error?: string;
    }
    ```

### Get Seller Orders

-   **GET** `/api/seller/orders`
-   **Query Parameters:**
    -   `page`: number
    -   `limit`: number
    -   `status`: OrderStatus
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        items: Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      error?: string;
    }
    ```

### Update Order Status (Seller)

-   **PUT** `/api/seller/orders/:id/status`
-   **Body:**
    ```typescript
    {
        status: OrderStatus;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: Order;
      error?: string;
    }
    ```

## Payment

### Create Payment Intent

-   **POST** `/api/payments/create-intent`
-   **Body:**
    ```typescript
    {
        amount: number;
        currency: string;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        clientSecret: string;
      };
      error?: string;
    }
    ```

### Confirm Payment

-   **POST** `/api/payments/confirm`
-   **Body:**
    ```typescript
    {
        paymentIntentId: string;
    }
    ```
-   **Response:**
    ```typescript
    {
      success: boolean;
      data?: {
        status: PaymentStatus;
      };
      error?: string;
    }
    ```

## Common Response Types

```typescript
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API uses standard HTTP status codes:

-   200: Success
-   201: Created
-   400: Bad Request
-   401: Unauthorized
-   403: Forbidden
-   404: Not Found
-   500: Internal Server Error

Error responses follow this format:

```typescript
{
  success: false;
  error: string;
  message?: string;
}
```
