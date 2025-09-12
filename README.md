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
- PostgreSQL for relational data
- Pinecone for vector embeddings (AI features)

### AI Services
- OpenAI GPT-4-Turbo for intelligent responses
- Whisper for voice capabilities
- Text Embeddings for semantic search

### SMS Gateway
- Twilio for SMS delivery and management

### Deployment
- Docker containerization
- AWS/DigitalOcean hosting

## Project Structure

```
smart-farm/
├── frontend/           # Next.js web application
│   ├── public/         # Static assets
│   └── src/            # Source code
│       ├── app/        # Next.js app router
│       ├── components/ # React components
│       └── styles/     # CSS styles
├── backend/            # Express API server
│   ├── api/            # API routes
│   ├── services/       # Business logic
│   ├── models/         # Database models
│   └── utils/          # Helper functions
├── chatbot/            # AI chatbot implementation
├── sms-engine/         # SMS calendar and reminder system
└── docs/               # Documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Chatbot
- `POST /api/chatbot/message` - Send a message to the AI assistant

### SMS Calendar
- `POST /api/sms/subscribe` - Subscribe to SMS reminders
- `GET /api/sms/schedule/:userId` - Get a user's reminder schedule

### Knowledge Base
- `GET /api/knowledge/articles` - Get all knowledge base articles
- `GET /api/knowledge/articles/:id` - Get a specific article

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- API keys for OpenAI and Twilio

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/smart-farm.git
   cd smart-farm
   ```

2. Install dependencies for each module
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables
   - Create `.env` files in the backend and frontend directories based on the provided examples
   - Add your API keys and database connection strings

4. Run the development servers
   ```bash
   # Start backend server
   cd backend
   npm run dev
   
   # Start frontend server in a new terminal
   cd frontend
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ministry of Food and Agriculture, Ghana
- Local agricultural extension officers
- Ghanaian farming communities