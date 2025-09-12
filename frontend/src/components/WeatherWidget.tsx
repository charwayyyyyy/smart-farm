'use client';

import { useState, useEffect } from 'react';

type WeatherData = {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
};

export default function WeatherWidget({ location = 'Accra, Ghana' }: { location?: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      
      try {
        // In a real implementation, this would call a weather API
        // For demo purposes, we'll simulate a response
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data
        const mockWeatherData: WeatherData = {
          location: location,
          temperature: Math.floor(Math.random() * 10) + 25, // Random temp between 25-34°C
          condition: ['Sunny', 'Partly Cloudy', 'Scattered Showers', 'Mostly Sunny'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 30) + 50, // Random humidity between 50-79%
          windSpeed: Math.floor(Math.random() * 15) + 5, // Random wind speed between 5-19 km/h
          icon: ['☀️', '⛅', '🌦️', '☀️'][Math.floor(Math.random() * 4)],
        };
        
        setWeather(mockWeatherData);
      } catch (err: any) {
        setError('Failed to fetch weather data. Please try again later.');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeather();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [location]);
  
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-red-500">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  if (!weather) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{weather.location}</h3>
          <div className="flex items-center mt-1">
            <span className="text-3xl mr-2">{weather.icon}</span>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">{weather.temperature}°C</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{weather.condition}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Weather data for farmers in {weather.location}. Updated just now.
        </p>
      </div>
    </div>
  );
}