import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthTokens, AuthState } from "@/types";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User, tokens: AuthTokens, rememberMe?: boolean) => void;
    logout: () => void;
    refreshToken: () => Promise<void>;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>(() => {
        // Try to get state from storage on mount
        const stored = AUTH_STORAGE.get();
        return stored || { user: null, tokens: null };
    });

    // Set up token refresh interval
    useEffect(() => {
        if (!authState.tokens) return;

        const refreshInterval = setInterval(async () => {
            const now = Date.now();
            const expiresAt = authState.tokens?.expiresAt || 0;

            // Refresh if token expires in less than 5 minutes
            if (expiresAt - now < 5 * 60 * 1000) {
                try {
                    await refreshToken();
                } catch (error) {
                    console.error("Failed to refresh token:", error);
                    logout();
                }
            }
        }, 60 * 1000); // Check every minute

        return () => clearInterval(refreshInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState.tokens]);

    const login = (user: User, tokens: AuthTokens, rememberMe?: boolean) => {
        const newState = { user, tokens };
        setAuthState(newState);
        AUTH_STORAGE.set(newState, rememberMe);
    };

    const logout = () => {
        setAuthState({ user: null, tokens: null });
        AUTH_STORAGE.clear();
    };

    const refreshToken = async () => {
        if (!authState.tokens?.refreshToken) {
            throw new Error("No refresh token available");
        }

        try {
            const response = await fetch("/api/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken: authState.tokens.refreshToken,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to refresh token");
            }

            const { accessToken, refreshToken, expiresAt } =
                await response.json();
            const newTokens = { accessToken, refreshToken, expiresAt };

            setAuthState((prev) => ({
                ...prev,
                tokens: newTokens,
            }));

            // Update storage with new tokens
            if (authState.user) {
                AUTH_STORAGE.set(
                    { user: authState.user, tokens: newTokens },
                    authState.user.rememberMe
                );
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user: authState.user,
                isAuthenticated: !!authState.user,
                login,
                logout,
                refreshToken,
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
