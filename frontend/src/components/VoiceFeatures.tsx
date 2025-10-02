'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Mic, StopCircle, Send, Volume2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'tw', label: 'Twi' },
  { value: 'ee', label: 'Ewe' },
  { value: 'dag', label: 'Dagbani' }
];

export default function VoiceFeatures() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [response, setResponse] = useState('');
  const [audioResponse, setAudioResponse] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check your permissions.');
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  // Process audio for transcription and response
  const processAudio = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    try {
      // Create form data for the audio file
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      formData.append('language', selectedLanguage);

      // Send to backend for processing
      const response = await fetch('/api/voice/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe audio');
      }

      const data = await response.json();
      setTranscription(data.transcription);

      // Get AI response to the transcription
      const aiResponse = await fetch('/api/chat/voice-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: data.transcription,
          language: selectedLanguage,
        }),
      });

      if (!aiResponse.ok) {
        throw new Error('Failed to get AI response');
      }

      const aiData = await aiResponse.json();
      setResponse(aiData.response);
      setAudioResponse(aiData.audioUrl);
    } catch (error) {
      console.error('Error processing audio:', error);
      alert('Error processing your voice recording. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Play AI response audio
  const playResponseAudio = () => {
    if (audioResponse && audioPlayerRef.current) {
      audioPlayerRef.current.src = audioResponse;
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  // Handle audio player events
  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [audioResponse]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Voice Features</CardTitle>
        <CardDescription>Record voice notes and get answers in your preferred language</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="record">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="record">Record Question</TabsTrigger>
            <TabsTrigger value="response">Get Answer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                {!isRecording ? (
                  <Button 
                    onClick={startRecording} 
                    variant="default"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    Start Recording
                  </Button>
                ) : (
                  <Button 
                    onClick={stopRecording} 
                    variant="destructive"
                  >
                    <StopCircle className="mr-2 h-4 w-4" />
                    Stop Recording
                  </Button>
                )}
              </div>
            </div>
            
            {audioUrl && (
              <div className="mt-4">
                <audio ref={audioPlayerRef} src={audioUrl} controls className="w-full" />
              </div>
            )}
            
            {audioBlob && !isProcessing && (
              <Button 
                onClick={processAudio} 
                className="w-full mt-4"
              >
                <Send className="mr-2 h-4 w-4" />
                Send for Processing
              </Button>
            )}
            
            {isProcessing && (
              <div className="flex justify-center mt-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Processing your audio...</span>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="response" className="space-y-4">
            {transcription && (
              <div className="mb-4">
                <h3 className="text-lg font-medium">Your Question:</h3>
                <p className="p-3 bg-muted rounded-md">{transcription}</p>
              </div>
            )}
            
            {response && (
              <div className="mb-4">
                <h3 className="text-lg font-medium">Answer:</h3>
                <p className="p-3 bg-muted rounded-md">{response}</p>
              </div>
            )}
            
            {audioResponse && (
              <Button 
                onClick={playResponseAudio} 
                variant="outline" 
                className="w-full"
                disabled={isPlaying}
              >
                {isPlaying ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Volume2 className="mr-2 h-4 w-4" />
                )}
                Listen to Answer
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Powered by Whisper and GPT for voice transcription and responses
        </p>
      </CardFooter>
    </Card>
  );
}