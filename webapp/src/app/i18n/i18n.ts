import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import SIDER_EN from "../locales/en/sider.json";
import SIDER_VI from "../locales/vi/sider.json";
import DASHBOARD_EN from "../locales/en/dashboard.json";
import DASHBOARD_VI from "../locales/vi/dashboard.json";
import REQUEST_EN from "../locales/en/requests.json";
import REQUEST_VI from "../locales/vi/requests.json";

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
} as const;

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

export const resources = {
  en: {
    sider: SIDER_EN,
    dashboard: DASHBOARD_EN,
    requests: REQUEST_EN,
  },
  vi: {
    sider: SIDER_VI,
    dashboard: DASHBOARD_VI,
    requests: REQUEST_VI,
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
