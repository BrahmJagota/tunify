# Tunify

Welcome to **Tunify**, your go-to platform for managing and enjoying music. With Tunify, you can upload your music, purchase tracks, and securely download them. Everything is powered by AWS S3 for file storage, Razorpay for payments, and Google Authentication with JWT to keep your account safe.

## Key Features
- **Upload Music**: Easily upload and manage your music files.
- **Purchase & Download**: Buy music and download it directly to your device.
- **Secure Login**: Sign in with Google and enjoy JWT-protected sessions.
- **Simple Payments**: Hassle-free transactions with Razorpay.

## How the Project is Organized
The project has two main parts:
1. **frontend**: The React-based client-side application.
2. **server**: The Node.js backend that powers the app.

## Getting Started

### What You Need
- Node.js (v16 or higher)
- npm or yarn
- AWS S3 credentials
- Razorpay API keys
- Google OAuth credentials

### Steps to Set It Up

1. **Clone This Repository**:
   ```bash
   git clone https://github.com/yourusername/tunify.git
   cd tunify
   ```

2. **Install Dependencies**:
   Navigate to each folder and install the required packages:
   ```bash
   cd server
   npm install
   
   cd ../client
   npm install
   ```
   Or run these commands from the root folder to do it in one go:
   ```bash
   npm run install-server
   npm run install-client
   ```

3. **Add Your Environment Variables**:
   Create `.env` files for both the server and client.

   **Server `.env`**:
   ```
   PORT=5000
   MONGODB_URI=<your_database_url>
   AWS_SECRET_KEY=<your_aws_key>
   AWS_ACCESS_KEY=<your_aws_access_key>
   AWS_BUCKET_NAME=<your_s3_bucket>
   RAZORPAY_KEY=<your_razorpay_key>
   RAZORPAY_SECRET=<your_razorpay_secret>
   JWT_SECRET=<your_jwt_secret>
   JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
   ```

   **Client `.env`**:
   ```
   VITE_BACKEND_URL=<http://localhost:3000>
   VITE_CLIENT_ID=<your_google_client_id>
   VITE_RAZOR_ID=<your_razor_id>
   ```

4. **Start the App**:
   - Launch the backend server:
     ```bash
     cd server
     npx tsx --watch server.ts
     ```
   - Launch the frontend app:
     ```bash
     cd ../client
     npm run dev
     ```
   Or simply use these shortcuts from the root folder:
   ```bash
   npm run dev:server
   npm run dev:client
   ```

5. **Build for Production**:
   When you're ready to deploy, build the frontend:
   ```bash
   npm run build-client
   ```

## Tech Stack
- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Google OAuth + JWT
- **Payments**: Razorpay
- **File Storage**: AWS S3

## Want to Contribute?
We love collaboration! If you have ideas or find bugs, feel free to fork this repo and send us a pull request.

## License
This project is open-source and available under the MIT License.

## Questions?
If you have any questions or need help, feel free to reach out to [jagotabrahm@gmail.com].

