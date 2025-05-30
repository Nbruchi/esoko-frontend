import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {
    User,
    AuthTokens,
    AuthState,
    LoginRequest,
    RegisterRequest,
} from "@/types";
import { apiService } from "@/services/api";
import { AxiosError } from "axios";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    verifyEmail: (token: string) => Promise<void>;
    resendVerification: (email: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AUTH_STORAGE_KEY = "auth_state";
const AUTH_STORAGE = {
    get: () => {
        const state = sessionStorage.getItem(AUTH_STORAGE_KEY);
        if (!state) return null;
        try {
            return JSON.parse(state) as AuthState;
        } catch {
            return null;
        }
    },
    set: (state: AuthState, rememberMe?: boolean) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
    },
    clear: () => {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface ValidationError {
    path: string[];
    message: string;
}

interface ErrorResponse {
    success: false;
    error: string;
    errors?: ValidationError[];
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>(() => {
        const stored = AUTH_STORAGE.get();
        return stored || { user: null, tokens: null };
    });
    const [isLoading, setIsLoading] = useState(true);

    // Set up token refresh interval
    useEffect(() => {
        if (!authState.tokens) {
            setIsLoading(false);
            return;
        }

        const refreshInterval = setInterval(async () => {
            const now = Date.now();
            const expiresAt = authState.tokens?.expiresAt || 0;

            // Refresh if token expires in less than 5 minutes
            if (
                expiresAt - now < 5 * 60 * 1000 &&
                authState.tokens?.refreshToken
            ) {
                try {
                    const response = await apiService.post<{
                        data: { tokens: AuthTokens };
                    }>("/auth/refresh", {
                        refreshToken: authState.tokens.refreshToken,
                    });

                    const newTokens = response.data.tokens;
                    setAuthState((prev) => ({
                        ...prev,
                        tokens: newTokens,
                    }));

                    if (authState.user) {
                        AUTH_STORAGE.set(
                            { user: authState.user, tokens: newTokens },
                            authState.user.rememberMe
                        );
                    }
                } catch (error) {
                    console.error("Failed to refresh token:", error);
                    logout();
                }
            }
        }, 60 * 1000); // Check every minute

        setIsLoading(false);
        return () => clearInterval(refreshInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState.tokens]);

    const login = async (credentials: LoginRequest) => {
        try {
            const response = await apiService.post<{
                data: { user: User; tokens: AuthTokens };
            }>("/auth/login", credentials);

            const { user, tokens } = response.data;
            const newState = { user, tokens };
            setAuthState(newState);
            AUTH_STORAGE.set(newState, credentials.rememberMe);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (data: RegisterRequest) => {
        try {
            setIsLoading(true);
            console.log("Registration data:", data); // Debug log
            const response = await apiService.post<{
                data: { user: User; tokens: AuthTokens };
            }>("/auth/register", data);
            setAuthState(response.data);
            AUTH_STORAGE.set(response.data, false);
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            console.log("Registration error:", axiosError.response?.data); // Debug log
            if (axiosError.response?.data?.errors) {
                const validationErrors = axiosError.response.data.errors;
                const errorMessage = validationErrors
                    .map(
                        (err: ValidationError) =>
                            `${err.path.join(".")}: ${err.message}`
                    )
                    .join("\n");
                throw new Error(errorMessage);
            }
            throw new Error(
                axiosError.response?.data?.error || "Registration failed"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            if (authState.tokens?.accessToken) {
                await apiService.post("/auth/logout");
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setAuthState({ user: null, tokens: null });
            AUTH_STORAGE.clear();
        }
    };

    const verifyEmail = async (token: string) => {
        try {
            await apiService.post("/auth/verify-email", { token });
        } catch (error) {
            console.error("Email verification failed:", error);
            throw error;
        }
    };

    const resendVerification = async (email: string) => {
        try {
            await apiService.post("/auth/resend-verification", { email });
        } catch (error) {
            console.error("Resend verification failed:", error);
            throw error;
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            await apiService.post("/auth/forgot-password", { email });
        } catch (error) {
            console.error("Forgot password request failed:", error);
            throw error;
        }
    };

    const resetPassword = async (token: string, newPassword: string) => {
        try {
            await apiService.post("/auth/reset-password", {
                token,
                newPassword,
            });
        } catch (error) {
            console.error("Password reset failed:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user: authState.user,
                isAuthenticated: !!authState.user,
                isLoading,
                login,
                register,
                logout,
                verifyEmail,
                resendVerification,
                forgotPassword,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
