'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, MessageSquare, AlertTriangle, BarChart3 } from 'lucide-react';

export default function USSDAccessPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Offline Access via USSD</h1>
      
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Dial *123# for SmartFarmGH
            </CardTitle>
            <CardDescription>
              Access farming information and services without internet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              SmartFarmGH is now available via USSD! Simply dial <span className="font-bold">*123#</span> on any mobile phone to access our services without internet connectivity.
            </p>
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
              <h3 className="text-amber-800 font-medium mb-2">How It Works</h3>
              <p className="text-amber-700">
                USSD works on all phones, including basic feature phones. No smartphone or internet required. Standard network rates apply.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="crops">Crop Registration</TabsTrigger>
            <TabsTrigger value="questions">Ask Questions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Prices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Register Crops
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Register your crops to receive timely SMS reminders for planting, fertilizing, pest control, and harvesting.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Ask Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get answers to your farming questions via SMS using our AI-powered knowledge base.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Weather Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Subscribe to location-based weather alerts for rainfall, drought, and extreme weather events.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Market Prices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Check current market prices for major crops across different markets in Ghana.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="crops" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Crop Registration Process</CardTitle>
                <CardDescription>Follow these steps to register your crops via USSD</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <p className="font-medium">Dial *123#</p>
                    <p className="text-sm text-gray-600">You'll see the main menu</p>
                  </li>
                  <li>
                    <p className="font-medium">Select option 1: Register Crop</p>
                    <p className="text-sm text-gray-600">You'll be prompted to enter crop details</p>
                  </li>
                  <li>
                    <p className="font-medium">Enter the crop name</p>
                    <p className="text-sm text-gray-600">Example: Maize, Rice, Cassava, etc.</p>
                  </li>
                  <li>
                    <p className="font-medium">Select the crop type</p>
                    <p className="text-sm text-gray-600">Choose from: Cereal, Vegetable, Fruit, Tuber, or Other</p>
                  </li>
                  <li>
                    <p className="font-medium">Enter planted area in acres</p>
                    <p className="text-sm text-gray-600">Example: 2.5</p>
                  </li>
                  <li>
                    <p className="font-medium">Enter planting date</p>
                    <p className="text-sm text-gray-600">Format: DD/MM/YYYY</p>
                  </li>
                </ol>
                
                <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
                  <h3 className="text-green-800 font-medium mb-2">What Happens Next?</h3>
                  <p className="text-green-700">
                    After registration, you'll receive SMS reminders for key farming activities based on your crop type and planting date. These include when to apply fertilizer, control pests, and harvest.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Ask Farming Questions</CardTitle>
                <CardDescription>Get expert farming advice via SMS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">How to Ask Questions</h3>
                    <ol className="list-decimal pl-5 mt-2 space-y-2">
                      <li>Dial *123#</li>
                      <li>Select option 2: Ask Farming Question</li>
                      <li>Type your question clearly and submit</li>
                      <li>Receive an answer via SMS</li>
                    </ol>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                    <h3 className="text-blue-800 font-medium mb-2">Example Questions</h3>
                    <ul className="list-disc pl-5 text-blue-700 space-y-1">
                      <li>How to plant maize?</li>
                      <li>Best fertilizer for tomatoes?</li>
                      <li>How to control pests naturally?</li>
                      <li>When to harvest cassava?</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Tips for Good Questions</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Be specific about the crop or issue</li>
                      <li>Keep questions short and clear</li>
                      <li>Ask one question at a time</li>
                      <li>Mention your location if relevant</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Weather Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Get timely weather alerts specific to your location:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Dial *123#</li>
                      <li>Select option 3: Weather Alerts</li>
                      <li>Enter your district</li>
                      <li>Receive confirmation</li>
                    </ol>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-blue-700 text-sm">
                        You'll receive SMS alerts for rainfall forecasts, drought warnings, and extreme weather events relevant to your location.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Market Prices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Check current market prices for major crops:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Dial *123#</li>
                      <li>Select option 4: Market Prices</li>
                      <li>Select your crop of interest</li>
                      <li>View prices across major markets</li>
                    </ol>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-blue-700 text-sm">
                        Prices are updated daily for major markets including Accra, Kumasi, and Tamale. Use this information to decide when and where to sell your produce.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}