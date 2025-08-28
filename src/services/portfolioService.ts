import { apiRequest } from '@/utils/api';
import { Project } from '@/types/portfolio';

export interface PortfolioServiceResponse<T = unknown> {
    data: T | null;
    error: string | null;
    success: boolean;
}

export class PortfolioService {
    private static baseUrl = '/api/projects';

    static async getAllProjects(): Promise<PortfolioServiceResponse<Project[]>> {
        return apiRequest<Project[]>(this.baseUrl);
    }

    static async getProjectById(id: string): Promise<PortfolioServiceResponse<Project>> {
        return apiRequest<Project>(`${this.baseUrl}/${id}`);
    }

    static async getProjectsByCategory(category: string): Promise<PortfolioServiceResponse<Project[]>> {
        const url = category === 'All Work' ? this.baseUrl : `${this.baseUrl}?category=${encodeURIComponent(category)}`;
        return apiRequest<Project[]>(url);
    }

    static async getFeaturedProjects(): Promise<PortfolioServiceResponse<Project[]>> {
        return apiRequest<Project[]>(`${this.baseUrl}?featured=true`);
    }
}
