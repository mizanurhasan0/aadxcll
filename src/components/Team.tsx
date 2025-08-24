import React from 'react';

const teamMembers = [
  {
    name: 'Thoren Okendhild',
    position: 'Founder & Director',
    image: '/projects/team-1.jpeg'
  },
  {
    name: 'Lincoln Anthony',
    position: 'Co Founder & CEO',
    image: '/projects/team-2.jpeg'
  },
  {
    name: 'Adrian Eodri',
    position: 'Managing Director',
    image: '/projects/team-3.jpeg'
  }
];

const Team = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Our Team</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="text-center group">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
            <p className="text-gray-600">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
