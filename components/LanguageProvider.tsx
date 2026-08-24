"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  translations,
  type Language,
} from "@/lib/i18n";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("vi");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "tinhaiphat-language",
    ) as Language | null;

    if (savedLanguage === "vi" || savedLanguage === "en") {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("tinhaiphat-language", newLanguage);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider",
    );
  }

  return context;
}