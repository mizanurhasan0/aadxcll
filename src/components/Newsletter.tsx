'use client'
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const pathname = usePathname();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        console.log('Subscribing email:', email);
        setEmail('');
    };

    return (
        <section className={`relative ${pathname === '/dashboard' ? 'hidden' : ''}`} >
            <div className="absolute max-w-6xl mx-auto -top-24 left-1/2 -translate-x-1/2  p-10 container  rounded-2xl z-10 flex flex-col lg:flex-row items-center justify-between gap-8 bg-gray-800">
                {/* Left side - Text content */}
                <div className="flex-1 text-center lg:text-left">
                    <p className="text-primary font-semibold mb-4">Get In Touch</p>
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
                            className="flex-1 px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold uppercase rounded-xl transition-colors duration-200 whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
