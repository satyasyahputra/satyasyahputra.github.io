const localThemeKey = 'theme-ss-page';
export const getLocalTheme = () => localStorage.getItem(localThemeKey);
export const setLocalTheme = (value) => localStorage.setItem(localThemeKey, value)