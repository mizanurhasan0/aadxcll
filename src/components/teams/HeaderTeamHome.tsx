import React from 'react'

export default function HeaderTeamHome({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <section id="team" className={`py-20 bg-bg relative ${className}`}>
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center pb-4">
                    <p className="text-primary font-semibold mb-4 underline underline-offset-8">Our Team</p>
                    <h2 className="text-4xl font-bold text-text">Meet Our Team</h2>
                </div>
                {children}
            </div>
        </section>
    );
}
