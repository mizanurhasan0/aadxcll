

// Utility function to get CSS variable value
export const getCSSVariable = (variableName: string): string => {
    if (typeof window !== 'undefined') {
        return getComputedStyle(document.documentElement).getPropertyValue(variableName);
    }
    return '';
};

// Utility function to set CSS variable value
export const setCSSVariable = (variableName: string, value: string): void => {
    if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty(variableName, value);
    }
};

// Theme-aware color getter
export const getThemeColor = (lightColor: string, darkColor: string): string => {
    if (typeof window !== 'undefined') {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? darkColor : lightColor;
    }
    return lightColor;
};
