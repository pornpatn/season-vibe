# Restaurant Backend Starter

This is the backend for a restaurant inventory and ordering system, built with:

- Node.js + Express.js
- TypeScript
- Prisma ORM
- SQLite (for development)
- JWT-based authentication

---

## 📦 Tech Stack

- **Express.js** for API routing
- **TypeScript** for static typing
- **Prisma ORM** for database access
- **SQLite** for development
- **bcrypt** for password hashing
- **jsonwebtoken** for token-based auth

---

## 🚀 How to Run Locally

### 1. Clone or unzip this project

```bash
cd restaurant-backend-full
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Set up environment variables

Make sure your `.env` file looks like this:

```env
PORT=4000
JWT_SECRET=your_jwt_secret
DATABASE_URL=file:./dev.db
```

### 4. Set up the database

Generate the Prisma client and apply initial schema:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

(Optional) Launch the Prisma GUI:

```bash
npx prisma studio
```

### 5. Start the development server

```bash
yarn dev
# or
npm run dev
```

The server will run at `http://localhost:4000`.

---

## 🔐 Auth Endpoint Example

### POST `/api/auth/signin`

**Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Returns a JWT token on success.

---

## 📁 Folder Structure

```
src/
├── controllers/      # Route handlers
├── routes/           # API route definitions
├── services/         # Business logic
├── middleware/       # Auth / token middleware
├── utils/            # Prisma client
├── index.ts          # App entry point
```

---

## ✅ Next Steps

- Add user registration or seeding
- Build role/permission management
- Connect to PostgreSQL for production

---

## 📄 License

MIT
