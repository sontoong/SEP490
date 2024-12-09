import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import DASHBOARD_EN from "../locales/en/dashboard.json";
import DASHBOARD_VI from "../locales/vi/dashboard.json";

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
} as const;

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

export const resources = {
  en: {
    dashboard: DASHBOARD_EN,
  },
  vi: {
    dashboard: DASHBOARD_VI,
  },
} as const;

export const defaultNS = "dashboard";

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: ["dashboard"],
  defaultNS: defaultNS,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});
