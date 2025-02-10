# DocuFlow

## Overview
DocuFlow is a digital document submission and approval system designed for Organizations. It enables users to submit applications online while allowing staff to review, process, and approve them efficiently.

## Features
- **Role-Based Authentication** (JWT-based for Staff & Users)
- **Document Submission & Status Tracking**
- **Role-Specific Dashboards** for users & staff
- **Fast & Secure API** built with FastAPI
- **PostgreSQL Database (Supabase) Integration**
- **Custom Authentication** (instead of Supabase Auth)
- **Protected Routes** in React with role-based access

## Tech Stack
- **Frontend:** React.js, React Router, Axios
- **Backend:** FastAPI
- **Database:** PostgreSQL (Supabase)
- **Authentication:** JWT (JSON Web Tokens)

## Installation

### Prerequisites
- Node.js & npm
- Python & pip
- PostgreSQL (Supabase setup required)

### Backend Setup (FastAPI)
```sh
# Navigate to the backend directory
cd server

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

### Frontend Setup (React.js)
```sh
# Navigate to the frontend directory
cd client

# Install dependencies
npm install

# Start the React development server
npm run dev
```

## Usage
1. Register as a user or staff member.
2. Submit documents for approval.
3. Track the status of your applications.
4. Staff members can review, approve, or reject submissions.

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/user/auth/register` | Register a new user |
| POST | `/staff/auth/register` | Register a new staff member |
| POST | `/user/auth/login` | User login |
| POST | `/staff/auth/login` | Staff login |
| POST | `/user/application/add` | Submit a new application |
| GET | `/staff/application/:id` | View application details |

## License
This project is licensed under the MIT License.

## Contributors
- [Pratheep Srikones](https://github.com/Pratheep-Srikones)

## Acknowledgments
Special thanks to the open-source community and resources that made this project possible.
