import { NextRequest, NextResponse } from 'next/server';

// This function handles the POST request for voice queries
export async function POST(request: NextRequest) {
  try {
    const { query, language } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'No query provided' },
        { status: 400 }
      );
    }

    // In a production environment, you would call the OpenAI API
    // For demo purposes, we'll simulate a response
    
    // Simulate different responses based on language
    let response = '';
    let audioUrl = '';
    
    // The query is about growing tomatoes
    switch(language) {
      case 'tw':
        response = 'Sɛ wopɛ sɛ wodɔw tomatoes a, hwehwɛ asase a ɛwɔ owia mu yie. Tomatoes hia nsu pii ne owia. Hyɛ ase fi aba anaa mfɛtɛ a wɔadɔw dedaw. Fa wɔn to asase a ɛwɔ nitrogen, phosphorus ne potassium mu. Sɛ wopɛ sɛ wonya aba pa a, ma nsuo ngu so bere biara na yi nwura firi hɔ. Hwɛ yadeɛ ne mmoa a ɛbɛtumi asɛe wo nnɔbaeɛ no so.';
        audioUrl = '/api/audio/responses/tomatoes-tw.mp3';
        break;
      case 'ee':
        response = 'Ne èdzro be nàdo tomatoes la, di anyigba si xexe ɖe ŋgɔ nyuie. Tomatoes hiã tsi geɖe kple ŋdɔ. Dze egɔme tso ku alo atilɛ siwo wodo xoxo me. Tsɔ wo ɖo anyigba si me nitrogen, phosphorus kple potassium le. Ne èdi be nàkpɔ ku nyuiwo la, de tsi eme enuenu eye nàɖe gbe vɔ̃wo ɖa. Lé ŋku ɖe dɔléle kple nudzodzoewo ŋu siwo ate ŋu agblẽ wò nukuwo.';
        audioUrl = '/api/audio/responses/tomatoes-ee.mp3';
        break;
      case 'dag':
        response = 'A yi ni a ko tomatoes, a nyari tiŋgbani din ni wuntia ni. Tomatoes bori kom mini ni wuntia pam. Pili ni a zaŋ bini bee tihi sheli ka bi gari. Niŋ ba niŋ tiŋgbani din ni nitrogen, phosphorus mini potassium be ni. A yi ni a nya bini viela, a kpahiri kom ka a ŋahiri mɔri. A guri lahabali din ni doro mini binkonima din ni tooi saai a binsheli.';
        audioUrl = '/api/audio/responses/tomatoes-dag.mp3';
        break;
      default: // English
        response = 'To grow tomatoes, look for a spot with good sun exposure. Tomatoes need plenty of water and sunlight. Start from seeds or seedlings that have already sprouted. Place them in soil rich in nitrogen, phosphorus, and potassium. To get good fruit, water regularly and remove weeds. Watch out for diseases and pests that could damage your crop.';
        audioUrl = '/api/audio/responses/tomatoes-en.mp3';
    }
    
    // Return the response and audio URL
    return NextResponse.json({ 
      response,
      audioUrl
    });
    
  } catch (error) {
    console.error('Error processing query:', error);
    return NextResponse.json(
      { error: 'Failed to process query' },
      { status: 500 }
    );
  }
}