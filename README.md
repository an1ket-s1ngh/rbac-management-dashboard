# RBAC Dashboard

This project is a Role-Based Access Control (RBAC) Dashboard built with Next.js, React, and Supabase. It provides a user interface for managing user roles and permissions, as well as tasks within an organization.

## Technology Stack

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **Supabase**: An open-source Firebase alternative for authentication and database management.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Zustand**: A small, fast, and scalable state-management solution.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Radix UI**: A set of accessible and unstyled UI components.

## Setup Instructions

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/rbac-dashboard.git
    cd rbac-dashboard
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a [.env.local](http://_vscodecontentref_/0) file in the root directory and add the following environment variables:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    SERVICE_ROLE=your-supabase-service-role-key
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    ```

5. **Build for production**:
    ```sh
    npm run build
    ```

6. **Start the production server**:
    ```sh
    npm start
    ```

## Project Structure

- **app/**: Contains the main application pages and components.
  - **auth/**: Authentication-related pages and components.
  - **dashboard/**: Dashboard-related pages and components.
  - **(home)**: Home page.
- **components/**: Reusable UI components.
- **lib/**: Library files for actions, store, and utilities.
- **public/**: Public assets.
- **styles/**: Global styles.
- **middleware.ts**: Middleware for handling authentication.
- **next.config.js**: Next.js configuration file.
- **tailwind.config.js**: Tailwind CSS configuration file.
- **tsconfig.json**: TypeScript configuration file.

## API Documentation

### Authentication

- **Login with Email and Password**
  - **Endpoint**: `POST /api/auth/login`
  - **Description**: Logs in a user with email and password.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```
  - **Response**:
    ```json
    {
      "data": { ... },
      "error": null
    }
    ```

- **Logout**
  - **Endpoint**: `POST /api/auth/logout`
  - **Description**: Logs out the current user.
  - **Response**:
    ```json
    {
      "data": null,
      "error": null
    }
    ```

### Members

- **Create Member**
  - **Endpoint**: `POST /api/members`
  - **Description**: Creates a new member.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "role": "new_user",
      "status": "active",
      "email": "john@example.com",
      "password": "password",
      "confirm": "password"
    }
    ```
  - **Response**:
    ```json
    {
      "data": { ... },
      "error": null
    }
    ```

- **Read Members**
  - **Endpoint**: `GET /api/members`
  - **Description**: Retrieves a list of members.
  - **Response**:
    ```json
    {
      "data": [ ... ],
      "error": null
    }
    ```

- **Update Member**
  - **Endpoint**: `PUT /api/members/:id`
  - **Description**: Updates a member's information.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "role": "admin",
      "status": "active",
      "email": "john@example.com",
      "password": "newpassword",
      "confirm": "newpassword"
    }
    ```
  - **Response**:
    ```json
    {
      "data": { ... },
      "error": null
    }
    ```

- **Delete Member**
  - **Endpoint**: `DELETE /api/members/:id`
  - **Description**: Deletes a member.
  - **Response**:
    ```json
    {
      "data": null,
      "error": null
    }
    ```

### Tasks

- **Create Task**
  - **Endpoint**: `POST /api/tasks`
  - **Description**: Creates a new task.
  - **Request Body**:
    ```json
    {
      "title": "New Task",
      "completed": false
    }
    ```
  - **Response**:
    ```json
    {
      "data": { ... },
      "error": null
    }
    ```

- **Read Tasks**
  - **Endpoint**: `GET /api/tasks`
  - **Description**: Retrieves a list of tasks.
  - **Response**:
    ```json
    {
      "data": [ ... ],
      "error": null
    }
    ```

- **Update Task**
  - **Endpoint**: `PUT /api/tasks/:id`
  - **Description**: Updates a task's information.
  - **Request Body**:
    ```json
    {
      "title": "Updated Task",
      "completed": true
    }
    ```
  - **Response**:
    ```json
    {
      "data": { ... },
      "error": null
    }
    ```

- **Delete Task**
  - **Endpoint**: `DELETE /api/tasks/:id`
  - **Description**: Deletes a task.
  - **Response**:
    ```json
    {
      "data": null,
      "error": null
    }
    ```

## License

This project is licensed under the MIT License.