# Installation Guide

## Prerequisites

Before installing KaamKonnect, ensure you have the following software installed on your system:

### Required Software
- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (version 4.4 or higher)
- **Git** (for cloning the repository)

### Optional but Recommended
- **MongoDB Compass** (GUI for MongoDB)
- **Postman** (for API testing)
- **VS Code** (recommended code editor)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/kaamkonnect.git
cd kaamkonnect
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 3. Database Setup

#### Option A: Local MongoDB Installation
1. Install MongoDB Community Edition from [MongoDB Official Website](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Whitelist your IP address

### 4. Environment Configuration

Create a `.env` file in the `server` directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/kaamkonnect
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/kaamkonnect

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 5. Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the API key to your domain (for production)

Update `index.html` with your API key:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places"></script>
```

### 6. Start the Application

#### Development Mode

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

#### Production Mode

**Build Frontend:**
```bash
npm run build
```

**Start Backend:**
```bash
cd server
npm start
```

### 7. Verify Installation

1. Open your browser and navigate to `http://localhost:5173`
2. You should see the KaamKonnect landing page
3. Try registering a new account to test the functionality
4. Check the backend API at `http://localhost:5000/api/health` (if health endpoint exists)

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process using port 5173 (frontend)
npx kill-port 5173

# Kill process using port 5000 (backend)
npx kill-port 5000
```

#### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify network connectivity for MongoDB Atlas

#### Google Maps Not Loading
- Verify API key is correct
- Check if required APIs are enabled
- Ensure billing is set up for Google Cloud (required for Maps API)

#### Module Not Found Errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment-Specific Setup

#### Windows Setup
```bash
# Use Git Bash or PowerShell
# Ensure Node.js is added to PATH
# Install Windows Build Tools if needed
npm install -g windows-build-tools
```

#### macOS Setup
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js via Homebrew
brew install node

# Install MongoDB via Homebrew
brew tap mongodb/brew
brew install mongodb-community
```

#### Linux (Ubuntu/Debian) Setup
```bash
# Update package index
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## Development Tools Setup

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- Thunder Client (API testing)
- GitLens

### Browser Extensions (For Testing)
- React Developer Tools
- Redux DevTools (if using Redux)
- JSON Viewer

## Next Steps

After successful installation:

1. Read the [API Documentation](./API.md)
2. Check out the [Development Guide](./DEVELOPMENT.md)
3. Review the [Contributing Guidelines](../CONTRIBUTING.md)
4. Explore the [User Manual](./USER_MANUAL.md)

## Getting Help

If you encounter issues during installation:

1. Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
2. Search existing [GitHub Issues](https://github.com/yourusername/kaamkonnect/issues)
3. Create a new issue with detailed error information
4. Join our [Discord Community](https://discord.gg/kaamkonnect) for real-time help

---

**Installation complete! 🎉 You're ready to start developing with KaamKonnect.**