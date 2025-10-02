"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "@/components/ui/charts";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-earth-brown mb-6">Personalized Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-earth-green">Crop Health</CardTitle>
            <CardDescription>Overall status of your crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">87%</div>
            <p className="text-sm text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-earth-green">Weather Forecast</CardTitle>
            <CardDescription>Next 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mr-2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              <span className="text-xl">28°C</span>
            </div>
            <p className="text-sm text-muted-foreground">Sunny with light clouds</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-earth-green">Tasks</CardTitle>
            <CardDescription>Upcoming farm activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg">5 tasks pending</div>
            <p className="text-sm text-muted-foreground">2 high priority</p>
            <Button variant="outline" size="sm" className="mt-2">View All</Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="crops" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="crops">Crop Performance</TabsTrigger>
          <TabsTrigger value="market">Market Prices</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="crops" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Yield Trends</CardTitle>
              <CardDescription>Performance over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization placeholder</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Price Trends</CardTitle>
              <CardDescription>Price fluctuations for your crops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization placeholder</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
              <CardDescription>Water, fertilizer and energy usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization placeholder</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your farm management history</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="pb-2 border-b">
                <div className="font-medium">Irrigation system activated</div>
                <div className="text-sm text-muted-foreground">Today, 08:30 AM</div>
              </li>
              <li className="pb-2 border-b">
                <div className="font-medium">Fertilizer application scheduled</div>
                <div className="text-sm text-muted-foreground">Tomorrow, 06:00 AM</div>
              </li>
              <li className="pb-2 border-b">
                <div className="font-medium">Pest detection alert resolved</div>
                <div className="text-sm text-muted-foreground">Yesterday, 02:15 PM</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>AI-powered farming suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="pb-2 border-b">
                <div className="font-medium">Increase watering for maize field</div>
                <div className="text-sm text-muted-foreground">Due to forecasted dry spell</div>
              </li>
              <li className="pb-2 border-b">
                <div className="font-medium">Check southern cassava plot</div>
                <div className="text-sm text-muted-foreground">Potential early signs of disease</div>
              </li>
              <li className="pb-2 border-b">
                <div className="font-medium">Consider harvesting tomatoes</div>
                <div className="text-sm text-muted-foreground">Optimal market prices this week</div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}