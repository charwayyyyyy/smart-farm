'use client';

import React from 'react';

// Simple chart components using div elements with styling
// In a real application, you would use a charting library like Chart.js or Recharts

export const LineChart = ({ 
  data = [25, 50, 75, 100, 80, 60, 40], 
  labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  title = 'Line Chart',
  className = ''
}) => {
  const max = Math.max(...data);
  
  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow ${className}`}>
      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="flex items-end h-40 gap-1">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-green-500 rounded-t" 
              style={{ height: `${(value / max) * 100}%` }}
            ></div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BarChart = ({ 
  data = [30, 70, 45, 90, 60], 
  labels = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
  title = 'Bar Chart',
  className = ''
}) => {
  const max = Math.max(...data);
  
  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow ${className}`}>
      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="space-y-3">
        {data.map((value, index) => (
          <div key={index} className="flex items-center">
            <span className="text-xs w-24 text-gray-600 dark:text-gray-400">{labels[index]}</span>
            <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${(value / max) * 100}%` }}
              ></div>
            </div>
            <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PieChart = ({ 
  data = [30, 40, 20, 10], 
  labels = ['Segment 1', 'Segment 2', 'Segment 3', 'Segment 4'],
  colors = ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
  title = 'Pie Chart',
  className = ''
}) => {
  // Calculate total for percentages
  const total = data.reduce((sum, value) => sum + value, 0);
  
  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow ${className}`}>
      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="flex">
        <div className="w-32 h-32 relative rounded-full overflow-hidden">
          {data.map((value, index, array) => {
            // Calculate the percentage and angle for this segment
            const percentage = (value / total) * 100;
            const previousPercentages = array.slice(0, index).reduce((sum, v) => sum + (v / total) * 100, 0);
            
            return (
              <div 
                key={index}
                className="absolute inset-0"
                style={{
                  backgroundColor: colors[index % colors.length],
                  clipPath: `conic-gradient(from ${previousPercentages * 3.6}deg, transparent ${percentage * 3.6}deg, transparent 360deg)`
                }}
              ></div>
            );
          })}
        </div>
        <div className="ml-4 flex-1">
          <div className="space-y-2">
            {data.map((value, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {labels[index]}: {((value / total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};