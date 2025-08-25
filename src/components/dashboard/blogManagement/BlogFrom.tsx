
import FormField from '@/components/shared/FormField'
import ImageUpload from '@/components/shared/ImageUpload'
import SimpleTextEditor from '@/components/shared/SimpleTextEditor'
import React from 'react'
import { Controller, Control, FieldErrors, UseFormHandleSubmit, UseFormReset } from 'react-hook-form'
import { TBlogFormData } from '../BlogManagement'

interface Blog {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    image: string;
    tags: string[];
    published: boolean;
    createdAt: string;
}

type TBlogFrom = {
    editingBlog: Blog | null,
    handleSubmit: UseFormHandleSubmit<TBlogFormData>,
    onSubmit: (data: TBlogFormData) => void,
    control: Control<TBlogFormData>,
    errors: FieldErrors<TBlogFormData>,
    isSubmitting: boolean,
    setIsModalOpen: (open: boolean) => void,
    setEditingBlog: (blog: Blog | null) => void,
    reset: UseFormReset<TBlogFormData>
}

export default function BlogFrom({ editingBlog, handleSubmit, onSubmit, control, errors, isSubmitting, setIsModalOpen, setEditingBlog, reset }: TBlogFrom) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                    {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-3 gap-4">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <FormField
                                label="Title"
                                name="title"
                                value={field.value}
                                onChange={field.onChange}
                                required
                                error={errors.title?.message}
                            />
                        )}
                    />
                    <Controller
                        name="excerpt"
                        control={control}
                        render={({ field }) => (
                            <FormField
                                label="Excerpt"
                                name="excerpt"
                                type="text"
                                value={field.value}
                                onChange={field.onChange}
                                required
                                error={errors.excerpt?.message}
                                rows={3}
                            />
                        )}
                    />
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <FormField
                                label="Tags (comma-separated)"
                                name="tags"
                                value={field.value}
                                onChange={field.onChange}
                                required
                                error={errors.tags?.message}
                                placeholder="web design, development, tips"
                            />
                        )}
                    />
                    <div className='col-span-2'>
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <SimpleTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Content"
                                    required
                                    error={errors.content?.message}

                                />
                            )}
                        />
                    </div>



                    <div className='space-y-6'>
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <ImageUpload
                                    currentImage={field.value}
                                    onImageChange={field.onChange}
                                    label="Blog Image"
                                    required={editingBlog ? false : true} // Make image optional for new blogs
                                    error={errors.image?.message}
                                    touched={isSubmitting || Object.keys(errors).length > 0}
                                />
                            )}
                        />
                        <div className="flex items-center space-x-2">
                            <Controller
                                name="published"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        id="published"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                    />
                                )}
                            />
                            <label htmlFor="published" className="text-sm text-gray-300">
                                Publish immediately
                            </label>
                        </div>
                        <div className="flex justify-end space-x-3 ">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setEditingBlog(null);
                                    reset();
                                }}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
                            >
                                {isSubmitting ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Create Blog')}
                            </button>
                        </div>
                    </div>




                </form>
            </div>
        </div>
    )
}
