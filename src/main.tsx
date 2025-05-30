import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryProvider } from "./lib/query-provider.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryProvider>
            <ThemeProvider>
                <AuthProvider>
                    <LanguageProvider>
                        <App />
                    </LanguageProvider>
                </AuthProvider>
            </ThemeProvider>
        </QueryProvider>
    </StrictMode>
);
