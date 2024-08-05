import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./globals/locale/en";

const resources = { en };
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",

    keySeparator: false,

    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },

    react: {
      wait: true,
    },
  });

export default i18n;
