import i18n from "../i18n";

export const setLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  localStorage.setItem("language", lng);
};

export const getSavedLanguage = (): string => {
  return localStorage.getItem("language") || "en";
};
