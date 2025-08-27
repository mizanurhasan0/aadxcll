import { apiRequest } from '@/utils/api';
import { TBlog, TBlogFormData } from '@/components/dashboard/blogManagement/TypeBlogManagement';

export interface BlogServiceResponse<T = any> {
    data: T | null;
    error: string | null;
    success: boolean;
}

export class BlogService {
    private static baseUrl = '/api/blogs';

    static async getAllBlogs(): Promise<BlogServiceResponse<TBlog[]>> {
        return apiRequest<TBlog[]>(this.baseUrl);
    }

    static async getBlogById(id: string): Promise<BlogServiceResponse<TBlog>> {
        return apiRequest<TBlog>(`${this.baseUrl}/${id}`);
    }

    static async createBlog(blogData: TBlogFormData, token: string): Promise<BlogServiceResponse<TBlog>> {
        const processedData = {
            ...blogData,
            tags: blogData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
        };

        return apiRequest<TBlog>(this.baseUrl, {
            method: 'POST',
            body: processedData,
            token
        });
    }

    static async updateBlog(id: string, blogData: TBlogFormData, token: string): Promise<BlogServiceResponse<TBlog>> {
        const processedData = {
            ...blogData,
            tags: blogData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
        };

        return apiRequest<TBlog>(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            body: processedData,
            token
        });
    }

    static async deleteBlog(id: string, token: string): Promise<BlogServiceResponse<void>> {
        return apiRequest<void>(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            token
        });
    }

    static async publishBlog(id: string, published: boolean, token: string): Promise<BlogServiceResponse<TBlog>> {
        return apiRequest<TBlog>(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            body: { published },
            token
        });
    }
}
