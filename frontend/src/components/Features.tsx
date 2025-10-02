import FeatureCard from './FeatureCard';
import Link from 'next/link';

const Features = () => {
  const features = [
    {
      title: 'AI Farming Assistant',
      description: 'Get instant answers to your farming questions through our AI-powered chatbot with voice support.',
      icon: (
        <svg className="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
        </svg>
      ),
      link: '/voice-assistant'
    },
    {
      title: 'SMS Crop Calendar',
      description: 'Receive timely SMS reminders for planting, watering, fertilizing, and harvesting your crops.',
      icon: (
        <svg className="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
        </svg>
      ),
      link: '/sms-calendar'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other farmers to share experiences, ask questions, and discuss trending agricultural topics.',
      icon: (
        <svg className="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 3v-3H18a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
        </svg>
      ),
      link: '/community-forum'
    },
    {
      title: 'Crop Disease Detection',
      description: 'Upload images of your crops to identify diseases and get treatment recommendations instantly.',
      icon: (
        <svg className="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2 13 2.5-2.5m1.5 3 2.5-2.5m1.5 3 2.5-2.5m1.5 3 2.5-2.5M8 19l11-11L13 2 2 13l6 6Z"/>
        </svg>
      ),
      link: '/disease-detection'
    },
    {
      title: 'Market Price Alerts',
      description: 'Get real-time market price notifications and connect directly with buyers for your produce.',
      icon: (
        <svg className="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm14-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7-3h4m3 3v6m-3 0h6m-6 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
        </svg>
      ),
      link: '/market-prices'
    },
    {
      title: 'Weather-Based Smart Alerts',
      description: 'Receive customized weather alerts based on your specific crops and their growth stages.',
      icon: (
        <svg className="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 7.5a4.5 4.5 0 1 0-9 0M9 4.5A5.5 5.5 0 0 0 3.5 10m13-2.5A5.5 5.5 0 0 1 11 13m-8.5-3a4.5 4.5 0 1 0 9 0m-9 0h9"/>
        </svg>
      ),
      link: '/weather-alerts'
    },
    {
      title: 'Personalized Dashboards',
      description: 'Track your farm records, expenses, income, and performance analytics all in one place.',
      icon: (
        <svg className="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1v14h16m0-9-3-2-3 5-3-2-3 4"/>
        </svg>
      ),
      link: '/dashboard'
    },
    {
      title: 'Gamified Knowledge Base',
      description: 'Learn farming techniques through interactive quizzes and earn achievement badges as you progress.',
      icon: (
        <svg className="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 16.5c0-1-8-2.7-9-2V1.8c1-1 9 .4 9 1.2m0 13.5c0-1 8-2.7 9-2V1.8c-1-1-9 .4-9 1.2"/>
        </svg>
      ),
      link: '/knowledge-base'
    },
  ];

  return (
    <section className="farm-pattern py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mx-auto max-w-screen-md text-center mb-10">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-earth-brown">
            Smart Solutions for Ghanaian Farmers
          </h2>
          <p className="mb-5 text-earth-green text-lg">
            Our platform combines AI technology with practical tools to provide comprehensive farming solutions for all Ghanaian farmers.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Link href={feature.link} key={index} className="transition-transform hover:scale-105">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;