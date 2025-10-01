'use client';

import React from 'react';
import VoiceFeatures from '@/components/VoiceFeatures';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function VoiceAssistantPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">SmartFarmGH Voice Assistant</h1>
      
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="voice">Voice Assistant</TabsTrigger>
            <TabsTrigger value="help">How It Works</TabsTrigger>
          </TabsList>
          
          <TabsContent value="voice" className="mt-6">
            <VoiceFeatures />
          </TabsContent>
          
          <TabsContent value="help" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">How to Use the Voice Assistant</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">1. Select Your Language</h3>
                  <p>Choose from English, Twi, Ewe, or Dagbani to interact in your preferred language.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">2. Record Your Question</h3>
                  <p>Click the "Start Recording" button and speak clearly into your microphone. Click "Stop Recording" when finished.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">3. Send for Processing</h3>
                  <p>After recording, click "Send for Processing" to have your question transcribed and answered.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">4. Review the Answer</h3>
                  <p>Switch to the "Get Answer" tab to see your transcribed question and the answer. You can also listen to the audio response.</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 rounded-md border border-amber-200">
                <h3 className="text-lg font-medium text-amber-800">Tips for Best Results</h3>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-amber-700">
                  <li>Speak clearly and at a normal pace</li>
                  <li>Reduce background noise when recording</li>
                  <li>Keep questions specific to farming topics for best answers</li>
                  <li>For complex questions, break them down into simpler parts</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}