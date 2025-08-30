"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Star, Clock, Users, Target } from 'lucide-react';
import { ServiceService } from '@/services/serviceService';

const ServiceDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const serviceId = params.id as string;

    const service = ServiceService.getServiceById(serviceId);

    if (!service) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
                    <p className="text-gray-600 mb-6">The service you are looking for does not exist.</p>
                    <Link
                        href="/services"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Navigation */}
                <div className="mb-8">
                    <Link
                        href="/services"
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Services
                    </Link>
                </div>

                {/* Service Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
                        <div className="flex items-center mb-4 lg:mb-0">
                            <div className="text-green-600 mr-6">
                                {service.icon}
                            </div>
                            <div>
                                <span className="text-6xl font-bold text-gray-200 opacity-50">
                                    {service.number}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {service.title}
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                {service.fullDesc}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Features Section */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                                Key Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature, index) => (
                                    <div key={index} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Star className="w-6 h-6 text-green-600 mr-3" />
                                Benefits
                            </h2>
                            <div className="space-y-4">
                                {service.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process Section */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Clock className="w-6 h-6 text-green-600 mr-3" />
                                Our Process
                            </h2>
                            <div className="space-y-4">
                                {service.process.map((step, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <span className="text-gray-700 pt-1">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technologies Section (if available) */}
                        {service.technologies && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Target className="w-6 h-6 text-green-600 mr-3" />
                                    Technologies We Use
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {service.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FAQ Section */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                {service.faqs.map((faq, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {faq.question}
                                        </h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Contact */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started Today</h3>
                            <p className="text-gray-600 mb-6">
                                Ready to take your business to the next level? Let /`s discuss how we can help you achieve your goals.
                            </p>
                            <Link
                                href="/contact"
                                className="w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 block"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* Related Services */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Other Services</h3>
                            <div className="space-y-3">
                                {ServiceService.getAllServices()
                                    .filter(s => s.id !== service.id)
                                    .slice(0, 3)
                                    .map((relatedService) => (
                                        <Link
                                            key={relatedService.id}
                                            href={`/services/${relatedService.id}`}
                                            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <div className="flex items-center">
                                                <div className="text-green-600 mr-3">
                                                    {relatedService.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900 text-sm">
                                                        {relatedService.title}
                                                    </h4>
                                                    <p className="text-gray-500 text-xs">
                                                        {relatedService.shortDesc.substring(0, 60)}...
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>

                        {/* Service Stats */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 text-green-600 mr-3" />
                                    <span className="text-gray-700 text-sm">Expert Team</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-green-600 mr-3" />
                                    <span className="text-gray-700 text-sm">Fast Delivery</span>
                                </div>
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 text-green-600 mr-3" />
                                    <span className="text-gray-700 text-sm">Quality Guaranteed</span>
                                </div>
                                <div className="flex items-center">
                                    <Target className="w-5 h-5 text-green-600 mr-3" />
                                    <span className="text-gray-700 text-sm">Results Driven</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-primary to-primaryhover rounded-xl p-8 text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-xl mb-6 opacity-90">
                            Let\`s discuss how our {service.title} service can help your business grow.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                            >
                                Get Free Consultation
                            </Link>
                            <Link
                                href="/services"
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300"
                            >
                                View All Services
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;
