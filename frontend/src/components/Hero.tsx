import Link from 'next/link';

const Hero = () => {
  return (
    <section className="soil-texture">
      <div className="grid max-w-screen-xl px-4 py-12 mx-auto lg:gap-8 xl:gap-0 lg:py-20 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl lg:text-5xl xl:text-6xl text-black dark:text-white shadow-sm transition-all duration-300">
            Smart Farming Solutions for Ghana
          </h1>
          <p className="max-w-2xl mb-6 text-gray-800 dark:text-gray-200 font-medium lg:mb-8 text-base md:text-lg lg:text-xl transition-all duration-300">
            Access expert farming advice, personalized crop calendars, and agricultural knowledge through AI and SMS technology tailored for Ghanaian farmers.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href="/chatbot" className="w-full sm:w-auto">
              <button className="bg-primary hover:bg-primary-dark inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 text-base font-medium text-center text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-md">
                Try AI Assistant
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="bg-secondary hover:bg-secondary-dark inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 text-base font-medium text-center text-foreground rounded-lg transition-all duration-300 hover:scale-105 shadow-md">
                View Dashboard
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:col-span-5 lg:flex relative h-[250px] md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-xl border-2 border-earth-tan">
          {/* Farm illustration using SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            {/* Sky background */}
            <rect width="800" height="400" fill="#87CEEB" />
            
            {/* Sun */}
            <circle cx="650" cy="100" r="60" fill="#FDB813" />
            
            {/* Ground */}
            <rect y="400" width="800" height="200" fill="#8B5A2B" />
            
            {/* Fields */}
            <rect y="400" width="800" height="50" fill="#A67C52" />
            <rect y="450" width="800" height="150" fill="#556B2F" />
            
            {/* Crop rows */}
            <g fill="#4B7F52">
              <rect x="50" y="470" width="700" height="10" />
              <rect x="50" y="500" width="700" height="10" />
              <rect x="50" y="530" width="700" height="10" />
              <rect x="50" y="560" width="700" height="10" />
            </g>
            
            {/* Farm house */}
            <rect x="100" y="300" width="150" height="100" fill="#F5DEB3" />
            <polygon points="100,300 175,220 250,300" fill="#8B4513" />
            <rect x="160" y="350" width="30" height="50" fill="#4B3621" />
            
            {/* Trees */}
            <g>
              <rect x="400" y="320" width="20" height="80" fill="#8B4513" />
              <circle cx="410" cy="300" r="40" fill="#228B22" />
            </g>
            <g>
              <rect x="500" y="330" width="15" height="70" fill="#8B4513" />
              <circle cx="507" cy="310" r="30" fill="#228B22" />
            </g>
            
            {/* Text */}
            <text x="400" y="150" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#4B7F52" textAnchor="middle">SmartFarmGH</text>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;