const { v4: uuidv4 } = require('uuid');
const smsService = require('./sms-service');

// Mock database for market prices (in production, use a real database)
let marketPrices = {
  'maize': [
    { market: 'Kumasi Central Market', price: 12.50, unit: 'kg', date: new Date() },
    { market: 'Accra Agbogbloshie', price: 13.20, unit: 'kg', date: new Date() },
    { market: 'Tamale Market', price: 11.80, unit: 'kg', date: new Date() }
  ],
  'rice': [
    { market: 'Kumasi Central Market', price: 18.75, unit: 'kg', date: new Date() },
    { market: 'Accra Agbogbloshie', price: 19.50, unit: 'kg', date: new Date() },
    { market: 'Tamale Market', price: 17.90, unit: 'kg', date: new Date() }
  ],
  'tomato': [
    { market: 'Kumasi Central Market', price: 8.25, unit: 'kg', date: new Date() },
    { market: 'Accra Agbogbloshie', price: 9.10, unit: 'kg', date: new Date() },
    { market: 'Tamale Market', price: 7.80, unit: 'kg', date: new Date() }
  ],
  'cassava': [
    { market: 'Kumasi Central Market', price: 5.50, unit: 'kg', date: new Date() },
    { market: 'Accra Agbogbloshie', price: 6.20, unit: 'kg', date: new Date() },
    { market: 'Tamale Market', price: 5.10, unit: 'kg', date: new Date() }
  ],
  'plantain': [
    { market: 'Kumasi Central Market', price: 7.75, unit: 'kg', date: new Date() },
    { market: 'Accra Agbogbloshie', price: 8.30, unit: 'kg', date: new Date() },
    { market: 'Tamale Market', price: 7.25, unit: 'kg', date: new Date() }
  ]
};

// Mock database for user subscriptions (in production, use a real database)
let priceAlertSubscriptions = [
  {
    id: uuidv4(),
    userId: 'user1',
    phone: '+233201234567',
    crops: ['maize', 'rice'],
    markets: ['Kumasi Central Market', 'Accra Agbogbloshie'],
    frequency: 'daily',
    lastSent: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    id: uuidv4(),
    userId: 'user2',
    phone: '+233207654321',
    crops: ['tomato', 'cassava'],
    markets: ['Tamale Market'],
    frequency: 'weekly',
    lastSent: new Date(Date.now() - 604800000) // 1 week ago
  }
];

// Mock database for buyer-seller matches (in production, use a real database)
let buyerSellerMatches = [
  {
    id: uuidv4(),
    sellerId: 'user1',
    sellerName: 'Kwame Mensah',
    sellerPhone: '+233201234567',
    crop: 'maize',
    quantity: 500,
    unit: 'kg',
    price: 12.00,
    location: 'Kumasi',
    expiryDate: new Date(Date.now() + 604800000), // 1 week from now
    status: 'active',
    matches: [
      {
        buyerId: 'buyer1',
        buyerName: 'Agro Processors Ltd',
        buyerPhone: '+233209876543',
        proposedPrice: 11.80,
        status: 'pending'
      }
    ]
  },
  {
    id: uuidv4(),
    sellerId: 'user2',
    sellerName: 'Ama Owusu',
    sellerPhone: '+233207654321',
    crop: 'tomato',
    quantity: 200,
    unit: 'kg',
    price: 8.50,
    location: 'Tamale',
    expiryDate: new Date(Date.now() + 259200000), // 3 days from now
    status: 'active',
    matches: []
  }
];

/**
 * Get current market prices for a specific crop
 * @param {string} cropName - Name of the crop
 * @returns {Array} Array of market prices for the crop
 */
function getMarketPrices(cropName) {
  return marketPrices[cropName] || [];
}

/**
 * Get all available crops with price data
 * @returns {Array} Array of crop names
 */
function getAvailableCrops() {
  return Object.keys(marketPrices);
}

/**
 * Get all available markets
 * @returns {Array} Array of market names
 */
