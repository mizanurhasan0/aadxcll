import React from 'react'

export default function HeaderBlog({ children }: { children: React.ReactNode }) {
    return (
        <section id="blogs" className="py-20 bg-white pb-40">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">All Blog</p>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest Post</h2>
                </div>
                {children}
            </div>
        </section>
    );
}
