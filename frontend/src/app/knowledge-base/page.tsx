'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

type Article = {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
};

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Mock categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'crops', name: 'Crop Management' },
    { id: 'soil', name: 'Soil Health' },
    { id: 'pests', name: 'Pest Control' },
    { id: 'weather', name: 'Weather Adaptation' },
    { id: 'market', name: 'Market Access' },
  ];

  // Mock articles data
  const articles: Article[] = [
    {
      id: '1',
      title: 'Best Practices for Maize Cultivation in Ghana',
      category: 'crops',
      summary: 'Learn about optimal planting times, spacing, and care for maize in different Ghanaian regions.',
      content: `# Best Practices for Maize Cultivation in Ghana

Maize is one of Ghana's most important cereal crops, grown across various ecological zones. This guide provides essential information for successful maize cultivation in Ghana.

## Planting Season

The planting season varies by region:
- **Southern Ghana**: Two seasons - Major (March-April) and Minor (August-September)
- **Northern Ghana**: One season - May to July

## Land Preparation

1. Clear the land of weeds and debris
2. Plow to a depth of 20-30cm
3. Harrow to break soil clumps
4. Create ridges or mounds in areas prone to waterlogging

## Seed Selection

Choose improved varieties suitable for your region:
- **Obatanpa**: High-yielding, disease-resistant variety suitable for all ecological zones
- **Mamaba**: Early maturing (80-85 days), good for drought-prone areas
- **Aburohemaa**: Medium maturing (105-110 days), good for the forest zone

## Planting

- **Spacing**: 80cm between rows and 40cm between plants
- **Depth**: 3-5cm deep
- **Seeds per hole**: 2-3 seeds, to be thinned to 2 plants per stand

## Fertilizer Application

1. **Basal application**: Apply NPK 15-15-15 at 250kg/ha at planting or 1-2 weeks after germination
2. **Top dressing**: Apply urea at 125kg/ha 4-6 weeks after planting

## Weed Control

- First weeding: 2-3 weeks after planting
- Second weeding: 5-6 weeks after planting
- Consider pre-emergence herbicides like Atrazine for large farms

## Pest and Disease Management

### Common Pests
- Stem borers: Apply Cypermethrin or Deltamethrin
- Fall armyworm: Scout early and apply Emamectin benzoate or Spinetoram

### Common Diseases
- Maize streak virus: Use resistant varieties and control leafhoppers
- Leaf blight: Crop rotation and fungicide application

## Harvesting

Harvest when the husks turn brown and dry, and the kernels are hard. This is typically:
- 80-90 days for early varieties
- 105-120 days for medium varieties
- 120-130 days for late varieties

## Storage

1. Dry maize to 12-13% moisture content
2. Clean storage area thoroughly
3. Use hermetic bags or silos for storage
4. Apply appropriate storage pesticides to prevent weevil infestation

## Contact for Support

For more information, contact your local agricultural extension officer or the Ministry of Food and Agriculture office in your district.`,
    },
    {
      id: '2',
      title: 'Soil Testing and Improvement Methods for Ghanaian Farms',
      category: 'soil',
      summary: 'Understand how to test your soil and improve its fertility using both traditional and modern methods.',
      content: `# Soil Testing and Improvement Methods for Ghanaian Farms

Soil health is fundamental to successful farming. This guide helps Ghanaian farmers understand and improve their soil quality.

## Why Soil Testing Matters

Soil testing helps you:
- Determine nutrient levels and deficiencies
- Understand soil pH and structure
- Make informed decisions about fertilizers and amendments
- Increase crop yields and quality
- Save money by applying only necessary inputs

## Simple Soil Testing Methods

### Visual Assessment
1. Observe soil color: Dark soils often indicate higher organic matter
2. Check soil structure: Crumbly soil with visible pores is healthier than compacted soil
3. Look for earthworms and other soil organisms

### Jar Test for Soil Composition
1. Fill a clear jar 1/3 full with soil
2. Add water until the jar is almost full
3. Add a teaspoon of salt to help particles separate
4. Shake vigorously and let settle for 24 hours
5. Observe layers: sand (bottom), silt (middle), clay (top)

### pH Testing
1. Purchase simple pH test kits from agricultural supply stores
2. Follow kit instructions to determine if your soil is acidic, neutral, or alkaline
3. Most crops prefer a pH between 6.0-7.0

## Professional Soil Testing

For comprehensive results, send samples to:
- Soil Research Institute in Kumasi
- University of Ghana Soil Science Department
- Regional agricultural offices with soil testing facilities

## Soil Improvement Methods

### For Acidic Soils (Low pH)
- Apply agricultural lime (calcium carbonate)
- Incorporate wood ash from cooking fires
- Use dolomitic lime for magnesium deficiency

### For Alkaline Soils (High pH)
- Add organic matter like compost and manure
- Apply elemental sulfur
- Use acidifying fertilizers like ammonium sulfate

### Improving Soil Structure
1. **Add organic matter**:
   - Compost
   - Well-rotted manure
   - Green manures/cover crops

2. **Practice crop rotation**:
   - Include legumes to fix nitrogen
   - Alternate deep and shallow-rooted crops

3. **Minimize tillage** to preserve soil structure

4. **Use mulch** to protect soil surface

### Traditional Ghanaian Soil Improvement Methods

1. **Charcoal dust (Biochar)**:
   - Incorporate charcoal dust from cooking into soil
   - Improves water retention and nutrient holding capacity

2. **Mixed cropping**:
   - Traditional practice of growing multiple crops together
   - Improves soil health and reduces pest pressure

3. **Mounding and ridging**:
   - Creates microenvironments for different crops
   - Helps with water management

## Recommended Organic Amendments

1. **Compost**: Apply 2-3 tons per hectare
2. **Poultry manure**: Apply 5-10 tons per hectare
3. **Cow manure**: Apply 10-20 tons per hectare
4. **Green manure**: Grow cover crops like mucuna or canavalia

## Contact for Support

For soil testing assistance, contact your district agricultural development unit or the Soil Research Institute in Kumasi.`,
    },
    {
      id: '3',
      title: 'Integrated Pest Management for Vegetable Farms',
      category: 'pests',
      summary: 'Learn eco-friendly and effective methods to manage pests in vegetable production.',
      content: `# Integrated Pest Management for Vegetable Farms in Ghana

Integrated Pest Management (IPM) combines multiple strategies to control pests while minimizing environmental impact and reducing reliance on chemical pesticides.

## Principles of IPM

1. **Prevention**: Use resistant varieties and cultural practices to prevent pest problems
2. **Monitoring**: Regularly check crops for pests and beneficial insects
3. **Decision-making**: Establish action thresholds before applying controls
4. **Intervention**: Use the least harmful method first
5. **Evaluation**: Assess the effectiveness of your pest management strategies

## Common Vegetable Pests in Ghana

### Aphids
- **Identification**: Small, soft-bodied insects that cluster on new growth
- **Damage**: Suck plant sap, transmit viruses, cause leaf curling
- **Control**: Neem oil spray, insecticidal soap, encourage ladybugs and lacewings

### Whiteflies
- **Identification**: Tiny white flying insects on leaf undersides
- **Damage**: Suck plant sap, transmit viruses, excrete honeydew
- **Control**: Yellow sticky traps, neem oil, insecticidal soap

### Tomato Fruitworm
- **Identification**: Green to brown caterpillars with light stripes
- **Damage**: Bore into fruits, especially tomatoes and peppers
- **Control**: Bacillus thuringiensis (Bt) spray, pheromone traps

### Diamondback Moth
- **Identification**: Small caterpillars that wriggle backward when disturbed
- **Damage**: Create holes in cabbage, kale, and other brassicas
- **Control**: Bt spray, crop rotation, row covers

## Cultural Control Methods

1. **Crop rotation**: Don't plant the same family of vegetables in the same location year after year
2. **Sanitation**: Remove crop residues that may harbor pests
3. **Timing**: Adjust planting dates to avoid peak pest periods
4. **Trap crops**: Plant attractive crops to lure pests away from main crops
5. **Intercropping**: Mix crops to confuse pests and attract beneficial insects

## Physical Control Methods

1. **Handpicking**: Remove larger pests by hand
2. **Traps**: Use sticky traps, pheromone traps, or light traps
3. **Barriers**: Use row covers, nets, or screens
4. **Mulching**: Apply reflective mulch to repel certain insects

## Biological Control Methods

1. **Beneficial insects**: Encourage ladybugs, lacewings, and predatory wasps
2. **Microbial products**: Use Bt, nematodes, or fungi that target specific pests
3. **Botanical insecticides**: Apply neem, pyrethrum, or garlic-based sprays

## Traditional Ghanaian Pest Control Methods

1. **Pepper spray**: Blend hot peppers with water and spray on plants
2. **Wood ash**: Sprinkle around plants to deter soft-bodied insects
3. **Neem leaves**: Crush and soak in water overnight, then strain and spray
4. **Marigold intercropping**: Plant marigolds among vegetables to repel nematodes

## Chemical Control (Last Resort)

If other methods fail, choose the least toxic pesticide that targets your specific pest:

1. Always read and follow label instructions
2. Apply at the correct time and dosage
3. Observe pre-harvest intervals
4. Rotate pesticides to prevent resistance
5. Protect yourself with appropriate gear

## Record Keeping

Maintain records of:
- Pest observations
- Control methods used
- Results achieved
- Costs incurred

This information will help improve your pest management strategies over time.

## Contact for Support

For IPM assistance, contact your local agricultural extension officer or the Plant Protection and Regulatory Services Directorate (PPRSD).`,
    },
    {
      id: '4',
      title: 'Weather Patterns and Climate-Smart Farming in Ghana',
      category: 'weather',
      summary: 'Understand Ghana\'s changing weather patterns and learn adaptation strategies for your farm.',
      content: `# Weather Patterns and Climate-Smart Farming in Ghana

Ghana's climate is changing, with more unpredictable rainfall, higher temperatures, and more extreme weather events. This guide helps farmers understand and adapt to these changes.

## Ghana's Climate Zones

1. **Coastal Savannah**: Warm with two rainy seasons, but generally drier than other zones
2. **Forest Zone**: Humid with two distinct rainy seasons
3. **Transition Zone**: Between forest and northern savannah, with gradually reducing rainfall
4. **Northern Savannah**: Single rainy season from May to October

## Changing Weather Patterns

### Rainfall Changes
- Later onset of rainy seasons
- More intense rainfall events
- Longer dry spells during growing seasons
- Overall reduction in predictability

### Temperature Changes
- Increasing average temperatures
- More extremely hot days
- Higher nighttime temperatures
- Extended heat waves

## Weather Monitoring Tools for Farmers

1. **Rain gauges**: Simple tools to measure rainfall on your farm
2. **Mobile apps**: Esoko, Farmerline, and Ghana Meteorological Agency apps
3. **Community monitoring**: Participate in local weather monitoring networks
4. **Traditional indicators**: Learn to read natural signs (animal behavior, cloud patterns)

## Climate-Smart Farming Practices

### Water Management

1. **Rainwater harvesting**:
   - Construct small ponds or reservoirs
   - Use rooftop collection systems
   - Build contour bunds to slow water flow

2. **Irrigation efficiency**:
   - Drip irrigation for vegetables
   - Clay pot irrigation for small plots
   - Watering in early morning or evening

3. **Soil moisture conservation**:
   - Mulching with crop residues
   - Minimum tillage
   - Cover cropping

### Crop Selection and Management

1. **Drought-tolerant varieties**:
   - Early-maturing maize varieties
   - Drought-resistant cassava
   - Improved cowpea varieties

2. **Diversification**:
   - Grow multiple crop types
   - Mix crop varieties with different maturity dates
   - Integrate crops and livestock

3. **Adjusted planting calendar**:
   - Staggered planting dates
   - Use seasonal forecasts to time planting
   - Consider dry season farming with irrigation

### Soil Management

1. **Erosion control**:
   - Contour farming on slopes
   - Vetiver grass barriers
   - Stone bunds

2. **Organic matter addition**:
   - Compost application
   - Green manures
   - Crop residue retention

## Traditional Weather Adaptation Strategies

1. **Mixed cropping systems**: Traditional polycultures that spread risk
2. **Indigenous knowledge**: Local indicators for weather prediction
3. **Seed preservation**: Maintaining diverse local varieties
4. **Spiritual practices**: Traditional ceremonies related to rainfall

## Weather Insurance and Financial Tools

1. **Index-based insurance**: Coverage based on rainfall or temperature triggers
2. **Savings groups**: Community funds for weather emergencies
3. **Flexible credit**: Loans with weather-dependent repayment terms

## Early Warning Systems

1. Register for SMS weather alerts from Ghana Meteorological Agency
2. Join farmer groups that share weather information
3. Listen to radio programs with seasonal forecasts

## Contact for Support

For climate-smart farming assistance, contact your district agricultural development unit or the Climate Change Agriculture and Food Security (CCAFS) program.`,
    },
    {
      id: '5',
      title: 'Accessing Agricultural Markets in Ghana',
      category: 'market',
      summary: 'Strategies for small-scale farmers to improve market access and get better prices for their produce.',
      content: `# Accessing Agricultural Markets in Ghana

Successful farming isn't just about production—it's also about effectively marketing your produce. This guide provides strategies for Ghanaian farmers to improve market access and profitability.

## Understanding Market Types

### Local Markets
- **Village markets**: Weekly markets in rural communities
- **District markets**: Larger markets in district capitals
- **Urban markets**: Major city markets like Makola (Accra) or Kejetia (Kumasi)

### Institutional Buyers
- Schools (School Feeding Program)
- Hospitals
- Hotels and restaurants
- Processing companies

### Export Markets
- Regional markets (ECOWAS countries)
- International markets (EU, US, Asia)

## Market Requirements

### Quality Standards
1. **Size and appearance**: Uniform, undamaged produce
2. **Maturity**: Properly ripened but firm
3. **Cleanliness**: Free from dirt, pests, and chemical residues
4. **Packaging**: Appropriate containers that prevent damage

### Quantity Requirements
1. **Consistency**: Regular supply throughout the season
2. **Volume**: Minimum quantities for different buyers
3. **Timing**: Delivery according to agreed schedules

### Documentation (especially for export)
1. **Food safety certification**: GlobalGAP, Organic, Fair Trade
2. **Business registration**: Legal entity status
3. **Tax identification**: TIN number

## Market Information Sources

1. **Mobile services**:
   - Esoko market information
   - Farmerline Mergdata
   - mFarms platform

2. **Radio programs**:
   - Farm Radio programs with market prices
   - Agricultural extension broadcasts

3. **Government sources**:
   - Ministry of Food and Agriculture market bulletins
   - Ghana Export Promotion Authority

4. **Farmer organizations**:
   - FBO market information sharing
   - Cooperative market intelligence

## Improving Market Access

### Group Marketing
1. **Form or join farmer groups**:
   - Pool produce to meet volume requirements
   - Share transportation costs
   - Increase bargaining power

2. **Establish collection centers**:
   - Central locations for aggregation
   - Quality checking and sorting
   - Buyer meeting points

### Value Addition
1. **Simple processing**:
   - Drying (solar driers for fruits and vegetables)
   - Milling (grains into flour)
   - Packaging (smaller consumer units)

2. **Storage**:
   - Improved storage facilities (PICS bags, silos)
   - Cold storage for perishables
   - Warehouse receipt systems

### Direct Marketing
1. **Farm gate sales**:
   - Roadside stands
   - Pick-your-own operations
   - Farm shops

2. **Urban direct marketing**:
   - Farmers' markets
   - Home delivery services
   - Social media marketing

### Contract Farming
1. **Outgrower schemes**:
   - Production contracts with processors
   - Input provision and technical support
   - Guaranteed markets

2. **Forward contracts**:
   - Pre-arranged sales agreements
   - Fixed or formula pricing
   - Delivery schedules

## Digital Marketing Tools

1. **WhatsApp business groups**:
   - Create farmer-buyer networks
   - Share product availability
   - Negotiate prices

2. **Facebook marketplace**:
   - List products with photos
   - Reach urban consumers
   - Build a farm brand

3. **E-commerce platforms**:
   - Agrocenta
   - Trotro Tractor
   - AgroCenta

## Transportation Solutions

1. **Shared transport**:
   - Group hiring of vehicles
   - Coordinated delivery schedules

2. **Mobile apps**:
   - Truck hiring platforms
   - Logistics coordination services

3. **Improved packaging**:
   - Stackable crates
   - Cushioning materials
   - Ventilated containers

## Financial Services for Marketing

1. **Inventory credit**:
   - Loans using stored produce as collateral
   - Allows waiting for better prices

2. **Mobile money**:
   - Secure payment methods
   - Reduced cash handling risks

3. **Savings for marketing**:
   - Village Savings and Loans Associations
   - Marketing funds

## Contact for Support

For market access assistance, contact your district agricultural marketing officer or the Ghana Export Promotion Authority.`,
    },
  ];

  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-primary mb-2">Agricultural Knowledge Base</h1>
        <p className="text-gray-600 mb-6">
          Access practical farming information tailored for Ghanaian agriculture.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with filters */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Search & Filter</h2>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <h3 className="text-md font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-2 py-1 rounded ${selectedCategory === category.id ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                      >
                        {category.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full md:w-3/4">
            {selectedArticle ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="mb-4 text-primary hover:underline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to articles
                </button>
                
                <div className="prose prose-green max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: selectedArticle.content.replace(/\n/g, '<br>').replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>').replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>').replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>').replace(/^\d+\. \*\*(.+)\*\*: (.+)$/gm, '<div class="mb-2"><span class="font-semibold">$1:</span> $2</div>').replace(/^- \*\*(.+)\*\*: (.+)$/gm, '<div class="mb-2"><span class="font-semibold">$1:</span> $2</div>').replace(/^- (.+)$/gm, '<li>$1</li>').replace(/<li>(.+)<\/li>/g, (match, p1) => `<li class="ml-6">${p1}</li>') }} />
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">
                    {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-gray-500">{filteredArticles.length} articles found</p>
                </div>

                {filteredArticles.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {filteredArticles.map(article => (
                      <div 
                        key={article.id} 
                        className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <h3 className="text-lg font-semibold mb-2 text-primary">{article.title}</h3>
                        <div className="mb-3">
                          <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            {categories.find(c => c.id === article.category)?.name}
                          </span>
                        </div>
                        <p className="text-gray-600">{article.summary}</p>
                        <button className="mt-3 text-primary hover:underline text-sm font-medium">Read more →</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                    <p className="text-gray-500 mb-2">No articles found matching your criteria.</p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      className="text-primary hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}