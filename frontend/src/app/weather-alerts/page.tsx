'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WeatherAlertsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Weather Alerts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-yellow-500 border-2">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="text-yellow-700">Heavy Rain Warning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Expected heavy rainfall in Central and Western regions over the next 48 hours.</p>
            <p className="text-sm text-gray-500">Issued: Today at 8:00 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sunny conditions expected for most of Northern Ghana this week.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}