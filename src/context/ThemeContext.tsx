import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("theme") as Theme) || "system";
        }
        return "system";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
            return;
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem("theme", theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
