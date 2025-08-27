
import React from 'react'
import FormField from '@/components/shared/FormField'
import ImageUpload from '@/components/shared/ImageUpload'
import SimpleTextEditor from '@/components/shared/SimpleTextEditor'
import { Controller } from 'react-hook-form';
import { TBlogFrom } from './TypeBlogManagement';

// Helper component to reduce repetition
interface FormControllerProps {
    name: string;
    control: any;
    children: (props: { value: any; onChange: any }) => React.ReactElement;
}

const FormController = ({ name, control, children }: FormControllerProps) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => children({ value: field.value, onChange: field.onChange })}
    />
);

export default function BlogFrom({ editingBlog, handleSubmit, onSubmit, control, errors, isSubmitting, setIsModalOpen, setEditingBlog, reset }: TBlogFrom) {
    const handleClose = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
        reset();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                    {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-3 gap-4">
                    <FormController name="title" control={control}>
                        {({ value, onChange }) => (
                            <FormField
                                label="Title"
                                name="title"
                                value={value}
                                onChange={onChange}
                                required
                                error={errors.title?.message}
                            />
                        )}
                    </FormController>

                    <FormController name="excerpt" control={control}>
                        {({ value, onChange }) => (
                            <FormField
                                label="Excerpt"
                                name="excerpt"
                                type="text"
                                value={value || ''}
                                onChange={onChange}
                                required
                                error={errors.excerpt?.message}
                                rows={3}
                            />
                        )}
                    </FormController>

                    <FormController name="tags" control={control}>
                        {({ value, onChange }) => (
                            <FormField
                                label="Tags (comma-separated)"
                                name="tags"
                                value={value}
                                onChange={onChange}
                                required
                                error={errors.tags?.message}
                                placeholder="web design, development, tips"
                            />
                        )}
                    </FormController>

                    <div className='col-span-2'>
                        <FormController name="content" control={control}>
                            {({ value, onChange }) => (
                                <SimpleTextEditor
                                    value={value}
                                    onChange={onChange}
                                    label="Content"
                                    required
                                    error={errors.content?.message}
                                />
                            )}
                        </FormController>
                    </div>

                    <div className='space-y-6'>
                        <FormController name="image" control={control}>
                            {({ value, onChange }) => (
                                <ImageUpload
                                    currentImage={value}
                                    onImageChange={onChange}
                                    label="Blog Image"
                                    required={!editingBlog}
                                    error={errors.image?.message}
                                    touched={isSubmitting || Object.keys(errors).length > 0}
                                />
                            )}
                        </FormController>

                        <div className="flex items-center space-x-2">
                            <FormController name="published" control={control}>
                                {({ value, onChange }) => (
                                    <input
                                        type="checkbox"
                                        id="published"
                                        checked={value}
                                        onChange={(e) => onChange(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                    />
                                )}
                            </FormController>
                            <label htmlFor="published" className="text-sm text-gray-300">
                                Publish immediately
                            </label>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={handleClose}
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
