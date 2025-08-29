import { apiRequest } from '@/utils/api';

export interface TeamMember {
    _id: string;
    name: string;
    position: string;
    bio: string;
    image: string;
    email: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    order: number;
    active: boolean;
    createdAt: string;
}

export interface TeamServiceResponse<T = unknown> {
    data: T | null;
    error: string | null;
    success: boolean;
}

export class TeamService {
    private static baseUrl = '/api/team';

    static async getAll(): Promise<TeamServiceResponse<TeamMember[]>> {
        return apiRequest<TeamMember[]>(this.baseUrl);
    }

    static async getActive(): Promise<TeamServiceResponse<TeamMember[]>> {
        return apiRequest<TeamMember[]>(`${this.baseUrl}?active=true`);
    }

    static async getById(id: string): Promise<TeamServiceResponse<TeamMember>> {
        return apiRequest<TeamMember>(`${this.baseUrl}/${id}`);
    }
}


