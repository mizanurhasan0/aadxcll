'use client'
import React, { useState } from 'react';

interface ContactFormProps {
    targetEmail?: string;
    className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ targetEmail = 'info@aadxcel.com', className = '' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Create mailto link with form data
            const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;

            // Open default email client
            window.location.href = mailtoLink;

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 3 seconds
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
            <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Get In Touch</h3>
                <p className="text-gray-600">Send us a message and we will get back to you</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="Enter subject"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Enter your message here..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                    <div className="text-center p-3 bg-green-100 text-green-700 rounded-lg">
                        Message sent successfully! Check your email client.
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="text-center p-3 bg-red-100 text-red-700 rounded-lg">
                        Error sending message. Please try again.
                    </div>
                )}
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>We will respond to your message within 24 hours</p>
            </div>
        </div>
    );
};

export default ContactForm;
