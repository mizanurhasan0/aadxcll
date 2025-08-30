// Color utility functions for consistent color usage across the application
export const colors = {
    // Primary colors
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    primaryLight: 'var(--color-primary-light)',

    // Secondary colors
    secondary: 'var(--color-secondary)',
    secondaryHover: 'var(--color-secondary-hover)',
    secondaryLight: 'var(--color-secondary-light)',

    // Success colors
    success: 'var(--color-success)',
    successHover: 'var(--color-success-hover)',
    successLight: 'var(--color-success-light)',

    // Danger colors
    danger: 'var(--color-danger)',
    dangerHover: 'var(--color-danger-hover)',
    dangerLight: 'var(--color-danger-light)',

    // Warning colors
    warning: 'var(--color-warning)',
    warningHover: 'var(--color-warning-hover)',
    warningLight: 'var(--color-warning-light)',

    // Info colors
    info: 'var(--color-info)',
    infoHover: 'var(--color-info-hover)',
    infoLight: 'var(--color-info-light)',

    // Neutral colors
    white: 'var(--color-white)',
    black: 'var(--color-black)',
    gray50: 'var(--color-gray-50)',
    gray100: 'var(--color-gray-100)',
    gray200: 'var(--color-gray-200)',
    gray300: 'var(--color-gray-300)',
    gray400: 'var(--color-gray-400)',
    gray500: 'var(--color-gray-500)',
    gray600: 'var(--color-gray-600)',
    gray700: 'var(--color-gray-700)',
    gray800: 'var(--color-gray-800)',
    gray900: 'var(--color-gray-900)',

    // Component specific colors
    cardBg: 'var(--color-card-bg)',
    cardBorder: 'var(--color-card-border)',
    navbarBg: 'var(--color-navbar-bg)',
    navbarText: 'var(--color-navbar-text)',
    navbarBgScrolled: 'var(--color-navbar-bg-scrolled)',
    buttonPrimary: 'var(--color-button-primary)',
    buttonPrimaryHover: 'var(--color-button-primary-hover)',
    buttonSecondary: 'var(--color-button-secondary)',
    buttonSecondaryHover: 'var(--color-button-secondary-hover)',

    // Text colors
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textMuted: 'var(--color-text-muted)',
    textInverse: 'var(--color-text-inverse)',

    // Border colors
    borderLight: 'var(--color-border-light)',
    borderMedium: 'var(--color-border-medium)',
    borderDark: 'var(--color-border-dark)',

    // Shadow colors
    shadowLight: 'var(--color-shadow-light)',
    shadowMedium: 'var(--color-shadow-medium)',
    shadowDark: 'var(--color-shadow-dark)',

    // Background colors
    background: 'var(--background)',
    foreground: 'var(--foreground)',
};

// CSS-in-JS style objects for common color patterns
export const colorStyles = {
    // Text colors
    textPrimary: { color: colors.textPrimary },
    textSecondary: { color: colors.textSecondary },
    textMuted: { color: colors.textMuted },
    textInverse: { color: colors.textInverse },
    textSuccess: { color: colors.success },
    textDanger: { color: colors.danger },
    textWarning: { color: colors.warning },
    textInfo: { color: colors.info },

    // Background colors
    bgPrimary: { backgroundColor: colors.primary },
    bgSecondary: { backgroundColor: colors.secondary },
    bgSuccess: { backgroundColor: colors.success },
    bgDanger: { backgroundColor: colors.danger },
    bgWarning: { backgroundColor: colors.warning },
    bgInfo: { backgroundColor: colors.info },
    bgCard: { backgroundColor: colors.cardBg },
    bgBody: { backgroundColor: colors.background },

    // Border colors
    borderPrimary: { borderColor: colors.primary },
    borderSecondary: { borderColor: colors.secondary },
    borderSuccess: { borderColor: colors.success },
    borderDanger: { borderColor: colors.danger },
    borderWarning: { borderColor: colors.warning },
    borderInfo: { borderColor: colors.info },
    borderLight: { borderColor: colors.borderLight },
    borderMedium: { borderColor: colors.borderMedium },
    borderDark: { borderColor: colors.borderDark },
    borderCard: { borderColor: colors.cardBorder },

    // Shadow styles
    shadowLight: { boxShadow: `0 1px 3px 0 ${colors.shadowLight}` },
    shadowMedium: { boxShadow: `0 4px 6px -1px ${colors.shadowMedium}` },
    shadowDark: { boxShadow: `0 10px 15px -3px ${colors.shadowDark}` },

    // Button styles
    buttonPrimary: {
        backgroundColor: colors.buttonPrimary,
        color: colors.textInverse,
        borderColor: colors.buttonPrimary,
    },
    buttonPrimaryHover: {
        backgroundColor: colors.buttonPrimaryHover,
        color: colors.textInverse,
        borderColor: colors.buttonPrimaryHover,
    },
    buttonSecondary: {
        backgroundColor: colors.buttonSecondary,
        color: colors.textPrimary,
        borderColor: colors.borderLight,
    },
    buttonSecondaryHover: {
        backgroundColor: colors.buttonSecondaryHover,
        color: colors.textPrimary,
        borderColor: colors.borderMedium,
    },
};

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
