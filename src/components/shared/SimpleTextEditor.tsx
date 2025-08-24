"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link, Image, Video } from 'lucide-react';

interface SimpleTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
}

const SimpleTextEditor: React.FC<SimpleTextEditorProps> = ({
    value,
    onChange,
    label = "Content",
    placeholder = "Write your content here...",
    required = false,
    error,
    className = ""
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const toggleBold = () => {
        execCommand('bold');
        setIsBold(!isBold);
    };

    const toggleItalic = () => {
        execCommand('italic');
        setIsItalic(!isItalic);
    };

    const toggleUnderline = () => {
        execCommand('underline');
        setIsUnderline(!isUnderline);
    };

    const insertList = (ordered: boolean) => {
        execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList');
    };

    const alignText = (alignment: string) => {
        execCommand('justify' + alignment.charAt(0).toUpperCase() + alignment.slice(1));
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            execCommand('createLink', url);
        }
    };

    const insertImage = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            execCommand('insertImage', url);
        }
    };

    const insertVideo = () => {
        const url = prompt('Enter video URL:');
        if (url) {
            execCommand('insertHTML', `<video src="${url}" controls style="max-width: 100%; height: auto;"></video>`);
        }
    };

    const clearFormatting = () => {
        execCommand('removeFormat');
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-medium text-gray-300">
                {label} {required && <span className="text-red-400">*</span>}
            </label>

            {/* Toolbar */}
            <div className="bg-gray-600 rounded-t-lg p-2 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={toggleBold}
                    className={`p-2 rounded hover:bg-gray-500 transition-colors ${isBold ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={toggleItalic}
                    className={`p-2 rounded hover:bg-gray-500 transition-colors ${isItalic ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={toggleUnderline}
                    className={`p-2 rounded hover:bg-gray-500 transition-colors ${isUnderline ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
                    title="Underline"
                >
                    <Underline className="w-4 h-4" />
                </button>

                <div className="w-px bg-gray-500 mx-2"></div>

                <button
                    type="button"
                    onClick={() => insertList(false)}
                    className="p-2 rounded hover:bg-gray-500 transition-colors text-gray-300"
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() => insertList(true)}
                    className="p-2 rounded hover:bg-gray-500 transition-colors text-gray-300"
                    title="Numbered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>

                <div className="w-px bg-gray-500 mx-2"></div>

                <button
                    type="button"
                    onClick={() => alignText('left')}
                    className="p-2 rounded hover:bg-gray-500 transition-colors text-gray-300"
                    title="Align Left"
                >
                    <AlignLeft className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() => alignText('center')}
                    className="p-2 rounded hover:bg-gray-500 transition-colors text-gray-300"
                    title="Align Center"
                >
                    <AlignCenter className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() => alignText('right')}
                    className="p-2 rounded hover:bg-gray-500 transition-colors text-gray-300"
                    title="Align Right"
                >
                    <AlignRight className="w-4 h-4" />
                </button>

                <div className="w-px bg-gray-500 mx-2"></div>

                <button
                    type="button"
                    onClick={insertLink}
                    className="p-2 rounded hover:bg-gray-500 transition-colors text-gray-300"
                    title="Insert Link"
                >
                    <Link className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={insertImage}
                    className="p-2 rounded hover:bg-gray-500 transition-colors text-gray-300"
                    title="Insert Image"
                >
                    <Image className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={insertVideo}
                    className="p-2 rounded hover:bg-gray-500 transition-colors text-gray-300"
                    title="Insert Video"
                >
                    <Video className="w-4 h-4" />
                </button>

                <div className="w-px bg-gray-500 mx-2"></div>

                <button
                    type="button"
                    onClick={clearFormatting}
                    className="p-2 rounded hover:bg-gray-500 transition-colors text-gray-300"
                    title="Clear Formatting"
                >
                    <span className="text-xs font-bold">T</span>
                </button>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="min-h-[250px] p-4 bg-gray-700 border border-gray-600 rounded-b-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ fontSize: '14px' }}
                data-placeholder={placeholder}
            />

            {error && (
                <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* Placeholder styles */}
            <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
      `}</style>
        </div>
    );
};

export default SimpleTextEditor;
