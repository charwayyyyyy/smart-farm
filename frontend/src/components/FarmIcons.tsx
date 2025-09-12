'use client';

import { FaSeedling, FaTractor, FaLeaf, FaCloudRain, FaSun, FaCarrot, FaAppleAlt } from 'react-icons/fa';
import { GiCorn, GiWheat, GiPlantSeed } from 'react-icons/gi';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface FarmIconProps {
  name: string;
  size?: IconSize;
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const FarmIcon = ({ name, size = 'md', className = '' }: FarmIconProps) => {
  const sizeClass = sizeMap[size];
  const combinedClassName = `${sizeClass} ${className}`;
  
  switch (name) {
    case 'seedling':
      return <FaSeedling className={combinedClassName} />;
    case 'tractor':
      return <FaTractor className={combinedClassName} />;
    case 'leaf':
      return <FaLeaf className={combinedClassName} />;
    case 'rain':
      return <FaCloudRain className={combinedClassName} />;
    case 'sun':
      return <FaSun className={combinedClassName} />;
    case 'carrot':
      return <FaCarrot className={combinedClassName} />;
    case 'apple':
      return <FaAppleAlt className={combinedClassName} />;
    case 'corn':
      return <GiCorn className={combinedClassName} />;
    case 'wheat':
      return <GiWheat className={combinedClassName} />;
    case 'seed':
      return <GiPlantSeed className={combinedClassName} />;
    default:
      return <FaSeedling className={combinedClassName} />;
  }
};

export default FarmIcon;