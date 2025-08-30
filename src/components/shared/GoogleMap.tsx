import React from 'react';

interface GoogleMapProps {
    mapUrl?: string;
    className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
    mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0158936870457!2d90.39381238576406!3d23.746812633938774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b93d4dc640fd%3A0xd9b5944672a44c03!2sAadxcel%20-%20Digital%20Marketing%20Agency!5e0!3m2!1sen!2sbd!4v1756549362814!5m2!1sen!2sbd',
    className = ''
}) => {
    return (
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
            <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Location</h3>
                    <p className="text-gray-600">Find us on the map</p>
                </div>

                <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden">
                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                        className="absolute inset-0"
                    />
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Click on the map to open in Google Maps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GoogleMap;
