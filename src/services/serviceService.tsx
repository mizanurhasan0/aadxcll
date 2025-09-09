
export interface Service {
    id: string;
    number: string;
    icon: string;
    title: string;
    shortDesc: string;
    fullDesc: string;
    features: string[];
    benefits: string[];
    process: string[];
    technologies?: string[];
    pricing?: {
        basic: string;
        standard: string;
        premium: string;
    };
    caseStudies?: string[];
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}

export const services: Service[] = [
    {
        id: 'full-stack-digital-marketing',
        number: '01',
        icon: 'TvMinimalPlay',
        title: 'Full Stack Digital Marketing',
        shortDesc: 'Boost your online presence with our best-paid marketing service. With full-service digital marketing agency you will- Create Marketing Plan | Drive Sales | Increase ROI & Brand Visibility with our expert team of online branding agency.',
        fullDesc: 'Our comprehensive digital marketing solutions encompass every aspect of online presence management. From strategic planning to execution and optimization, we provide end-to-end digital marketing services that drive real business results.',
        features: [
            'Strategic Marketing Planning',
            'Multi-Channel Campaign Management',
            'Performance Analytics & Reporting',
            'A/B Testing & Optimization',
            'Customer Journey Mapping',
            'ROI Tracking & Analysis'
        ],
        benefits: [
            'Increased brand visibility and awareness',
            'Higher conversion rates and sales',
            'Better customer engagement and retention',
            'Data-driven decision making',
            'Competitive advantage in digital space',
            'Measurable marketing ROI'
        ],
        process: [
            'Market Research & Analysis',
            'Strategy Development',
            'Campaign Creation & Launch',
            'Continuous Monitoring',
            'Performance Optimization',
            'Regular Reporting & Insights'
        ],
        faqs: [
            {
                question: 'How long does it take to see results?',
                answer: 'Initial results can be seen within 4-6 weeks, with significant improvements typically appearing in 3-6 months.'
            },
            {
                question: 'What channels do you focus on?',
                answer: 'We focus on all major digital channels including Google Ads, Facebook/Instagram, LinkedIn, SEO, email marketing, and content marketing.'
            },
            {
                question: 'Do you provide monthly reports?',
                answer: 'Yes, we provide comprehensive monthly reports with detailed analytics, insights, and recommendations for improvement.'
            }
        ]
    },
    {
        id: 'web-development',
        number: '02',
        icon: 'Globe',
        title: 'Web Development',
        shortDesc: 'Every business needs a user-friendly website. We create in-demand design websites which will provide our clients to achieve customer trust, growth & business required needs.',
        fullDesc: 'We specialize in creating modern, responsive, and high-performance websites that not only look great but also drive business results. Our development process focuses on user experience, performance, and scalability.',
        features: [
            'Responsive Web Design',
            'Custom Web Applications',
            'E-commerce Solutions',
            'CMS Development',
            'API Integration',
            'Performance Optimization'
        ],
        benefits: [
            'Professional online presence',
            'Improved user experience',
            'Better search engine rankings',
            'Increased conversion rates',
            'Scalable and maintainable code',
            'Cross-platform compatibility'
        ],
        process: [
            'Requirements Gathering',
            'Design & Prototyping',
            'Development & Testing',
            'Quality Assurance',
            'Deployment & Launch',
            'Post-launch Support'
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
        faqs: [
            {
                question: 'How long does website development take?',
                answer: 'Simple websites take 2-4 weeks, while complex applications can take 8-12 weeks depending on requirements.'
            },
            {
                question: 'Do you provide hosting and maintenance?',
                answer: 'Yes, we offer hosting solutions and ongoing maintenance packages to ensure your website runs smoothly.'
            },
            {
                question: 'Can you redesign existing websites?',
                answer: 'Absolutely! We can redesign and modernize existing websites while preserving your content and SEO value.'
            }
        ]
    },
    {
        id: 'search-engine-optimization',
        number: '03',
        icon: 'Search',
        title: 'Search Engine Optimization',
        shortDesc: 'SEO is an effective way to get incredible results & generate high organic traffic to your website. Complete SEO service helping your business to secure Google\'s first page.',
        fullDesc: 'Our SEO services are designed to improve your website\'s visibility in search engines, drive organic traffic, and increase conversions. We use white-hat techniques and data-driven strategies for sustainable results.',
        features: [
            'Technical SEO Audit',
            'Keyword Research & Strategy',
            'On-Page Optimization',
            'Content Strategy & Creation',
            'Link Building',
            'Local SEO Optimization'
        ],
        benefits: [
            'Increased organic traffic',
            'Better search engine rankings',
            'Long-term sustainable results',
            'Improved user experience',
            'Higher conversion rates',
            'Competitive advantage'
        ],
        process: [
            'Technical SEO Audit',
            'Keyword Research',
            'On-Page Optimization',
            'Content Creation',
            'Link Building',
            'Performance Monitoring'
        ],
        faqs: [
            {
                question: 'How long does SEO take to show results?',
                answer: 'SEO is a long-term strategy. Initial improvements can be seen in 3-6 months, with significant results typically appearing in 6-12 months.'
            },
            {
                question: 'Do you guarantee first page rankings?',
                answer: 'While we can\'t guarantee specific rankings, we use proven strategies that consistently improve search visibility and rankings.'
            },
            {
                question: 'What\'s included in monthly SEO reports?',
                answer: 'Monthly reports include keyword rankings, traffic analysis, technical improvements, and actionable recommendations.'
            }
        ]
    },
    {
        id: 'social-media-marketing',
        number: '04',
        icon: 'ThumbsUp',
        title: 'Social Media Marketing',
        shortDesc: 'Digital marketing service empowers small, medium & large businesses to compete with larger enterprises. We help you to separate your voice from hauling competitors.',
        fullDesc: 'We create engaging social media strategies that build brand awareness, engage your audience, and drive business growth. Our approach combines creative content with data-driven insights.',
        features: [
            'Platform Strategy Development',
            'Content Creation & Curation',
            'Community Management',
            'Paid Social Advertising',
            'Influencer Partnerships',
            'Performance Analytics'
        ],
        benefits: [
            'Increased brand awareness',
            'Better customer engagement',
            'Direct customer communication',
            'Improved brand loyalty',
            'Higher website traffic',
            'Better customer insights'
        ],
        process: [
            'Platform Analysis',
            'Strategy Development',
            'Content Planning',
            'Execution & Management',
            'Community Engagement',
            'Performance Analysis'
        ],
        faqs: [
            {
                question: 'Which social media platforms do you manage?',
                answer: 'We manage all major platforms including Facebook, Instagram, LinkedIn, Twitter, TikTok, and YouTube based on your target audience.'
            },
            {
                question: 'How often do you post content?',
                answer: 'Posting frequency varies by platform and industry, typically 3-7 posts per week on most platforms.'
            },
            {
                question: 'Do you create all the content?',
                answer: 'Yes, we create custom content including graphics, videos, and copy tailored to your brand and audience.'
            }
        ]
    },
    {
        id: 'video-production',
        number: '05',
        icon: 'Video',
        title: 'Video Production',
        shortDesc: '91% of businesses use high-quality video production services like script, edit, shoot, produce & distribute video for increased engagement & build trust with target customer.',
        fullDesc: 'Our video production services help businesses create compelling visual content that engages audiences and drives results. From concept to final delivery, we handle every aspect of video creation.',
        features: [
            'Video Strategy & Planning',
            'Script Writing & Storyboarding',
            'Professional Filming',
            'Post-Production Editing',
            'Motion Graphics & Animation',
            'Distribution Strategy'
        ],
        benefits: [
            'Higher engagement rates',
            'Better brand storytelling',
            'Increased conversion rates',
            'Improved SEO performance',
            'Better social media reach',
            'Professional brand image'
        ],
        process: [
            'Concept Development',
            'Pre-Production Planning',
            'Filming & Production',
            'Post-Production',
            'Review & Revisions',
            'Final Delivery'
        ],
        faqs: [
            {
                question: 'What types of videos do you produce?',
                answer: 'We produce corporate videos, product demos, explainer videos, social media content, commercials, and training videos.'
            },
            {
                question: 'How long does video production take?',
                answer: 'Simple videos take 2-3 weeks, while complex productions can take 4-8 weeks depending on requirements.'
            },
            {
                question: 'Do you provide equipment and crew?',
                answer: 'Yes, we provide professional equipment, experienced crew, and handle all technical aspects of production.'
            }
        ]
    },
    {
        id: 'content-writing',
        number: '06',
        icon: 'NotebookPen',
        title: 'Content Writing',
        shortDesc: 'Content is always king for marketing. There are no options to represent any business with content marketing. It is the best way to attract customers of relevant content.',
        fullDesc: 'We create high-quality, engaging content that resonates with your target audience and drives business results. Our content strategy focuses on value, relevance, and conversion.',
        features: [
            'Content Strategy Development',
            'Blog Writing & Management',
            'Website Copywriting',
            'Email Marketing Content',
            'Social Media Content',
            'SEO-Optimized Content'
        ],
        benefits: [
            'Improved search rankings',
            'Better customer engagement',
            'Increased brand authority',
            'Higher conversion rates',
            'Better customer trust',
            'Cost-effective marketing'
        ],
        process: [
            'Content Planning',
            'Research & Writing',
            'Editing & Review',
            'SEO Optimization',
            'Publication',
            'Performance Analysis'
        ],
        faqs: [
            {
                question: 'What types of content do you write?',
                answer: 'We write blog posts, website copy, email campaigns, social media content, case studies, and whitepapers.'
            },
            {
                question: 'How often should I publish content?',
                answer: 'We recommend 2-4 blog posts per month for most businesses, with daily social media content.'
            },
            {
                question: 'Do you optimize content for SEO?',
                answer: 'Yes, all our content is optimized for search engines with proper keyword usage and SEO best practices.'
            }
        ]
    },
    {
        id: 'server-side-tracking',
        number: '07',
        icon: 'Server',
        title: 'Server Side Tracking',
        shortDesc: 'Server-side tracking collects website data on a dedicated server instead of the user\'s browser, bypassing adblockers & tracking prevention for accurate & uninterrupted data capture.',
        fullDesc: 'Our server-side tracking solutions provide accurate, reliable data collection that bypasses ad blockers and tracking prevention tools, ensuring you get complete insights into your website performance.',
        features: [
            'Server-Side Implementation',
            'Data Accuracy & Reliability',
            'Ad Blocker Bypass',
            'Real-Time Analytics',
            'Custom Event Tracking',
            'Data Export & Integration'
        ],
        benefits: [
            'Accurate data collection',
            'Bypass ad blockers',
            'Better conversion tracking',
            'Improved campaign optimization',
            'Reliable analytics',
            'Enhanced privacy compliance'
        ],
        process: [
            'Implementation Planning',
            'Server Setup',
            'Code Implementation',
            'Testing & Validation',
            'Monitoring & Optimization',
            'Ongoing Support'
        ],
        faqs: [
            {
                question: 'What\'s the difference from client-side tracking?',
                answer: 'Server-side tracking collects data on our servers instead of user browsers, providing more accurate and reliable data collection.'
            },
            {
                question: 'Does it work with all browsers?',
                answer: 'Yes, server-side tracking works across all browsers and devices, providing consistent data collection.'
            },
            {
                question: 'How does it improve data accuracy?',
                answer: 'By bypassing ad blockers and browser restrictions, we collect more complete and accurate user interaction data.'
            }
        ]
    },
    {
        id: 'graphic-design',
        number: '08',
        icon: 'FileImage',
        title: 'Graphic Design',
        shortDesc: 'Graphic design services promote your brand with stunning visuals, logos, and marketing materials. Enhance your identity & captivate your audience with creative designs.',
        fullDesc: 'We create visually stunning designs that strengthen your brand identity and engage your audience. From logos to marketing materials, our designs are both beautiful and effective.',
        features: [
            'Logo Design & Branding',
            'Marketing Materials',
            'Social Media Graphics',
            'Website Design Elements',
            'Print Design',
            'Brand Guidelines'
        ],
        benefits: [
            'Professional brand image',
            'Better customer recognition',
            'Increased engagement',
            'Consistent brand identity',
            'Competitive advantage',
            'Higher conversion rates'
        ],
        process: [
            'Brief & Research',
            'Concept Development',
            'Design Creation',
            'Client Review',
            'Revisions & Refinement',
            'Final Delivery'
        ],
        faqs: [
            {
                question: 'What file formats do you provide?',
                answer: 'We provide designs in multiple formats including AI, EPS, PDF, PNG, and JPG for various use cases.'
            },
            {
                question: 'How many revisions are included?',
                answer: 'We include 3 rounds of revisions to ensure you\'re completely satisfied with the final design.'
            },
            {
                question: 'Do you create brand guidelines?',
                answer: 'Yes, we create comprehensive brand guidelines to ensure consistent use of your brand across all platforms.'
            }
        ]
    },
    {
        id: 'ecommerce-marketing',
        number: '09',
        icon: 'ShoppingCart',
        title: 'E-Commerce Marketing',
        shortDesc: 'Its increased sales, online store visibility, convert web visitors into customers & also successful marketing strategy have become a pivotal part of revenue growth.',
        fullDesc: 'Our e-commerce marketing strategies are designed to increase online store visibility, drive traffic, and convert visitors into customers. We focus on strategies that deliver measurable ROI.',
        features: [
            'E-commerce SEO',
            'Product Listing Optimization',
            'Shopping Campaigns',
            'Retargeting Strategies',
            'Email Marketing',
            'Conversion Optimization'
        ],
        benefits: [
            'Increased online sales',
            'Better product visibility',
            'Higher conversion rates',
            'Improved customer retention',
            'Better ROI on ad spend',
            'Competitive market advantage'
        ],
        process: [
            'Store Analysis',
            'Strategy Development',
            'Implementation',
            'Campaign Management',
            'Performance Optimization',
            'Continuous Improvement'
        ],
        faqs: [
            {
                question: 'Which e-commerce platforms do you work with?',
                answer: 'We work with all major platforms including Shopify, WooCommerce, Magento, and custom solutions.'
            },
            {
                question: 'How do you measure e-commerce success?',
                answer: 'We track key metrics including conversion rate, average order value, customer lifetime value, and ROI on ad spend.'
            },
            {
                question: 'Do you handle product listing optimization?',
                answer: 'Yes, we optimize product listings for better search visibility and conversion rates across all platforms.'
            }
        ]
    }
];

export class ServiceService {
    static getAllServices(): Service[] {
        return services;
    }

    static getServiceById(id: string): Service | undefined {
        return services.find(service => service.id === id);
    }

    static getServicesByCategory(): Service[] {
        // You can implement category filtering here
        return services;
    }
}




