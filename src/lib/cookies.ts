// Cookie utility functions
export const setCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const cookieString = `${name}=${value}; expires=${expires.toUTCString()}; path=/; samesite=lax`;
    document.cookie = cookieString;
    console.log('Setting cookie:', name, 'Cookie string:', cookieString);
    console.log('All cookies after setting:', document.cookie);
};

export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);

    console.log('Getting cookie:', name, 'Available cookies:', Object.keys(cookies));
    return cookies[name] || null;
};

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getAllCookies = (): Record<string, string> => {
    return document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);
};