function getAvailableMarkets() {
  const markets = new Set();
  
  Object.values(marketPrices).forEach(cropMarkets => {
    cropMarkets.forEach(market => {
      markets.add(market.market);
    });
  });
  
  return Array.from(markets);
}

/**
 * Subscribe a user to price alerts
 * @param {Object} subscription - Subscription details
 * @returns {Object} Created subscription
 */
function subscribeToAlerts(subscription) {
  const { userId, phone, crops, markets, frequency } = subscription;
  
  // Validate required fields
  if (!userId || !phone || !crops || !markets || !frequency) {
    throw new Error('Missing required fields');
  }
  
  // Create new subscription
  const newSubscription = {
    id: uuidv4(),
    userId,
    phone,
    crops,
    markets,
    frequency,
    lastSent: new Date()
  };
  
  // Add to subscriptions array (in production, save to database)
  priceAlertSubscriptions.push(newSubscription);
  
  return newSubscription;
}

/**
 * Unsubscribe a user from price alerts
 * @param {string} subscriptionId - ID of the subscription to remove
 * @returns {boolean} Success status
 */
function unsubscribeFromAlerts(subscriptionId) {
  const initialLength = priceAlertSubscriptions.length;
  
  priceAlertSubscriptions = priceAlertSubscriptions.filter(
    sub => sub.id !== subscriptionId
  );
  
  return priceAlertSubscriptions.length < initialLength;
}

/**
 * Get user's price alert subscriptions
 * @param {string} userId - User ID
 * @returns {Array} User's subscriptions
 */
function getUserSubscriptions(userId) {
  return priceAlertSubscriptions.filter(sub => sub.userId === userId);
}

/**
 * Create a new seller listing
 * @param {Object} listing - Seller listing details
 * @returns {Object} Created listing
 */
function createSellerListing(listing) {
  const { sellerId, sellerName, sellerPhone, crop, quantity, unit, price, location } = listing;
  
  // Validate required fields
  if (!sellerId || !sellerName || !sellerPhone || !crop || !quantity || !unit || !price || !location) {
    throw new Error('Missing required fields');
  }
  
  // Create new listing
  const newListing = {
    id: uuidv4(),
    sellerId,
    sellerName,
    sellerPhone,
    crop,
    quantity,
    unit,
    price,
    location,
    expiryDate: new Date(Date.now() + 604800000), // 1 week from now
    status: 'active',
    matches: []
  };
  
  // Add to listings array (in production, save to database)
  buyerSellerMatches.push(newListing);
  
  return newListing;
}

/**
 * Get active seller listings
 * @param {Object} filters - Optional filters (crop, location)
 * @returns {Array} Filtered listings
 */
function getSellerListings(filters = {}) {
  let listings = buyerSellerMatches.filter(listing => listing.status === 'active');
  
  // Apply filters
  if (filters.crop) {
    listings = listings.filter(listing => listing.crop === filters.crop);
  }
  
  if (filters.location) {
    listings = listings.filter(listing => listing.location === filters.location);
  }
  
  return listings;
}

/**
 * Express interest in a seller listing (buyer)
 * @param {string} listingId - Listing ID
 * @param {Object} buyerInfo - Buyer information
 * @returns {Object} Updated listing
 */
function expressInterest(listingId, buyerInfo) {
  const { buyerId, buyerName, buyerPhone, proposedPrice } = buyerInfo;
  
  // Validate required fields
  if (!buyerId || !buyerName || !buyerPhone) {
    throw new Error('Missing required buyer information');
  }
  
  // Find the listing
  const listing = buyerSellerMatches.find(l => l.id === listingId);
  
  if (!listing) {
    throw new Error('Listing not found');
  }
  
  // Check if buyer already expressed interest
  const existingMatch = listing.matches.find(m => m.buyerId === buyerId);
  
  if (existingMatch) {
    // Update existing match
    existingMatch.proposedPrice = proposedPrice;
    existingMatch.status = 'pending';
  } else {
    // Add new match
    listing.matches.push({
      buyerId,
      buyerName,
      buyerPhone,
      proposedPrice,
      status: 'pending'
    });
  }
  
  // Notify seller via SMS
  smsService.sendSMS(
    listing.sellerPhone,
    `A buyer (${buyerName}) is interested in your ${listing.crop} listing. Proposed price: GHS ${proposedPrice || listing.price} per ${listing.unit}. Contact: ${buyerPhone}`
  );
  
  return listing;
}

