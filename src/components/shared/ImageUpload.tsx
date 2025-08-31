"use client";
import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    currentImage?: string;
    onImageChange: (imageUrl: string) => void;
    label?: string;
    className?: string;
    required?: boolean;
    error?: string;
    touched?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    currentImage,
    onImageChange,
    label = "Image",
    className = "",
    required = false,
    error,
    touched
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file);
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setUploadError('Invalid file type. Only images are allowed.');
            return;
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setUploadError('File too large. Maximum size is 5MB.');
            return;
        }

        setIsUploading(true);
        setUploadError('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                onImageChange(data.url);
                setUploadError('');
            } else {
                const error = await response.json();
                setUploadError(error.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        onImageChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current?.click();
    };
    console.log(error);
    return (
        <div className={`space-y-3 ${className}`}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label} {required && <span className="text-red-400">*</span>}
            </label>

            {/* Current Image Display */}
            {currentImage && (
                <div className="relative inline-block">
                    <Image
                        src={currentImage}
                        alt="Current"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                        width={100}
                        height={100}
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Upload Area */}
            {!currentImage && (
                <div
                    onClick={handleClickUpload}
                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gray-500 transition-colors"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    {isUploading ? (
                        <div className="space-y-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="text-gray-400">Uploading...</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-gray-400">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, GIF, WEBP up to 5MB
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Error Message */}
            {uploadError && (
                <p className="text-red-400 text-sm">{uploadError}</p>
            )}

            {/* URL Input (for manual entry) */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                    Or enter image URL
                </label>
                <input
                    type="texts"
                    value={currentImage || ''}
                    onChange={(e) => onImageChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Validation Error */}
            {error && touched && (
                <p className="text-red-400 text-sm">{error}</p>
            )}
        </div>
    );
};

export default ImageUpload;
