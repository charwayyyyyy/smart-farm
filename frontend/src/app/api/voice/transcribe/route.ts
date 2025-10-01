import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// This function handles the POST request for audio transcription
export async function POST(request: NextRequest) {
  try {
    // Get form data from the request
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const language = formData.get('language') as string || 'en';
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Create a unique filename
    const fileName = `${uuidv4()}.wav`;
    const filePath = join('/tmp', fileName);
    
    // Convert the file to a Buffer and write it to disk
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    await writeFile(filePath, buffer);
    
    // Call Whisper API for transcription
    // In a production environment, you would use the OpenAI API directly
    // For demo purposes, we'll simulate a response
    
    // Simulate Whisper API call with language parameter
    // In production, replace with actual API call:
    /*
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData, // Include audio file and language
    });
    const data = await response.json();
    const transcription = data.text;
    */
    
    // Simulated response based on language
    let transcription = '';
    
    // Simulate different language transcriptions
    switch(language) {
      case 'tw':
        transcription = 'Mepɛ sɛ mehunu sɛdeɛ mɛtumi adɔw tomatoes wɔ me mfuo so.';
        break;
      case 'ee':
        transcription = 'Medi be manya alesi mate ŋu ado tomatoes le nye abɔme.';
        break;
      case 'dag':
        transcription = 'N bɔri ni n baŋ shɛm ka n ni tooi kɔ tomatoes n puu ni.';
        break;
      default: // English
        transcription = 'I want to know how to grow tomatoes on my farm.';
    }
    
    // Return the transcription
    return NextResponse.json({ transcription });
    
  } catch (error) {
    console.error('Error processing audio:', error);
    return NextResponse.json(
      { error: 'Failed to process audio file' },
      { status: 500 }
    );
  }
}