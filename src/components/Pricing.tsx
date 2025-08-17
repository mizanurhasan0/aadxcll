import React from 'react';

const plans = [
  {
    name: 'Small Business',
    subtitle: 'Single Business',
    price: '15.99',
    popular: true,
    features: [
      '5 Pages Responsive Website',
      '5 PPC Campaigns',
      '10 SEO Keywords',
      '5 Facebook Campaigns',
      '2 Video Campaigns'
    ]
  },
  {
    name: 'Professional',
    subtitle: 'Small team',
    price: '99.99',
    popular: false,
    features: [
      '10 Pages Responsive Website',
      '5PPC Campaigns',
      '10 SEO Keyword',
      '5 Facebook Camplaigns',
      '2 Video Camplaigns'
    ]
  },
  {
    name: 'Enterprice',
    subtitle: 'Large Team',
    price: '120.99',
    popular: false,
    features: [
      '10 Pages Responsive Website',
      '5PPC Campaigns',
      '10 SEO Keyword',
      '5 Facebook Camplaigns',
      '2 Video Camplaigns'
    ]
  }
];

const Pricing = () => (
  <section id="pricing" className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-blue-600 font-semibold mb-4">Getting Start</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Pricing Plan</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div key={idx} className={`relative p-8 bg-white rounded-xl shadow-lg ${plan.popular ? 'border-2 border-blue-600' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.subtitle}</p>
              <div className="text-4xl font-bold text-blue-600 mb-4">
                $ {plan.price}
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIdx) => (
                <li key={featureIdx} className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold">
              PAY NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
