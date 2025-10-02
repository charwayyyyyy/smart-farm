'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MarketPricesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Market Prices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Maize</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">GH₵ 450 <span className="text-sm text-gray-500">per bag</span></p>
            <p className="text-green-600 text-sm">↑ 5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">GH₵ 650 <span className="text-sm text-gray-500">per bag</span></p>
            <p className="text-red-600 text-sm">↓ 2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cassava</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">GH₵ 120 <span className="text-sm text-gray-500">per bag</span></p>
            <p className="text-gray-600 text-sm">No change from last week</p>
          </CardContent>
        </Card>
      </div>
      <p className="mt-8 text-gray-500">
        Note: Prices are updated weekly based on major markets across Ghana.
      </p>
    </div>
  );
}