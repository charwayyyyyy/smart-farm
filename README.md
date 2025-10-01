# SmartFarmGH - AI-Powered Farmer Education Platform

SmartFarmGH is a comprehensive platform designed to empower Ghanaian farmers with agricultural knowledge, timely reminders, and expert advice through an AI-powered chatbot and SMS-based cropping calendar system.

## Features

### AI-Powered Chatbot
- Farm-themed conversational assistant providing personalized farming advice
- Answers questions about crop management, pest control, and best practices
- Tailored recommendations based on Ghanaian agricultural conditions

### SMS-Based Cropping Calendar
- Timely agricultural reminders via SMS
- Customized schedules based on crop type, planting date, and location
- Notifications for planting, watering, fertilizing, and harvesting

### Knowledge Base
- Comprehensive library of farming information
- Articles on crop management, soil health, pest control, weather adaptation, and market access
- Content specifically tailored for Ghanaian agriculture

### Web Dashboard
- Responsive interface for managing crops and preferences
- User authentication system for personalized experience
- Mobile-friendly design for access from any device

## Technology Stack

### Frontend
- Next.js with Tailwind CSS
- Responsive design with custom Ghanaian farm theme
- Component-based architecture

### Backend
- Node.js (Express)
- RESTful API design
- JWT authentication

### Database
- MongoDB for data storage
- Pinecone for vector embeddings (AI features)

### AI Services
- OpenAI GPT-4-Turbo for intelligent responses
- Whisper for voice capabilities
- Text Embeddings for semantic search

### SMS Gateway
- Twilio for SMS delivery and management

## Docker Setup

The application is containerized using Docker for easy deployment and consistent environments.

### Prerequisites

- Docker and Docker Compose installed on your system
- Git for cloning the repository

### Running with Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-farm.git
   cd smart-farm
   ```

2. Start the application:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

4. Stop the application:
   ```bash
   docker-compose down
   ```

### Docker Container Structure

- **Frontend Container**: Next.js application running on Node.js
- **Backend Container**: Express API server

### Environment Variables

Create `.env` files in both frontend and backend directories with appropriate values before building the Docker images.

#### Backend Environment Variables
```
PORT=5000
NODE_ENV=production
JWT_SECRET=your_jwt_secret
# Add other required environment variables
```

#### Frontend Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Development Setup

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-farm.git
   cd smart-farm
   ```

2. Install dependencies for all services:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Create `.env` file in the backend directory with:
     ```
     PORT=5000
     JWT_SECRET=test_jwt_secret_for_development
     OPENAI_API_KEY=sk-test-key-for-development
     TWILIO_ACCOUNT_SID=test_sid_for_development
     TWILIO_AUTH_TOKEN=test_token_for_development
     WEATHER_API_KEY=test_weather_api_key
     DISEASE_DETECTION_API_KEY=test_disease_detection_key
     PINECONE_API_KEY=test_pinecone_key
     PINECONE_ENVIRONMENT=test_environment
     PINECONE_INDEX=smartfarmgh-index
     ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Enhanced Features

### Voice Assistant
- Voice recording and transcription
- Multi-language support (English, Twi, Hausa, Ewe)
- Text-to-speech responses

### Disease Detection
- Upload crop images for disease identification
- AI-powered analysis with confidence scores
- Treatment and prevention recommendations

### Gamified Knowledge Base
- Interactive quizzes on farming topics
- Achievement badges for learning progress
- Leaderboard for community engagement

### Personalized Dashboard
- Customizable widgets for weather, market prices, and crop status
- Data visualization for farm performance
- Quick access to frequently used tools

### Community Forum
- Farmer-to-farmer knowledge sharing
- Expert advice from agricultural specialists
- Regional farming discussions

### Weather-Based Smart Alerts
- Localized weather forecasts
- Extreme weather warnings
- Farming recommendations based on weather conditions
NEXT_PUBLIC_API_URL=http://localhost:5000
# Add other required environment variables
```