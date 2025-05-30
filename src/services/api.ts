import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
} from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiService {
    private static instance: ApiService;
    private api: AxiosInstance;

    private constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.setupInterceptors();
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private setupInterceptors() {
        // Request interceptor
        this.api.interceptors.request.use(
            (config) => {
                const authState = JSON.parse(
                    localStorage.getItem("auth_state") ||
                        sessionStorage.getItem("auth_state") ||
                        "null"
                );

                if (authState?.tokens?.accessToken) {
                    config.headers.Authorization = `Bearer ${authState.tokens.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config;

                // Handle token refresh
                if (error.response?.status === 401 && originalRequest) {
                    try {
                        const authState = JSON.parse(
                            localStorage.getItem("auth_state") ||
                                sessionStorage.getItem("auth_state") ||
                                "null"
                        );

                        if (authState?.tokens?.refreshToken) {
                            const response = await this.api.post(
                                "/auth/refresh",
                                {
                                    refreshToken: authState.tokens.refreshToken,
                                }
                            );

                            const { accessToken, refreshToken, expiresAt } =
                                response.data.data.tokens;

                            // Update storage
                            const newState = {
                                ...authState,
                                tokens: {
                                    accessToken,
                                    refreshToken,
                                    expiresAt,
                                },
                            };

                            if (authState.user?.rememberMe) {
                                localStorage.setItem(
                                    "auth_state",
                                    JSON.stringify(newState)
                                );
                            } else {
                                sessionStorage.setItem(
                                    "auth_state",
                                    JSON.stringify(newState)
                                );
                            }

                            // Retry original request
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                            return this.api(originalRequest);
                        }
                    } catch (refreshError) {
                        // If refresh fails, clear auth state
                        localStorage.removeItem("auth_state");
                        sessionStorage.removeItem("auth_state");
                        window.location.href = "/login";
                        console.log(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.get<T>(url, config);
        return response.data;
    }

    public async post<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await this.api.post<T>(url, data, config);
        return response.data;
    }

    public async put<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await this.api.put<T>(url, data, config);
        return response.data;
    }

    public async delete<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await this.api.delete<T>(url, config);
        return response.data;
    }
}

export const apiService = ApiService.getInstance();
