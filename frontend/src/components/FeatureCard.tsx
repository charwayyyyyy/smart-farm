import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="p-6 bg-background rounded-lg border-2 border-earth-tan shadow-lg hover:border-primary transition-all duration-300">
      <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-secondary-light/20 lg:h-14 lg:w-14">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold tracking-tight text-earth-brown">{title}</h3>
      <p className="mb-3 font-normal text-earth-green">{description}</p>
      <div className="w-1/4 h-1 bg-secondary rounded-full mt-4"></div>
    </div>
  );
};

export default FeatureCard;