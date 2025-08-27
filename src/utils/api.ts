interface ApiConfig {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    token?: string;
}

interface ApiResponse<T = any> {
    data: T | null;
    error: string | null;
    success: boolean;
}

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export const apiRequest = async <T = any>(
    url: string,
    config: ApiConfig = {}
): Promise<ApiResponse<T>> => {
    const {
        method = 'GET',
        headers = {},
        body,
        token
    } = config;

    try {
        const requestHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            ...headers
        };

        if (token) {
            requestHeaders['Authorization'] = `Bearer ${token}`;
        }

        const requestConfig: RequestInit = {
            method,
            headers: requestHeaders,
        };

        if (body && method !== 'GET') {
            requestConfig.body = JSON.stringify(body);
        }

        const response = await fetch(url, requestConfig);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
        }

        const data = await response.json().catch(() => null);

        return {
            data,
            error: null,
            success: true
        };
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                data: null,
                error: error.message,
                success: false
            };
        }

        return {
            data: null,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
            success: false
        };
    }
};

export const getAuthHeaders = (token: string) => ({
    'Authorization': `Bearer ${token}`
});
