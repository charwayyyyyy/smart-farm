import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      title: 'AI Farming Assistant',
      description: 'Get instant answers to your farming questions through our AI-powered chatbot with voice support.',
      icon: (
        <svg className="w-5 h-5 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
        </svg>
      ),
    },
    {
      title: 'SMS Crop Calendar',
      description: 'Receive timely SMS reminders for planting, watering, fertilizing, and harvesting your crops.',
      icon: (
        <svg className="w-5 h-5 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
        </svg>
      ),
    },
    {
      title: 'Knowledge Base',
      description: 'Access a comprehensive library of farming techniques, crop information, and best practices for Ghana.',
      icon: (
        <svg className="w-5 h-5 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 16.5c0-1-8-2.7-9-2V1.8c1-1 9 .4 9 1.2m0 13.5c0-1 8-2.7 9-2V1.8c-1-1-9 .4-9 1.2"/>
        </svg>
      ),
    },
    {
      title: 'Local Weather Integration',
      description: 'Get weather forecasts and climate information specific to your farming region in Ghana.',
      icon: (
        <svg className="w-5 h-5 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 7.5a4.5 4.5 0 1 0-9 0M9 4.5A5.5 5.5 0 0 0 3.5 10m13-2.5A5.5 5.5 0 0 1 11 13m-8.5-3a4.5 4.5 0 1 0 9 0m-9 0h9"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-background-light dark:bg-gray-900 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Smart Solutions for Ghanaian Farmers
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Our platform combines AI technology with SMS accessibility to provide practical farming solutions for all Ghanaian farmers.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;