# RBAC Dashboard

## Project Overview

The RBAC (Role-Based Access Control) Dashboard is a web application designed to manage user roles and permissions within an organization. It provides an intuitive interface for administrators to assign roles, define permissions, and control access to various resources.

## Features

- User management
- Role assignment
- Permission management
- Audit logs
- Responsive design

## Technology Stack

- **Frontend:** React, Redux, Material-UI
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Docker, Kubernetes

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/rbac-dashboard.git
    cd rbac-dashboard
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Configure environment variables:
    - Create a `.env` file in the `backend` directory with the following content:
        ```
        PORT=5000
        MONGO_URI=mongodb://localhost:27017/rbac-dashboard
        JWT_SECRET=your_jwt_secret
        ```

4. Start the development servers:
    - Backend:
        ```bash
        cd backend
        npm start
        ```
    - Frontend:
        ```bash
        cd frontend
        npm start
        ```

5. Open your browser and navigate to `http://localhost:3000`.

### Docker Deployment

1. Build and run the Docker containers:
    ```bash
    docker-compose up --build
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## API Documentation

### Authentication

#### Login

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "token": "jwt_token"
    }
    ```

### Users

#### Get All Users

- **Endpoint:** `GET /api/users`
- **Description:** Retrieves a list of all users.
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Response:**
    ```json
    [
        {
            "id": "user_id",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "roles": ["admin"]
        }
    ]
    ```

#### Create User

- **Endpoint:** `POST /api/users`
- **Description:** Creates a new user.
- **Request Body:**
    ```json
    {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "password123",
        "roles": ["user"]
    }
    ```
- **Response:**
    ```json
    {
        "id": "new_user_id",
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "roles": ["user"]
    }
    ```

### Roles

#### Get All Roles

- **Endpoint:** `GET /api/roles`
- **Description:** Retrieves a list of all roles.
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Response:**
    ```json
    [
        {
            "id": "role_id",
            "name": "admin",
            "permissions": ["read", "write", "delete"]
        }
    ]
    ```

#### Create Role

- **Endpoint:** `POST /api/roles`
- **Description:** Creates a new role.
- **Request Body:**
    ```json
    {
        "name": "manager",
        "permissions": ["read", "write"]
    }
    ```
- **Response:**
    ```json
    {
        "id": "new_role_id",
        "name": "manager",
        "permissions": ["read", "write"]
    }
    ```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before getting started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [yourname@example.com](mailto:yourname@example.com).