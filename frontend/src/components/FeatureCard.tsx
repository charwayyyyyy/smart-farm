import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
      <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-light/20 lg:h-12 lg:w-12 dark:bg-primary-dark/20">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h3>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;