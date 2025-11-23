## ⚙️ Project Startup

These steps assume you have already completed the prerequisite setup (installing dependencies, creating `.env` files, and starting the PostgreSQL database via Docker).

## 🛠️ Tech Stack

| Category | Technology | Key Function / Notes |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite)** | UI framework with fast build tool |
| | **Zustand** | Lightweight global state management |
| | **TailwindCSS** | Utility-first styling framework |
| | **Axios** | HTTP client for API requests |
| | **Lucide Icons** | Icon library for UI elements |
| **Backend** | **Node.js + Express** | Runtime environment and web framework |
| | **PostgreSQL** | Primary database (managed via Docker) |
| | **Sequelize ORM** | Object-Relational Mapper for database interaction |
| | **JWT Authentication** | Token-based security mechanism |
| | **bcrypt** | Secure password hashing |
| | **httpOnly Cookies** | Secure, session-based authentication storage |

### 1 Start PostgreSQL using Docker

Run this command to start the database container. This sets up the `admin` user, `admin123` password, and `hrms_db` database, mapping to port 5432.

```bash
docker run --name hrms-postgres -e POSTGRES_PASSWORD=admin123 \
-e POSTGRES_USER=admin -e POSTGRES_DB=hrms_db \
-p 5432:5432 -d postgres
```

### 2 Database Migrations

You must run migrations to set up the necessary database tables using the **Sequelize CLI**.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Run the migrations command:
    ```bash
    npx sequelize-cli db:migrate
    ```
3. RUn seed Data
    ```bash
    npx sequelize-cli db:seed:all
    ```

### 3 Start Backend Server

This starts the **Node.js/Express.js** API server.

1.  Ensure you are still in the `backend/` directory.
2.  Run the development script:
    ```bash
    npm run dev
    ```
    The backend will start and run at: **`http://localhost:5000`**

### 4 .env file (backend)
```bash
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=admin123
DB_NAME=hrms_db
JWT_SECRET=supersecret123
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 5 Start Frontend Application

This starts the **React/Vite** development server.

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Run the development script:
    ```bash
    npm run dev
    ```
    The frontend application will start and run at: **`http://localhost:5173`**

### 6 .env file (frontend)

```bash
VITE_API_URL=http://localhost:5000/api
```
