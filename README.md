<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# MoodTunes

MoodTunes is a web application that uses facial recognition to detect a user's emotions and recommend music based on their mood. The application is built with Laravel and uses the DeepFace library for facial recognition.



## Installation Requirements for macOS

Before installing MoodTunes, ensure you have the following prerequisites installed on your Mac:

1. **Python Requirements**
   - Python 3.9+ (recommended version: 3.9.7)
   - pip3 (latest version)
   
   For Apple Silicon (M1/M2) Macs:
   ```bash
   # Install Homebrew if you haven't already
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Python dependencies
   brew install python@3.9
   brew install cmake pkg-config
   
   # Create and activate a virtual environment (recommended)
   python3 -m venv venv
   source venv/bin/activate
   
   # Install dependencies
   pip3 install --upgrade pip
   pip3 install -r requirements.txt
   ```

   For Intel Macs:
   ```bash
   # Install Homebrew if you haven't already
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Python dependencies
   brew install python@3.9
   brew install cmake pkg-config
   
   # Create and activate a virtual environment (recommended)
   python3 -m venv venv
   source venv/bin/activate
   
   # Install dependencies
   pip3 install --upgrade pip
   pip3 install -r requirements.txt
   ```

   **Note**: If you encounter any issues with OpenCV or TensorFlow:
   - For OpenCV errors, try: `pip3 install opencv-python-headless==4.8.1.78`
   - For TensorFlow on Apple Silicon, the correct version will be automatically installed
   - If you see any Rust-related errors, install Rust: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

2. **Node.js Requirements**
   - Node.js 16+ (recommended version: 16.x LTS)
   - npm 8+ (comes with Node.js)

   Install Node.js dependencies:
   ```bash
   npm install
   ```

3. **PHP Requirements**
   - PHP 8.1+
   - Composer 2.x
   
   Install PHP dependencies:
   ```bash
   composer install
   ```

4. **Additional Mac-specific Requirements**
   - Homebrew (for managing packages)
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   
   - Install additional dependencies:
   ```bash
   brew install cmake
   brew install pkg-config
   ```

## Spotify API Setup

To enable Spotify integration, you'll need to set up your Spotify Developer credentials:

1. **Create a Spotify Developer Account**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Log in with your Spotify account or create one if needed
   - Click "Create App"

2. **Configure Your Spotify App**
   - Fill in the app name (e.g., "MoodTunes")
   - Set the Redirect URI to: `http://localhost:8000/callback`
   - Add a brief description
   - Accept the terms and conditions
   - Click "Create"

3. **Get Your Credentials**
   - Once created, you'll see your app's dashboard
   - Note down the "Client ID" and "Client Secret"
   - These will be used in your `.env` file

4. **Configure Environment Variables**
   - Copy the `.env.example` file to create a new `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and update the Spotify credentials:
     ```env
     SPOTIFY_CLIENT_ID=your_client_id_here
     SPOTIFY_SECRET=your_client_secret_here
     ```
   Example `.env` structure:
   ```env
   SPOTIFY_SECRET=your_client_secret_here
   SPOTIFY_CLIENT_ID=your_client_id_here

   APP_NAME=Laravel
   APP_ENV=local
   APP_KEY=base64:your_app_key_here
   APP_DEBUG=true
   APP_TIMEZONE=UTC
   ```

5. **Security Notes**
   - Never commit your `.env` file to version control
   - Keep your Client Secret secure
   - If your credentials are compromised, you can regenerate them in the Spotify Developer Dashboard

## Development Setup

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Generate application key:
   ```bash
   php artisan key:generate
   ```

3. Start the development server:
   ```bash
   php artisan serve
   ```

4. In a separate terminal, start the frontend development server:
   ```bash
   npm run dev
   ```

5. In another terminal, start the Python server:
   ```bash
   python3 main.py
   ```

<div align="center">
<img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
<br/>
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React Logo">
<img src="https://www.python.org/static/community_logos/python-logo-generic.svg" width="200" alt="Python Logo">
</div>
