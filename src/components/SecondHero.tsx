import React from 'react';
import ContactForm from './shared/ContactForm';
import GoogleMap from './shared/GoogleMap';

const SecondHero = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Best & Reliable<br />
          <span className="text-primary">Creative IT.</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor. ol Duis a orci nunc. Suspendisse ac convallis sapien, quis commodo libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.
        </p>
      </div>

      {/* Contact Form and Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Form */}
        <div className="order-2 lg:order-1">
          <ContactForm
            targetEmail="info@aadxcel.com"
            className="h-full"
          />
        </div>

        {/* Google Map */}
        <div className="order-1 lg:order-2">
          <GoogleMap
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0158936870457!2d90.39381238576406!3d23.746812633938774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b93d4dc640fd%3A0xd9b5944672a44c03!2sAadxcel%20-%20Digital%20Marketing%20Agency!5e0!3m2!1sen!2sbd!4v1756549362814!5m2!1sen!2sbd"
            className="h-full"
          />
        </div>
      </div>

    </div>
  </section>
);

export default SecondHero;
