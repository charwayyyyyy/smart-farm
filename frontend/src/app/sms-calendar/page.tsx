'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

type Crop = {
  id: string;
  name: string;
  growingPeriod: number;
  wateringFrequency: string;
  fertilizingSchedule: string;
};

export default function SmsCalendar() {
  const [phone, setPhone] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mock crop data for demo
  const crops: Crop[] = [
    {
      id: '1',
      name: 'Tomato',
      growingPeriod: 90,
      wateringFrequency: 'Every 2-3 days',
      fertilizingSchedule: 'Every 2 weeks',
    },
    {
      id: '2',
      name: 'Maize',
      growingPeriod: 120,
      wateringFrequency: 'Every 3-4 days',
      fertilizingSchedule: 'Every 3 weeks',
    },
    {
      id: '3',
      name: 'Cassava',
      growingPeriod: 270,
      wateringFrequency: 'Every 5-7 days',
      fertilizingSchedule: 'Every 4 weeks',
    },
    {
      id: '4',
      name: 'Pepper',
      growingPeriod: 80,
      wateringFrequency: 'Every 2 days',
      fertilizingSchedule: 'Every 2 weeks',
    },
    {
      id: '5',
      name: 'Yam',
      growingPeriod: 240,
      wateringFrequency: 'Every 4-5 days',
      fertilizingSchedule: 'Every 4 weeks',
    },
  ];

  // This function would be used in production with a real backend
  // Currently using handleDemoSubmit for the demo version
  /*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      // In a real implementation, this would call the backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sms/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          cropId: selectedCrop,
          plantingDate,
          location,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to subscribe');
      }

      setSuccess(true);
      // Reset form
      setPhone('');
      setSelectedCrop('');
      setPlantingDate('');
      setLocation('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  */
  
  // Demo version of the submit handler
  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      if (!phone || !selectedCrop || !plantingDate || !location) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      setSuccess(true);
      // Reset form
      setPhone('');
      setSelectedCrop('');
      setPlantingDate('');
      setLocation('');
      setLoading(false);
    }, 1500);
  };

  // This function is already defined above, so we'll remove this duplicate

  const selectedCropDetails = crops.find(crop => crop.id === selectedCrop);

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-primary mb-2">SMS Crop Calendar</h1>
        <p className="text-gray-600 mb-6">
          Subscribe to receive SMS reminders for your crop&apos;s planting, watering, fertilizing, and harvesting schedule.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Subscribe to SMS Reminders</h2>

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                Successfully subscribed! You will start receiving SMS reminders for your crop.
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleDemoSubmit}>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +233201234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">Don&apos;t worry, we&apos;ll only send you relevant updates about your crops.</p>
              </div>

              <div className="mb-4">
                <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Crop
                </label>
                <select
                  id="crop"
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select a crop</option>
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Planting Date
                </label>
                <input
                  type="date"
                  id="plantingDate"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location (Region)
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Ashanti Region"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-2 px-4 rounded-md"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Select your crop and enter your planting date</li>
                <li>Provide your phone number and location</li>
                <li>Receive timely SMS reminders for:</li>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Watering schedule</li>
                  <li>Fertilizing dates</li>
                  <li>Pest control recommendations</li>
                  <li>Harvesting time</li>
                </ul>
              </ol>
            </div>

            {selectedCropDetails && (
              <div className="bg-background-light rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">{selectedCropDetails.name} Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Growing Period:</span> {selectedCropDetails.growingPeriod} days</p>
                  <p><span className="font-medium">Watering:</span> {selectedCropDetails.wateringFrequency}</p>
                  <p><span className="font-medium">Fertilizing:</span> {selectedCropDetails.fertilizingSchedule}</p>
                  <p><span className="font-medium">Estimated Harvest Date:</span> {plantingDate ? new Date(new Date(plantingDate).getTime() + selectedCropDetails.growingPeriod * 24 * 60 * 60 * 1000).toLocaleDateString() : 'Select planting date'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}