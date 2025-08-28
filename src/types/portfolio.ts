export interface Project {
    _id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    technologies: string[];
    client: string;
    projectUrl: string;
    githubUrl: string;
    featured: boolean;
    order: number;
    active: boolean;
    completedAt: string;
    createdAt: string;
}

export interface CardPortfolioProps {
    project: Project;
}
