import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("language") as Language) || "en";
        }
        return "en";
    });

    const [translations, setTranslations] = useState<Record<string, unknown>>(
        {}
    );

    useEffect(() => {
        // Load translations based on selected language
        import(`../locales/${language}.json`)
            .then((module) => {
                setTranslations(module.default);
            })
            .catch((error) => {
                console.error(
                    `Failed to load ${language} translations:`,
                    error
                );
            });
    }, [language]);

    const t = (key: string): string => {
        const keys = key.split(".");
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = value[k] as Record<string, unknown>;
            } else {
                return key; // Return key if translation not found
            }
        }

        return typeof value === "string" ? value : key;
    };

    const value = {
        language,
        setLanguage: (lang: Language) => {
            localStorage.setItem("language", lang);
            setLanguage(lang);
        },
        t,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
