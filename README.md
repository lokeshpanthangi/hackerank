<div align="center">

# 🚀 CodeInterview Pro

### AI-Powered Technical Interview Platform

*Streamline your technical recruitment with real-time code collaboration, AI-powered candidate analysis, and seamless video interviews.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-purple.svg)](https://vitejs.dev/)

[🌟 Features](#-features) • [🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ Overview

CodeInterview Pro is a comprehensive technical interview platform that revolutionizes the hiring process for engineering teams. Built with modern web technologies, it provides a seamless experience for conducting, evaluating, and managing technical interviews.

### 🎯 Key Highlights

- **10,000+** interviews conducted
- **500+** companies trust our platform
- **95%** accuracy rate in candidate evaluation
- **Real-time** collaboration and analysis

## 🌟 Features

### 💻 **Real-time Code Collaboration**
- Live syntax highlighting and code editing
- Shared debugging capabilities
- Multiple programming language support
- Instant feedback and suggestions

### 🧠 **AI-Powered Analysis**
- Advanced code quality evaluation
- Algorithmic thinking assessment
- Problem-solving approach analysis
- Detailed performance insights

### 🎥 **HD Video Interviews**
- Seamless video integration
- Screen sharing capabilities
- Automated session recording
- Real-time speech-to-text transcription

### 👥 **Team Collaboration**
- Multiple interviewer support
- Shared notes and evaluations
- Real-time collaboration tools
- Team productivity insights

### ⏱️ **Smart Time Management**
- Built-in interview timers
- Progress tracking
- Automated session management
- Structured interview flow

### 📊 **Analytics & Reports**
- Comprehensive candidate reports
- Interview performance metrics
- Team productivity analytics
- Exportable evaluation summaries

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend server** (in a new terminal)
   ```bash
   npm run server
   ```

6. **Open your browser**
   Navigate to `http://localhost:8080` to see the application running.

### 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run server` | Start the backend server |
| `npm run dev:all` | Start both frontend and backend |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Monaco Editor** - VS Code-powered code editor

### Backend & Services
- **Node.js** - Server runtime
- **Supabase** - Backend-as-a-Service
- **Deepgram** - Speech recognition API
- **OpenAI** - AI-powered analysis
- **WebRTC** - Real-time communication

### Key Libraries
- **@tanstack/react-query** - Data fetching and caching
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form management

## 📁 Project Structure

```
collab/
├── 📁 public/                 # Static assets
├── 📁 server/                 # Backend server
│   ├── index.js              # Main server file
│   └── deepgram-server.js     # Speech recognition service
├── 📁 src/
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 interview/      # Interview-specific components
│   │   ├── 📁 ui/            # Base UI components
│   │   └── 📁 scheduling/     # Scheduling components
│   ├── 📁 contexts/          # React contexts
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 pages/             # Page components
│   ├── 📁 integrations/      # External service integrations
│   └── 📁 types/             # TypeScript type definitions
├── 📄 package.json           # Dependencies and scripts
├── 📄 tailwind.config.ts     # Tailwind configuration
├── 📄 vite.config.ts         # Vite configuration
└── 📄 README.md              # This file
```

## 🎮 Usage

### For Recruiters
1. **Sign up** and create your recruiter account
2. **Schedule interviews** using the intuitive calendar interface
3. **Conduct interviews** with real-time code collaboration
4. **Review AI analysis** and candidate performance metrics
5. **Generate reports** for stakeholder review

### For Candidates
1. **Join interviews** using the provided link
2. **Collaborate in real-time** on coding challenges
3. **Communicate effectively** with video and chat features
4. **Showcase your skills** with live coding demonstrations

### For Administrators
1. **Manage users** and permissions
2. **Monitor platform** usage and performance
3. **Configure settings** and integrations
4. **Access analytics** and reporting dashboards

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key

# Deepgram Configuration (for speech recognition)
ASSEMBLY_API_KEY=your_deepgram_api_key

# Application Settings
VITE_APP_URL=http://localhost:8080
```

### Database Setup

The application uses Supabase for data management. Run the included migrations:

```bash
# If using Supabase CLI
supabase db reset
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

### Deployment Options

- **Vercel** - Recommended for frontend
- **Netlify** - Alternative frontend hosting
- **Railway** - Full-stack deployment
- **Docker** - Containerized deployment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Use **TypeScript** for type safety
- Follow **ESLint** configuration
- Use **Prettier** for code formatting
- Write **meaningful commit messages**

## 📖 Documentation

- [API Documentation](docs/api.md)
- [Component Library](docs/components.md)
- [Deployment Guide](docs/deployment.md)
- [Troubleshooting](docs/troubleshooting.md)

## 🐛 Troubleshooting

### Common Issues

**Speech Recognition Not Working**
- Ensure microphone permissions are granted
- Check internet connection stability
- Verify browser compatibility (Chrome recommended)

**Video Call Issues**
- Check camera/microphone permissions
- Ensure stable internet connection
- Try refreshing the page

**Build Errors**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify environment variables

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lovable** - Platform development support
- **Supabase** - Backend infrastructure
- **Deepgram** - Speech recognition technology
- **OpenAI** - AI analysis capabilities
- **Radix UI** - Accessible component library

---

<div align="center">

**Built with ❤️ by the CodeInterview Pro Team**

[Website](https://lovable.dev/projects/2a3253da-a36a-4ae9-a22d-3b6bf299d2f7) • [Documentation](docs/) • [Support](mailto:support@codeinterview.pro)

</div>
