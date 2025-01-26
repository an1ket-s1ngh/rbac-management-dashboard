# RBAC Dashboard

This project is a Role-Based Access Control (RBAC) Dashboard built with Next.js, React, and Supabase. It provides a user interface for managing user roles and permissions, as well as tasks within an organization.

## Technology Stack

- **Next.js**: A React framework for server-side rendering and static site generation. It is used to create the main structure of the application, handle routing, and server-side rendering.
- **React**: A JavaScript library for building user interfaces. It is used to create reusable UI components.
- **Supabase**: An open-source Firebase alternative for authentication and database management. It is used for user authentication, role management, and storing application data.
- **Tailwind CSS**: A utility-first CSS framework for styling. It is used to style the application components.
- **Zustand**: A small, fast, and scalable state-management solution. It is used to manage the global state of the application.
- **Zod**: A TypeScript-first schema declaration and validation library. It is used to validate data structures.
- **Radix UI**: A set of accessible and unstyled UI components. It is used to build accessible and customizable UI components.

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
    Create a `.env.local` file in the root directory and add the following environment variables:
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

## API Details

The application uses Supabase for backend services. Here are some key API endpoints:

- **Authentication**:
  - `POST /auth/signup`: Sign up a new user.
  - `POST /auth/login`: Log in an existing user.
  - `POST /auth/logout`: Log out the current user.

- **Roles and Permissions**:
  - `GET /roles`: Get a list of all roles.
  - `POST /roles`: Create a new role.
  - `PUT /roles/:id`: Update an existing role.
  - `DELETE /roles/:id`: Delete a role.

- **Tasks**:
  - `GET /tasks`: Get a list of all tasks.
  - `POST /tasks`: Create a new task.
  - `PUT /tasks/:id`: Update an existing task.
  - `DELETE /tasks/:id`: Delete a task.

## Routing Details

The application uses Next.js routing. Here are some key routes:

- `/`: Home page.
- `/auth`: Auhtentication page.
- `/dashboard`: Dashboard page (requires authentication).
- `/roles`: Roles management page (requires admin role).
- `/tasks`: Tasks management page (requires appropriate permissions).

## Role Management

### Client-Side

On the client side, role management is handled using Zustand for state management. The user's role and permissions are stored in the global state and are used to conditionally render components and restrict access to certain routes.

Example:
```tsx
// filepath: /src/store/useUserStore.ts
import create from 'zustand';

interface UserState {
  role: string;
  permissions: string[];
  setRole: (role: string) => void;
  setPermissions: (permissions: string[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: '',
  permissions: [],
  setRole: (role) => set({ role }),
  setPermissions: (permissions) => set({ permissions }),
}));
```

### Server-Side

On the server side, Supabase is used to manage roles and permissions. Each user is assigned a role, and each role has a set of permissions. The server checks the user's role and permissions before allowing access to certain API endpoints.

Example:
```js
// filepath: /src/pages/api/roles.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: roles, error } = await supabase.from('roles').select('*');
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(roles);
    case 'POST':
      const { name, permissions } = req.body;
      const { data, error: insertError } = await supabase.from('roles').insert([{ name, permissions }]);
      if (insertError) return res.status(500).json({ error: insertError.message });
      return res.status(201).json(data);
    // Handle other methods (PUT, DELETE) similarly
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

This setup ensures that role management is handled both on the client and server sides, providing a secure and efficient way to manage user roles and permissions.