# SmartFarmGH - AI-Powered Farmer Education Platform

SmartFarmGH is a comprehensive platform designed to empower Ghanaian farmers with agricultural knowledge, timely reminders, and expert advice through an AI-powered chatbot and SMS-based cropping calendar system.

## Features

- **AI-Powered Chatbot**: Farm-themed conversational assistant with voice capabilities
- **SMS-Based Cropping Calendar**: Timely agricultural reminders via SMS
- **Knowledge Base**: Curated agricultural content for Ghanaian farmers
- **Web Dashboard**: Responsive interface for managing crops and preferences

## Technology Stack

- **Frontend**: Next.js with Tailwind CSS
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL and Pinecone (vector database)
- **AI Services**: OpenAI GPT-4-Turbo, Whisper, Text Embeddings
- **SMS Gateway**: Twilio
- **Deployment**: Docker, AWS/DigitalOcean

## Project Structure

```
smartfarmgh/
├── frontend/           # Next.js web application
├── backend/            # Express API server
│   ├── api/            # API routes
│   ├── services/       # Business logic
│   ├── models/         # Database models
│   └── utils/          # Helper functions
├── chatbot/            # AI chatbot implementation
├── sms-engine/         # SMS calendar and reminder system
└── docs/               # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- API keys for OpenAI and Twilio

### Installation

1. Clone the repository
2. Install dependencies for each module
3. Set up environment variables
4. Run the development servers

## License

This project is licensed under the MIT License - see the LICENSE file for details.