// Color utility functions for consistent color usage across the application
export const colors = {
    // Core colors
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    success: 'var(--color-success)',
    successHover: 'var(--color-success-hover)',

    // Background colors
    bg: 'var(--color-bg)',
    bgCard: 'var(--color-bg-card)',
    bgNavbar: 'var(--color-bg-navbar)',
    bgNavbarScrolled: 'var(--color-bg-navbar-scrolled)',

    // Text colors
    text: 'var(--color-text)',
    textMuted: 'var(--color-text-muted)',
    textInverse: 'var(--color-text-inverse)',

    // Border colors
    border: 'var(--color-border)',
    borderCard: 'var(--color-border-card)',

    // Button colors
    btnPrimary: 'var(--color-btn-primary)',
    btnPrimaryHover: 'var(--color-btn-primary-hover)',
    btnSecondary: 'var(--color-btn-secondary)',
    btnSecondaryHover: 'var(--color-btn-secondary-hover)',

    // Shadow colors
    shadow: 'var(--color-shadow)',
};

// CSS-in-JS style objects for common color patterns
export const colorStyles = {
    // Text colors
    textPrimary: { color: colors.primary },
    textSuccess: { color: colors.success },
    textMuted: { color: colors.textMuted },
    textInverse: { color: colors.textInverse },

    // Background colors
    bgCard: { backgroundColor: colors.bgCard },
    bgBody: { backgroundColor: colors.bg },

    // Border colors
    borderLight: { borderColor: colors.border },
    borderCard: { borderColor: colors.borderCard },

    // Button styles
    buttonPrimary: {
        backgroundColor: colors.btnPrimary,
        color: colors.textInverse,
        borderColor: colors.btnPrimary,
    },
    buttonPrimaryHover: {
        backgroundColor: colors.btnPrimaryHover,
        color: colors.textInverse,
        borderColor: colors.btnPrimaryHover,
    },
    buttonSecondary: {
        backgroundColor: colors.btnSecondary,
        color: colors.text,
        borderColor: colors.border,
    },
    buttonSecondaryHover: {
        backgroundColor: colors.btnSecondaryHover,
        color: colors.text,
        borderColor: colors.border,
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
