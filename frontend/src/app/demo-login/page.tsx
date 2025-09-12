'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { FaTractor, FaUserTie, FaUserCog } from 'react-icons/fa';
import FarmIcon from '@/components/FarmIcons';

export default function DemoLogin() {
  // Demo login credentials
  const demoUsers = [
    { 
      role: 'Farmer', 
      email: 'farmer@demo.com', 
      password: 'password123', 
      icon: <FaTractor className="mr-2" />,
      description: 'Access crop calendars, farming tips, and personalized advice',
      farmIcon: 'seedling'
    },
    { 
      role: 'Extension Officer', 
      email: 'officer@demo.com', 
      password: 'password123', 
      icon: <FaUserTie className="mr-2" />,
      description: 'Manage farmer accounts and provide agricultural guidance',
      farmIcon: 'leaf'
    },
    { 
      role: 'Admin', 
      email: 'admin@demo.com', 
      password: 'password123', 
      icon: <FaUserCog className="mr-2" />,
      description: 'Full system access with content management capabilities',
      farmIcon: 'tractor'
    }
  ];
  
  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    // In a real app, this would authenticate the user
    // For demo purposes, we'll just redirect to the dashboard
    localStorage.setItem('demoUser', demoEmail);
    window.location.href = '/dashboard';
  };

  return (
    <Layout>
      <div className="container-responsive py-12 animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">Demo Login Access</h1>
        <p className="text-center mb-12 max-w-2xl mx-auto">Choose one of our demo accounts to explore the SmartFarmGH platform with different permission levels.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {demoUsers.map((user) => (
            <div key={user.role} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <FarmIcon name={user.farmIcon} size="xl" className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{user.role}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">{user.description}</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-4">
                  <p className="text-sm"><strong>Email:</strong> {user.email}</p>
                  <p className="text-sm"><strong>Password:</strong> {user.password}</p>
                </div>
                <button
                  onClick={() => handleDemoLogin(user.email, user.password)}
                  className="w-full btn-primary py-2 px-4 rounded-md flex items-center justify-center"
                >
                  {user.icon}
                  Login as {user.role}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/login" className="text-primary hover:text-primary-dark underline">
            Return to regular login
          </Link>
        </div>
      </div>
    </Layout>
  );
}