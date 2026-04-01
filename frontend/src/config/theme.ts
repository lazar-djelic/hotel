export const setTheme = (theme: string) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

export const getSavedTheme = (): string => {
  return localStorage.getItem("theme") || "night";
};
