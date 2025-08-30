import React from 'react'

export default function HeaderPricing({ children }: { children: React.ReactNode }) {
    return (
        <section id="pricing" className="py-20 bg-bg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-primary font-semibold mb-4 underline underline-offset-8">Getting Start</p>
                    <h2 className="text-4xl font-bold text-text mb-6">Pricing Plan</h2>
                </div>
                {children}
            </div>
        </section>
    );
}
