import React from 'react'

export default function HeaderPortfolio({ children }: { children: React.ReactNode }) {
    return (
        <section id="projects" className="py-20 bg-bg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center pb-4">
                    <p className="text-primary font-semibold mb-4 underline underline-offset-8">Most Popular</p>
                    <h2 className="text-4xl font-bold text-text">Projects</h2>
                </div>
                {children}
            </div>
        </section>
    );
}
