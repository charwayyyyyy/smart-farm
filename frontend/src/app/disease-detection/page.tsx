'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, Camera, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Mock data for supported crops (in production, fetch from API)
const SUPPORTED_CROPS = [
  { id: 'tomato', name: 'Tomato' },
  { id: 'maize', name: 'Maize' },
  { id: 'cassava', name: 'Cassava' },
  { id: 'rice', name: 'Rice' },
  { id: 'pepper', name: 'Pepper' },
  { id: 'cocoa', name: 'Cocoa' },
  { id: 'plantain', name: 'Plantain' }
];

export default function DiseaseDetectionPage() {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10MB');
        return;
      }

      if (!file.type.match('image/(jpeg|jpg|png)')) {
        setError('Only JPEG and PNG images are supported');
        return;
      }

      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  const resetForm = () => {
    setImage(null);
    setPreviewUrl(null);
    setDetectionResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!selectedCrop) {
      setError('Please select a crop type');
      return;
    }

    if (!image) {
      setError('Please upload an image of the plant');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create form data for API request
      const formData = new FormData();
      formData.append('image', image);
      formData.append('crop', selectedCrop);
      
      // Call the backend API
      const response = await fetch('/api/disease-detection/detect', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to detect disease');
      }
      
      const result = await response.json();
      
      // If API call fails, use fallback mock data
      if (!result.success) {
        throw new Error(result.message || 'Failed to detect disease');
      }
      
      // Set the result with the image preview URL
      setDetectionResult({
        ...result,
        imageUrl: previewUrl // Use the local preview URL instead of server URL
      });
    } catch (err) {
      console.error('Error detecting disease:', err);
      
      // Fallback to mock data for demo purposes
      const mockResult = {
        success: true,
        imageUrl: previewUrl,
        detection: {
          disease: 'Tomato Late Blight',
          scientificName: 'Phytophthora infestans',
          confidenceScore: 87,
          symptoms: 'Dark brown spots on leaves, stems, and fruits. White fungal growth may appear on the underside of leaves in humid conditions.',
          causes: 'Fungal pathogen that thrives in cool, wet conditions.',
          treatment: [
            'Apply copper-based fungicides as a preventative measure',
            'Ensure good air circulation by proper spacing between plants',
            'Avoid overhead irrigation; water at the base of plants',
            'Remove and destroy infected plant parts',
            'Rotate crops, avoiding planting tomatoes in the same location for 3-4 years'
          ],
          preventionTips: [
            'Use disease-resistant varieties',
            'Plant in well-drained soil',
            'Apply mulch to prevent soil splash onto leaves',
            'Avoid working with plants when they are wet'
          ]
        }
      };
      
      setDetectionResult(mockResult);
      setError('Using mock data: API connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Crop Disease Detection</h1>
      
      <Tabs defaultValue="detect" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="detect">Detect Disease</TabsTrigger>
          <TabsTrigger value="guide">How It Works</TabsTrigger>
        </TabsList>
        
        <TabsContent value="detect" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Plant Image</CardTitle>
                <CardDescription>
                  Take a clear photo of the affected plant part (leaf, stem, or fruit)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Crop Type</label>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_CROPS.map(crop => (
                          <SelectItem key={crop.id} value={crop.id}>
                            {crop.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    {previewUrl ? (
                      <div className="relative w-full h-48 mb-4">
                        <Image 
                          src={previewUrl} 
                          alt="Plant preview" 
                          fill 
                          style={{ objectFit: 'contain' }} 
                        />
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click to upload or take a photo
                        </p>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png"
                      className="hidden"
                    />
                    
                    <input
                      type="file"
                      ref={cameraInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png"
                      capture="environment"
                      className="hidden"
                    />
                    
                    <div className="flex gap-4 mt-4">
                      <Button variant="outline" size="sm" onClick={triggerFileInput}>
                        <Upload className="mr-2 h-4 w-4" /> Upload
                      </Button>
                      <Button variant="outline" size="sm" onClick={triggerCameraInput}>
                        <Camera className="mr-2 h-4 w-4" /> Camera
                      </Button>
                      {previewUrl && (
                        <Button variant="outline" size="sm" onClick={resetForm}>
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleSubmit} 
                  disabled={!selectedCrop || !image || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : 'Detect Disease'}
                </Button>
              </CardFooter>
            </Card>
            
            {detectionResult ? (
              <Card>
                <CardHeader>
                  <CardTitle>Detection Result</CardTitle>
                  <CardDescription>
                    Analysis of your plant image
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="text-lg font-semibold">
                        {detectionResult.detection.disease}
                      </h3>
                    </div>
                    
                    <div className="text-sm text-gray-500 italic">
                      {detectionResult.detection.scientificName}
                    </div>
                    
                    <div className="bg-amber-50 p-3 rounded-md">
                      <div className="font-medium">Confidence: {detectionResult.detection.confidenceScore}%</div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Symptoms</h4>
                      <p className="text-sm">{detectionResult.detection.symptoms}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Causes</h4>
                      <p className="text-sm">{detectionResult.detection.causes}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Treatment</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {detectionResult.detection.treatment.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Prevention Tips</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {detectionResult.detection.preventionTips.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Detection Result</CardTitle>
                  <CardDescription>
                    Upload an image to see the analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <p>No detection results yet</p>
                  <p className="text-sm mt-2">Select a crop and upload a clear image of the affected plant part</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="guide" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Use Crop Disease Detection</CardTitle>
              <CardDescription>
                Get accurate diagnosis and treatment recommendations for your crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Taking Good Photos</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Take photos in good natural light, avoiding shadows</li>
                    <li>Focus on the affected area (leaves, stems, fruits)</li>
                    <li>Include both healthy and diseased parts for comparison</li>
                    <li>Take multiple photos from different angles if needed</li>
                    <li>Keep the camera steady to avoid blurry images</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Supported Crops</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SUPPORTED_CROPS.map(crop => (
                      <div key={crop.id} className="bg-gray-100 rounded-md p-2 text-center">
                        {crop.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">How It Works</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Select your crop type from the dropdown menu</li>
                    <li>Upload a clear photo of the affected plant part</li>
                    <li>Our AI model analyzes the image to identify diseases</li>
                    <li>Review the diagnosis, treatment recommendations, and prevention tips</li>
                    <li>Apply the suggested treatments to manage the disease</li>
                  </ol>
                </div>
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    While our system provides accurate diagnoses in most cases, for severe or unusual symptoms, 
                    we recommend consulting with a local agricultural extension officer for confirmation.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}