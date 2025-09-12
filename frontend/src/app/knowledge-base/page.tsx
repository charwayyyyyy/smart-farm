'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { FaSearch, FaFilter, FaArrowLeft } from 'react-icons/fa';

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
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'crops', name: 'Crop Management' },
    { id: 'livestock', name: 'Livestock Care' },
    { id: 'weather', name: 'Weather & Climate' },
    { id: 'tech', name: 'Farm Technology' },
    { id: 'market', name: 'Market Insights' },
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Best Practices for Maize Cultivation in Ghana',
      category: 'crops',
      summary: 'Learn about the optimal planting times, soil preparation, and care techniques for maize in different regions of Ghana.',
      content: `# Best Practices for Maize Cultivation in Ghana

Maize is one of Ghana's most important staple crops. This guide provides region-specific advice for maximizing your maize yields.

## Optimal Planting Times

### Southern Ghana
- Plant during the major rainy season (March-July)
- For a second crop, plant during the minor rainy season (September-November)

### Northern Ghana
- Plant at the onset of the rainy season (May-June)
- Early maturing varieties are recommended for areas with shorter rainy seasons

## Soil Preparation

1. Clear the land of weeds and debris
2. Plow to a depth of 20-30 cm
3. Apply organic matter (compost or well-rotted manure) at 2-3 tons per hectare
4. For acidic soils (common in high rainfall areas), apply lime at 1-2 tons per hectare

## Seed Selection

### Recommended Varieties for Ghana
- Obatanpa (120 days, high yield, resistant to streak virus)
- Mamaba (105-110 days, drought tolerant)
- Aburohemaa (90 days, early maturing)
- Okomasa (105 days, good for both human and animal consumption)

Choose varieties based on your region's rainfall pattern and the purpose of production.

## Planting Techniques

1. Plant in rows 75 cm apart
2. Space plants 40 cm within rows
3. Plant 2-3 seeds per hole at a depth of 3-5 cm
4. Thin to 1-2 plants per hole after emergence

## Fertilizer Application

### Basal Application (at planting)
- NPK 15-15-15: 250 kg/ha

### Top Dressing (3-4 weeks after emergence)
- Urea or Ammonium Sulfate: 125 kg/ha

Adjust based on soil test results if available.

## Weed Management

1. First weeding: 2-3 weeks after emergence
2. Second weeding: 5-6 weeks after emergence
3. Consider herbicides for large-scale farming:
   - Pre-emergence: Atrazine
   - Post-emergence: Nicosulfuron

## Pest and Disease Management

### Common Pests
- Fall Armyworm: Scout regularly, apply approved insecticides when infestation exceeds 20%
- Stem Borers: Practice crop rotation, early planting, and apply appropriate insecticides

### Common Diseases
- Maize Streak Virus: Use resistant varieties, control leafhoppers
- Leaf Blight: Crop rotation, fungicide application when necessary

## Harvesting

1. Harvest when the husks turn brown and dry
2. For storage, ensure moisture content is below 13%
3. Dry thoroughly on clean surfaces

## Storage

1. Use clean, dry containers or silos
2. Apply appropriate storage pesticides to prevent weevil infestation
3. Store in cool, dry places

By following these guidelines and adapting them to your specific local conditions, you can significantly improve your maize yields and quality.`
    },
    {
      id: '2',
      title: 'Sustainable Cocoa Farming Techniques',
      category: 'crops',
      summary: 'Discover sustainable methods for cocoa cultivation that increase yields while protecting the environment.',
      content: `# Sustainable Cocoa Farming Techniques

Cocoa is a vital cash crop for many Ghanaian farmers. This guide outlines sustainable practices that can improve your yields while protecting the environment.

## Establishing a New Cocoa Farm

### Site Selection
- Choose areas with annual rainfall of 1,500-2,000 mm
- Soil should be deep, well-drained, and rich in organic matter
- Avoid waterlogged areas and steep slopes

### Land Preparation
1. Clear undergrowth while maintaining some forest trees for shade
2. Maintain 40-50% shade for young cocoa
3. Avoid complete deforestation to preserve biodiversity

## Planting Material

### Recommended Varieties
- Hybrid varieties from Cocoa Research Institute of Ghana (CRIG)
- Look for varieties with:
  - High yield potential
  - Disease resistance (especially black pod and swollen shoot)
  - Early bearing (2-3 years)

### Nursery Practices
1. Use fresh, healthy pods from approved sources
2. Plant seeds in polybags filled with topsoil mixed with organic matter
3. Provide partial shade for nurseries
4. Water regularly but avoid waterlogging

## Field Planting

1. Plant at the beginning of the rainy season
2. Space plants 3m x 3m (approximately 1,111 plants per hectare)
3. Dig planting holes 40cm x 40cm x 40cm
4. Add organic matter to planting holes
5. Provide temporary shade using plantain or banana

## Sustainable Soil Management

### Organic Matter Management
- Apply compost or well-rotted manure annually
- Practice mulching to conserve moisture and suppress weeds
- Maintain leaf litter on the farm floor

### Cover Cropping
- Plant leguminous cover crops between young cocoa
- Recommended species: Calopogonium, Centrosema, Pueraria

### Fertilizer Application
- Apply based on soil test results when possible
- Standard recommendation: 370 kg/ha of cocoa-specific fertilizer
- Split application twice per year

## Integrated Pest Management

### Cultural Practices
1. Regular pruning to improve air circulation
2. Remove diseased pods and plant material
3. Maintain farm sanitation

### Biological Control
- Encourage natural enemies of cocoa pests
- Maintain biodiversity on the farm

### Chemical Control (as last resort)
- Use only approved pesticides
- Follow recommended dosages and safety precautions
- Observe pre-harvest intervals

## Shade Management

### Benefits of Proper Shade
- Reduces heat stress on cocoa trees
- Creates microclimate favorable for cocoa growth
- Provides additional income (timber, fruits)
- Enhances biodiversity

### Recommended Shade Trees
- Timber species: Terminalia, Albizia, Milicia
- Fruit trees: Avocado, Mango, Citrus

## Harvesting and Post-Harvest Handling

1. Harvest only fully ripe pods (yellow or orange color)
2. Use sharp tools to avoid damaging the tree
3. Break pods carefully to avoid damaging beans
4. Ferment beans for 5-7 days, turning regularly
5. Dry beans in the sun on raised platforms until moisture content reaches 7-8%

## Certification Opportunities

Consider joining certification programs such as:
- Rainforest Alliance
- UTZ Certified
- Fairtrade

These can provide access to premium markets and better prices for your cocoa.

By implementing these sustainable practices, you can improve your cocoa yields and quality while contributing to environmental conservation and securing the future of cocoa farming in Ghana.`
    },
    {
      id: '3',
      title: 'Effective Poultry Management for Small-Scale Farmers',
      category: 'livestock',
      summary: 'A comprehensive guide to raising healthy and productive poultry on a small-scale farm in Ghana.',
      content: `# Effective Poultry Management for Small-Scale Farmers

Poultry farming offers one of the quickest returns on investment in livestock farming. This guide provides practical advice for small-scale poultry farmers in Ghana.

## Getting Started

### Choosing the Right Poultry Type
- Layers: For egg production (18-24 months productive life)
- Broilers: For meat production (6-8 weeks to market weight)
- Dual-purpose breeds: For both eggs and meat
- Local breeds: More disease resistant but lower production

### Housing Requirements

1. Location: Well-drained area, away from residential zones
2. Space requirements:
   - Layers: 4-5 birds per square meter
   - Broilers: 8-10 birds per square meter
3. Ventilation: Adequate airflow without direct drafts
4. Protection: Secure from predators and wild birds

## Housing Designs

### Deep Litter System
- Floor covered with 5-10 cm of absorbent material (wood shavings, rice husks)
- Benefits: Good insulation, converts droppings to compost
- Management: Replace wet litter, turn regularly

### Battery Cage System
- Wire cages arranged in tiers
- Benefits: Higher stocking density, cleaner eggs, easier management
- Considerations: Higher initial cost, welfare concerns

## Feeding Management

### Nutritional Requirements

#### Layers
- Chick starter: 0-8 weeks (20-22% protein)
- Grower mash: 9-20 weeks (16-18% protein)
- Layer mash: 21+ weeks (16-18% protein with 3.5-4% calcium)

#### Broilers
- Starter: 0-3 weeks (22-24% protein)
- Finisher: 4+ weeks (20-22% protein)

### Water Requirements
- Clean, fresh water available at all times
- Water consumption approximately doubles feed consumption

## Health Management

### Vaccination Schedule

1. Day 1: Marek's disease (hatchery)
2. Day 7: Newcastle disease (eye drop/drinking water)
3. Day 14: Gumboro disease (drinking water)
4. Day 21: Newcastle disease booster
5. Week 8: Fowl pox (wing web)
6. Week 16: Newcastle disease + Infectious bronchitis

Adjust based on local disease prevalence and veterinary advice.

### Biosecurity Measures

1. Restrict visitor access to poultry houses
2. Use footbaths with disinfectant at entrances
3. Change clothes and footwear before entering poultry areas
4. Quarantine new birds for 2-3 weeks
5. Proper disposal of dead birds (burial or incineration)

## Production Management

### Layers
- Begin laying at 18-22 weeks of age
- Peak production at 30-35 weeks
- Expect 250-300 eggs per hen in the first year
- Provide 16 hours of light for optimal production

### Broilers
- Reach 1.8-2.5 kg in 6-8 weeks
- Monitor weight weekly
- Adjust feed and environment to optimize growth

## Record Keeping

Maintain daily records of:
1. Feed consumption
2. Water consumption
3. Egg production/collection
4. Mortality
5. Medications and vaccinations
6. Temperature and humidity

## Marketing Strategies

### Eggs
- Grade by size and quality
- Develop relationships with local retailers
- Consider direct marketing to consumers
- Explore hotel and restaurant supply

### Meat Birds
- Develop relationships with processors
- Consider on-farm processing for direct sales
- Target special occasions (holidays, festivals)

## Common Challenges and Solutions

### Disease Outbreaks
- Prevention through biosecurity and vaccination
- Early detection through daily observation
- Prompt treatment under veterinary guidance

### Predators
- Secure housing with proper fencing
- Night lighting to deter nocturnal predators
- Regular inspection of enclosures for breaches

### Market Fluctuations
- Diversify customer base
- Consider value-added products
- Form or join producer cooperatives

By implementing these management practices, small-scale poultry farmers in Ghana can improve productivity, reduce losses, and increase profitability.`
    },
    {
      id: '4',
      title: 'Weather Adaptation Strategies for Ghanaian Farmers',
      category: 'weather',
      summary: 'Practical approaches to adapt farming practices to Ghana\'s changing climate patterns.',
      content: `# Weather Adaptation Strategies for Ghanaian Farmers

Changing weather patterns are affecting farming across Ghana. This guide provides practical strategies to adapt your farming practices to these changes.

## Understanding Ghana's Climate Zones

Ghana has several distinct climate zones, each experiencing different changes:

1. **Coastal Zone**: Experiencing more erratic rainfall and sea level rise
2. **Forest Zone**: Seeing shifts in rainfall patterns and shorter dry seasons
3. **Transition Zone**: Facing increased variability in onset of rains
4. **Northern Savannah**: Dealing with longer dry spells and more intense rainfall events

## Changing Weather Patterns

### Rainfall Changes
- Later onset of rainy seasons
- More frequent dry spells during growing seasons
- Higher intensity rainfall events causing flooding
- Earlier cessation of rains in many areas

### Temperature Changes
- Increasing average temperatures
- More frequent extreme heat days
- Higher evaporation rates
- Longer and more severe dry seasons

## Weather Monitoring Tools for Farmers

### Traditional Knowledge
- Observe natural indicators (bird migrations, flowering patterns)
- Document and share local weather patterns

### Modern Tools
- Weather apps: Esoko, Farmerline, Ignitia
- Join farmer WhatsApp groups for weather alerts
- Radio weather forecasts
- Ghana Meteorological Agency SMS services

## Climate-Smart Farming Practices

### Water Management

#### Water Conservation
1. Construct water harvesting structures (ponds, dams)
2. Use mulching to reduce evaporation
3. Implement contour bunding on sloped land
4. Adopt micro-irrigation techniques where possible

#### Flood Management
1. Create drainage channels around fields
2. Plant cover crops to improve soil structure
3. Construct raised beds for flood-prone areas
4. Plant trees to reduce runoff

### Crop Selection and Management

#### Drought-Tolerant Varieties
- Maize: Obatanpa, Aburohemaa
- Rice: AGRA Rice, Jasmine 85
- Cassava: Ampong, Sika bankye
- Cowpea: Songotra, Padi-tuya

#### Diversification
1. Intercropping compatible crops
2. Rotating crops to spread risk
3. Integrating tree crops for additional income
4. Mixed farming (crops and livestock)

#### Adjusted Planting Calendars
1. Staggered planting dates
2. Use of early maturing varieties
3. Relay cropping to maximize growing season

### Soil Management

#### Erosion Control
1. Contour plowing
2. Terracing on steep slopes
3. Planting vegetation barriers
4. Minimum tillage practices

#### Soil Health Improvement
1. Incorporate organic matter
2. Practice crop rotation
3. Use green manures and cover crops
4. Apply compost and manure

## Insurance and Financial Protection

### Weather Index Insurance
- Programs available through GAIP (Ghana Agricultural Insurance Pool)
- Coverage for drought, excess rainfall, and other weather events
- Often bundled with input purchases

### Savings and Credit Groups
- Village Savings and Loans Associations
- Farmer-based organizations
- Mobile money savings platforms

## Community-Based Adaptation

### Knowledge Sharing
1. Farmer field schools
2. Community early warning systems
3. Demonstration farms

### Resource Pooling
1. Shared irrigation systems
2. Community seed banks
3. Group purchasing of inputs
4. Collective marketing

## Government and NGO Support Programs

### Available Resources
- Ministry of Food and Agriculture extension services
- Planting for Food and Jobs program
- One Village One Dam initiative
- NGO climate adaptation projects

### How to Access
1. Register with local agricultural office
2. Join farmer-based organizations
3. Participate in community meetings
4. Monitor radio announcements

By implementing these adaptation strategies, Ghanaian farmers can build resilience to changing weather patterns and maintain productive farming operations despite climate challenges.`
    },
    {
      id: '5',
      title: 'Smart Irrigation Systems for Small-Scale Farms',
      category: 'tech',
      summary: 'Affordable and efficient irrigation technologies that can help small-scale farmers optimize water usage.',
      content: `# Smart Irrigation Systems for Small-Scale Farms

Efficient irrigation is becoming increasingly important as rainfall patterns change and water resources become scarcer. This guide explores affordable smart irrigation options for small-scale farmers in Ghana.

## Benefits of Smart Irrigation

1. Water conservation (30-50% reduction compared to traditional methods)
2. Reduced labor requirements
3. Improved crop yields and quality
4. Decreased fertilizer leaching
5. Lower energy costs for pumping

## Assessing Your Water Resources

### Water Source Evaluation
- Surface water (rivers, lakes, dams)
- Groundwater (wells, boreholes)
- Harvested rainwater
- Municipal water (where available)

### Water Quality Considerations
1. Salinity levels
2. Sediment content
3. Biological contaminants
4. Chemical pollutants

## Low-Cost Smart Irrigation Options

### Drip Irrigation Systems

#### Components
- Header tank or water source
- Main line and sub-main pipes
- Drip laterals with emitters
- Filters and pressure regulators

#### Implementation
1. Basic gravity-fed systems cost GHS 2,000-5,000 per acre
2. Can be installed incrementally to spread costs
3. Locally available materials can reduce costs

### Affordable Soil Moisture Sensors

#### Types
- Gypsum blocks (GHS 50-150 each)
- Tensiometers (GHS 200-500 each)
- Low-cost electronic sensors (GHS 100-300)

#### Usage
1. Place at different depths in root zone
2. Check readings before irrigation
3. Develop irrigation schedule based on readings

### Solar-Powered Pumping Systems

#### Components
- Solar panels (200-500W)
- DC pump or AC pump with inverter
- Controller and mounting structure
- Storage tank for buffer

#### Costs and Benefits
1. Initial investment: GHS 3,000-10,000
2. No ongoing fuel costs
3. Low maintenance requirements
4. 5-10 year lifespan for quality systems

## Mobile Phone Integration

### SMS-Based Systems

1. Weather forecast integration
2. Irrigation scheduling reminders
3. Simple on/off control via SMS

### Smartphone Applications

1. Farmerline and Esoko platforms
2. Irrigation calculators
3. Crop water requirement estimators

## DIY Smart Irrigation Controllers

### Timer-Based Systems

1. Simple mechanical timers (GHS 50-200)
2. Digital timers with multiple programs (GHS 200-500)
3. Integration with solenoid valves for zone control

### Arduino-Based Controllers

1. Basic components needed:
   - Arduino board (GHS 100-200)
   - Relay modules (GHS 50-100)
   - Soil moisture sensors (GHS 50-150)
   - Plastic enclosure and wiring

2. Free open-source code available online
3. Can be expanded with additional sensors

## Implementation Steps

### Planning Your System

1. Map your farm and identify irrigation zones
2. Calculate water requirements for each crop
3. Assess available water pressure and flow rate
4. Design system layout with expansion in mind

### Phased Implementation

1. Start with high-value crops
2. Begin with basic drip system
3. Add sensors and automation incrementally
4. Expand to additional areas as budget allows

### Maintenance Requirements

1. Regular filter cleaning (daily to weekly)
2. System flushing (monthly)
3. Emitter inspection and cleaning (monthly)
4. Sensor calibration (seasonally)

## Funding and Support Options

### Microfinance and Loans
- Agricultural Development Bank programs
- Microfinance institutions with agricultural focus
- MASLOC small business loans

### Group Purchasing
- Farmer-based organizations
- Cooperative buying to reduce costs
- Shared systems for neighboring small farms

### NGO and Government Support
- Ministry of Food and Agriculture programs
- One Village One Dam initiative resources
- NGO agricultural technology projects

## Case Studies: Success Stories in Ghana

### Vegetable Farmers in Ada
- Implemented low-cost drip systems with timer controls
- Reduced water usage by 40%
- Increased tomato yields by 30%

### Women's Cooperative in Upper East
- Shared solar pumping system serving 10 small farms
- Mobile phone controlled irrigation scheduling
- Diversified into dry season vegetable production

By implementing appropriate smart irrigation technologies, small-scale farmers in Ghana can significantly improve water use efficiency, reduce labor requirements, and increase crop productivity even with limited resources.`
    },
    {
      id: '6',
      title: 'Market Trends for Ghanaian Agricultural Products',
      category: 'market',
      summary: 'Analysis of current market trends and opportunities for various agricultural products in Ghana and export markets.',
      content: `# Market Trends for Ghanaian Agricultural Products

Understanding market trends is essential for making informed farming decisions. This guide provides insights into current and emerging markets for Ghanaian agricultural products.

## Domestic Market Overview

### Urban Consumer Trends

1. **Growing Middle Class Demand**
   - Increasing preference for quality and convenience
   - Willingness to pay premium for food safety
   - Rising demand for packaged and processed foods

2. **Changing Dietary Patterns**
   - Higher consumption of animal proteins
   - Increased demand for fruits and vegetables
   - Growing interest in organic and health foods

### Institutional Markets

1. **School Feeding Programs**
   - Government purchases for national school feeding program
   - Requirements: consistent supply, competitive pricing

2. **Hotels and Restaurants**
   - Growing tourism industry driving demand
   - Premium on quality, consistency, and food safety
   - Preference for reliable delivery schedules

3. **Supermarkets and Retail Chains**
   - Expanding presence in urban centers
   - Formal contracting opportunities
   - Strict quality and packaging standards

## High-Potential Crops and Products

### Traditional Export Crops

1. **Cocoa**
   - Premium for certified sustainable cocoa (Rainforest Alliance, Fair Trade)
   - Growing market for single-origin and specialty cocoa
   - Value addition through local processing

2. **Shea Butter**
   - Expanding cosmetic and food industry demand
   - Price premiums for organic certification
   - Direct marketing opportunities through cooperatives

### Emerging Export Opportunities

1. **Fresh Fruits and Vegetables**
   - Pineapple, mango, papaya, Asian vegetables
   - European market demand during winter months
   - Middle Eastern markets expanding

2. **Processed Foods**
   - Dried fruits and vegetables
   - Fruit juices and concentrates
   - Cassava flour and derivatives

3. **Specialty Products**
   - Moringa powder and products
   - Coconut oil and derivatives
   - Honey and bee products

## Market Access Strategies

### Collective Marketing

1. **Farmer-Based Organizations**
   - Pooling produce to meet volume requirements
   - Shared transportation and logistics
   - Collective bargaining power

2. **Aggregation Centers**
   - Collection points in major farming areas
   - Grading and sorting facilities
   - Linkages to larger buyers

### Digital Marketing Platforms

1. **Mobile Trading Applications**
   - Esoko, Farmerline, AgroCenta
   - Direct connection to buyers
   - Price information and market intelligence

2. **Social Media Marketing**
   - Facebook and WhatsApp business groups
   - Direct consumer marketing for specialty products
   - Building brand recognition

## Value Addition Opportunities

### Primary Processing

1. **Cleaning and Grading**
   - 10-15% price premium for properly sorted produce
   - Reduced rejection rates
   - Extended shelf life

2. **Drying and Preservation**
   - Solar drying technologies
   - Vacuum packing
   - Cold storage options

### Secondary Processing

1. **Small-Scale Processing Equipment**
   - Fruit juice extraction
   - Cassava processing (gari, flour)
   - Oil extraction

2. **Packaging Innovations**
   - Biodegradable packaging options
   - Branded packaging for recognition
   - Appropriate sizes for target markets

## Market Requirements and Standards

### Food Safety Certification

1. **Domestic Standards**
   - Ghana Standards Authority requirements
   - Food and Drugs Authority certification

2. **Export Standards**
   - Global G.A.P. certification
   - HACCP implementation
   - Organic certification options

### Quality Specifications

1. **Size and Appearance**
   - Grading standards for different markets
   - Consistency requirements

2. **Packaging and Labeling**
   - Traceability information
   - Nutritional labeling
   - Barcode requirements for formal retail

## Pricing Trends and Seasonality

### Price Information Sources

1. **Market Information Services**
   - Esoko market prices
   - Ministry of Food and Agriculture reports
   - Ghana Agricultural Market Information System

2. **Seasonal Price Patterns**
   - Historical price data for major commodities
   - Optimal timing for sales
   - Storage opportunities for price advantages

## Export Market Navigation

### Documentation Requirements

1. **Essential Certificates**
   - Phytosanitary certificates
   - Certificate of origin
   - Health certificates for animal products

2. **Export Procedures**
   - Ghana Export Promotion Authority registration
   - Customs declaration process
   - Inspection requirements

### Logistics Considerations

1. **Transportation Options**
   - Air freight for high-value perishables
   - Sea freight for non-perishables and bulk items
   - Consolidated shipments for small volumes

2. **Cold Chain Management**
   - Available facilities in major cities
   - Temperature monitoring requirements
   - Packaging for temperature control

## Financing and Payment Security

1. **Payment Terms**
   - Common arrangements (advance, partial, letter of credit)
   - Mitigating non-payment risks

2. **Trade Finance Options**
   - Export financing programs
   - Warehouse receipt systems
   - Contract farming arrangements

By understanding these market trends and requirements, Ghanaian farmers and agribusinesses can better position themselves to take advantage of emerging opportunities and secure better prices for their products.`
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-primary text-white">
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
            <p className="mt-2">Access farming guides, best practices, and research to improve your agricultural practices</p>
          </div>
          
          {selectedArticle ? (
            <div className="p-6">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="flex items-center text-primary hover:underline mb-6"
              >
                <FaArrowLeft className="mr-2" /> Back to articles
              </button>
              
              <div className="prose prose-primary max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: selectedArticle.content
                    .replace(/^# .+$/m, '')
                    .split('\n')
                    .map(line => {
                      if (line.startsWith('## ')) {
                        return `<h2>${line.substring(3)}</h2>`;
                      } else if (line.startsWith('### ')) {
                        return `<h3>${line.substring(4)}</h3>`;
                      } else if (line.startsWith('- ')) {
                        return `<li>${line.substring(2)}</li>`;
                      } else if (line.match(/^\d+\.\s/)) {
                        return `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
                      } else if (line === '') {
                        return '<br/>';
                      } else {
                        return `<p>${line}</p>`;
                      }
                    }).join('')
                }} />
              </div>
            </div>
          ) : (
            <>
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <FaFilter className="mr-2" />
                      Filter
                    </button>
                    {showFilters && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                        {categories.map(category => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setShowFilters(false);
                            }}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedCategory === category.id ? 'bg-primary text-white hover:bg-primary-dark' : ''}`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {selectedCategory !== 'all' && (
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Filtered by:</span>
                    <span className="px-2 py-1 bg-primary text-white text-sm rounded-full flex items-center">
                      {categories.find(c => c.id === selectedCategory)?.name}
                      <button 
                        onClick={() => setSelectedCategory('all')} 
                        className="ml-2 focus:outline-none"
                      >
                        &times;
                      </button>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map(article => (
                      <div 
                        key={article.id} 
                        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div className="p-6">
                          <div className="flex items-center mb-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${article.category === 'crops' ? 'bg-green-100 text-green-800' : article.category === 'livestock' ? 'bg-blue-100 text-blue-800' : article.category === 'weather' ? 'bg-yellow-100 text-yellow-800' : article.category === 'tech' ? 'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800'}`}>
                              {categories.find(c => c.id === article.category)?.name}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                          <p className="text-gray-600 text-sm">{article.summary}</p>
                          <div className="mt-4 text-primary hover:underline text-sm font-medium">Read more</div>
                        </div>
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
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
