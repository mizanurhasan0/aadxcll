import { apiRequest } from '@/utils/api';

export interface PackageItem {
    _id: string;
    name: string;
    subtitle: string;
    price: number;
    currency: string;
    popular: boolean;
    features: string[];
    description: string;
    order: number;
    active: boolean;
    createdAt: string;
}

export interface PackageServiceResponse<T = unknown> {
    data: T | null;
    error: string | null;
    success: boolean;
}

export class PackageService {
    private static baseUrl = '/api/packages';

    static async getAll(): Promise<PackageServiceResponse<PackageItem[]>> {
        return apiRequest<PackageItem[]>(this.baseUrl);
    }

    static async getActive(): Promise<PackageServiceResponse<PackageItem[]>> {
        return apiRequest<PackageItem[]>(`${this.baseUrl}?active=true`);
    }

    static async getById(id: string): Promise<PackageServiceResponse<PackageItem>> {
        return apiRequest<PackageItem>(`${this.baseUrl}/${id}`);
    }
}


