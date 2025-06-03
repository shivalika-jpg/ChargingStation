#EV Charger App


Project Overview
EV Charger App is a web application that allows users to register and manage their accounts to access electric vehicle charging station services. The backend is built with Node.js, Express, and MongoDB, and the frontend provides a clean, user-friendly interface for registration and login.


Features

User registration with name, email, and password

Secure password handling

Responsive and intuitive frontend UI

API endpoints for authentication and user management

Integration with MongoDB for data persistence

Technologies Used
Backend: Node.js, Express.js, Mongoose (MongoDB ORM)

Frontend: HTML, CSS, JavaScript (Vanilla JS)

Database: MongoDB (Atlas or local instance)

Deployment: Hosted on Render (or your chosen hosting service)

Installation and Setup
Prerequisites
Node.js (v14 or higher recommended)

MongoDB instance (local or cloud)

Steps
Clone the repository:

bash
Copy
Edit
git clone <repository-url>
cd <repository-folder>
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root directory with the following variables:

ini
Copy
Edit
MONGODB_URI=<your-mongodb-connection-string>
PORT=5000
JWT_SECRET=<your-jwt-secret>
Start the backend server:

bash
Copy
Edit
npm start
Open the frontend files (register.html, login.html, etc.) in your browser, or serve them using a static server.

API Endpoints
POST /api/auth/register - Register a new user

POST /api/auth/login - Login existing user

Additional endpoints as per your backend controllers and routes

Usage
Navigate to the registration page.

Fill in your name, email, and password.

Submit the form to create an account.

Upon successful registration, you can log in using your credentials.

Troubleshooting
Ensure MongoDB connection URI is correct in .env

Make sure the backend server is running before accessing the frontend

Check CORS settings if accessing backend and frontend from different origins

For connection refused errors, verify the server URL and port

Contributing
Contributions are welcome. Please fork the repository and create a pull request with your improvements.

License
This project is licensed under the MIT License.


