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
# Add other required environment variables
```