/**
 * Send price alerts to subscribed users
 * @returns {number} Number of alerts sent
 */
async function sendPriceAlerts() {
  let alertsSent = 0;
  const now = new Date();
  
  for (const subscription of priceAlertSubscriptions) {
    let shouldSend = false;
    
    // Check if it's time to send based on frequency
    if (subscription.frequency === 'daily') {
      const daysSinceLastSent = Math.floor((now - subscription.lastSent) / (1000 * 60 * 60 * 24));
      shouldSend = daysSinceLastSent >= 1;
    } else if (subscription.frequency === 'weekly') {
      const daysSinceLastSent = Math.floor((now - subscription.lastSent) / (1000 * 60 * 60 * 24));
      shouldSend = daysSinceLastSent >= 7;
    }
    
    if (shouldSend) {
      // Prepare price alert message
      let message = 'SmartFarmGH Market Price Alert:\n\n';
      
      for (const crop of subscription.crops) {
        message += `${crop.toUpperCase()}:\n`;
        
        const prices = getMarketPrices(crop);
        const filteredPrices = prices.filter(p => subscription.markets.includes(p.market));
        
        for (const price of filteredPrices) {
          message += `- ${price.market}: GHS ${price.price.toFixed(2)}/${price.unit}\n`;
        }
        
        message += '\n';
      }
      
      // Send SMS
      await smsService.sendSMS(subscription.phone, message);
      
      // Update last sent date
      subscription.lastSent = now;
      alertsSent++;
    }
  }
  
  return alertsSent;
}

/**
 * Schedule daily price alert job
 */
function schedulePriceAlerts() {
  // Run once a day at 8:00 AM
  const runTime = new Date();
  runTime.setHours(8, 0, 0, 0);
  
  let timeUntilRun = runTime - new Date();
  if (timeUntilRun < 0) {
    // If it's already past 8:00 AM, schedule for tomorrow
    timeUntilRun += 24 * 60 * 60 * 1000;
  }
  
  // Schedule first run
  setTimeout(() => {
    sendPriceAlerts();
    
    // Then schedule to run daily
    setInterval(sendPriceAlerts, 24 * 60 * 60 * 1000);
  }, timeUntilRun);
  
  console.log(`Price alerts scheduled to run at 8:00 AM daily (first run in ${Math.floor(timeUntilRun / (1000 * 60 * 60))} hours)`);
}

/**
 * Update market prices (for admin use)
 * @param {string} crop - Crop name
 * @param {string} market - Market name
 * @param {number} price - New price
 * @returns {boolean} Success status
 */
function updateMarketPrice(crop, market, price) {
  if (!marketPrices[crop]) {
    return false;
  }
  
  const marketIndex = marketPrices[crop].findIndex(m => m.market === market);
  
  if (marketIndex === -1) {
    // Add new market
    marketPrices[crop].push({
      market,
      price,
      unit: marketPrices[crop][0].unit, // Use same unit as other markets for this crop
      date: new Date()
    });
  } else {
    // Update existing market
    marketPrices[crop][marketIndex].price = price;
    marketPrices[crop][marketIndex].date = new Date();
  }
  
  return true;
}

// Initialize the service
function initMarketPriceService() {
  // Schedule price alerts
  schedulePriceAlerts();
  
  console.log('Market price service initialized');
}

module.exports = {
  initMarketPriceService,
  getMarketPrices,
  getAvailableCrops,
  getAvailableMarkets,
  subscribeToAlerts,
  unsubscribeFromAlerts,
  getUserSubscriptions,
  createSellerListing,
  getSellerListings,
  expressInterest,
  sendPriceAlerts,
  updateMarketPrice
};