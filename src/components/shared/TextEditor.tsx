"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-700 rounded-lg animate-pulse"></div>
});

import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  label = "Content",
  placeholder = "Write your content here...",
  required = false,
  error,
  className = ""
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  // Quill editor formats
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'indent',
    'align',
    'link', 'image', 'video'
  ];

  // Handle Quill change with error handling
  const handleQuillChange = (content: string) => {
    try {
      onChange(content);
    } catch (error) {
      console.error('Error in Quill onChange:', error);
    }
  };

  if (!mounted) {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <div className="h-64 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <div className="bg-gray-700 rounded-lg">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleQuillChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="text-white"
          style={{
            height: '300px'
          }}
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Custom styles for Quill editor */}
      <style jsx global>{`
        .ql-editor {
          min-height: 250px;
          color: white;
          font-size: 14px;
        }
        
        .ql-toolbar {
          background-color: #374151;
          border-color: #4B5563;
          border-radius: 8px 8px 0 0;
        }
        
        .ql-container {
          border-color: #4B5563;
          border-radius: 0 0 8px 8px;
          background-color: #374151;
        }
        
        .ql-toolbar button,
        .ql-toolbar .ql-picker {
          color: #D1D5DB;
        }
        
        .ql-toolbar button:hover,
        .ql-toolbar .ql-picker:hover {
          color: white;
        }
        
        .ql-toolbar button.ql-active,
        .ql-toolbar .ql-picker.ql-active {
          color: #3B82F6;
        }
        
        .ql-toolbar .ql-stroke {
          stroke: #D1D5DB;
        }
        
        .ql-toolbar .ql-fill {
          fill: #D1D5DB;
        }
        
        .ql-toolbar .ql-picker-options {
          background-color: #374151;
          border-color: #4B5563;
        }
        
        .ql-toolbar .ql-picker-item {
          color: #D1D5DB;
        }
        
        .ql-toolbar .ql-picker-item:hover {
          color: white;
          background-color: #4B5563;
        }
        
        .ql-toolbar .ql-picker-label {
          color: #D1D5DB;
        }
        
        .ql-toolbar .ql-picker-label:hover {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default TextEditor;
