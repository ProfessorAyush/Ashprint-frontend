import React from 'react';

const Timeline = () => {
  const events = [
    { year: '2020', title: 'Project Kickoff', description: 'Initiated the Ashprint project with a vision to revolutionize printing.' },
    { year: '2021', title: 'Development Phase', description: 'Developed core functionalities and integrated the Raspberry Pi with Python.' },
    { year: '2022', title: 'Beta Testing', description: 'Released beta version to a select group of users for feedback and improvements.' },
    { year: '2023', title: 'Official Launch', description: 'Launched Ashprint officially with full features and user support.' },
    { year: '2024', title: 'Expansion', description: 'Expanding features and exploring new markets for broader reach.' },
  ];

  return (
    <section id="timeline" className="bg-black text-white min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-center">Our Timeline</h1>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-600 h-full"></div>
          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={index} className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-white w-6 h-6 rounded-full border-4 border-black z-10"></div>
                <div className="w-1/2 pr-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">{event.year}</h2>
                  <h3 className="text-lg md:text-xl font-semibold mb-1">{event.title}</h3>
                  <p className="text-base md:text-lg">{event.description}</p>
                </div>
                {index % 2 === 0 ? (
                  <div className="w-1/2 pl-6 text-right">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">{event.year}</h2>
                    <h3 className="text-lg md:text-xl font-semibold mb-1">{event.title}</h3>
                    <p className="text-base md:text-lg">{event.description}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
