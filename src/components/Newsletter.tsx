'use client'
import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        console.log('Subscribing email:', email);
        setEmail('');
    };

    return (
        <section className="py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-gray-800 rounded-2xl p-12 relative overflow-hidden">
                    {/* Background pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Left side - Text content */}
                        <div className="flex-1 text-center lg:text-left">
                            <p className="text-emerald-400 font-semibold mb-4">Get In Touch</p>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                                SUBSCRIBE OUR
                            </h2>
                            <h3 className="text-3xl lg:text-4xl font-bold text-gray-300">
                                NEWSLETTER
                            </h3>
                        </div>

                        {/* Right side - Subscription form */}
                        <div className="flex-1 w-full lg:w-auto">
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase rounded-xl transition-colors duration-200 whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
