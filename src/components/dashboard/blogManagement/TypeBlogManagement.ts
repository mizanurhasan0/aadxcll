import { Control, FieldErrors, UseFormHandleSubmit, UseFormReset } from "react-hook-form";

export interface TBlog {
    _id: string;
    title: string;
    content: string;
    excerpt?: string;
    image: string;
    tags: string[];
    published: boolean;
    createdAt: string;
}

export type TBlogFormData = {
    title: string;
    content: string;
    excerpt?: string;
    image?: string;
    tags: string;
    published?: boolean;
}


export type TBlogFrom = {
    editingBlog: TBlog | null,
    handleSubmit: UseFormHandleSubmit<TBlogFormData>,
    onSubmit: (data: TBlogFormData) => void,
    control: Control<TBlogFormData>,
    errors: FieldErrors<TBlogFormData>,
    isSubmitting: boolean,
    setIsModalOpen: (open: boolean) => void,
    setEditingBlog: (blog: TBlog | null) => void,
    reset: UseFormReset<TBlogFormData>
}