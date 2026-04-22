# 🚀 Future Message API (Backend)

A production-style backend system where users can write messages to their future self and unlock them later.

---
## 🛠️ Tools & Technologies

- **Node.js** — Runtime environment  
- **Express.js** — Web framework  
- **PostgreSQL** — Database  
- **Prisma** — ORM (database access)  
- **Zod** — Schema validation  
- **JWT (jsonwebtoken)** — Authentication  
- **bcrypt** — Password hashing  
- **node-cron** — Background job scheduler  
- **BullMQ (Redis-based queue)** — Background processing (used internally)  
- **TypeScript** — Type safety  

## 📌 Features

### 🔐 Authentication System
- User Signup & Login (JWT-based)
- Password hashing (secure)
- Token-based protected routes

### ✉️ Message System
- Create message for future
- Unlock message after specific time
- Auto-unlock using background job (cron)

### 📊 Advanced API Features
- Pagination (`page`, `limit`)
- Search (`search`)
- Filtering (`isUnlocked`)
- Sorting (`asc`, `desc`)

### 🗑️ Soft Delete System
- Messages are NOT permanently deleted
- Uses `isDeleted` flag
- Prevents data loss and supports recovery

### ⚙️ Background Job (Cron)
- Runs every minute
- Checks messages where:
  - `unlockAt <= now`
  - `isUnlocked = false`
- Automatically unlocks them

---

## 🧱 Clean Architecture
src/
├── modules/
│ ├── auth/
│ ├── message/
├── middleware/
├── utils/
├── lib/
├── job/


---


## 🔑 API Endpoints

### Auth
POST /api/auth/signup  
POST /api/auth/login  

### Messages
POST /api/messages  
GET /api/messages?page=1&limit=10&search=hello&isUnlocked=true&sort=desc  
GET /api/messages/:id  
PATCH /api/messages/:id  
DELETE /api/messages/:id  

---

## 📊 Query Parameters

| Param       | Description               |
|------------|---------------------------|
| page       | Page number               |
| limit      | Items per page            |
| search     | Search by content         |
| isUnlocked | Filter unlocked messages  |
| sort       | asc or desc               |

---

## 🔐 Security

- JWT Authentication
- Protected routes (middleware)
- Ownership check (user-specific data access)
- Rate limiting

---

## 🧠 Key Concepts Implemented

- Clean service-controller separation
- Global error handling
- Async wrapper (no repetitive try-catch)
- Standard response structure
- Data validation (Zod)

---

## ⚠️ Not Implemented Yet (Future Scope)

- Redis caching
- Email notifications
- Role-based authorization
- File upload / attachments

---

## 🚀 How to Run

1. Install dependencies  
npm install  

2. Setup environment variables  
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
PORT=5000


3. Run Prisma  
npx prisma db push
npx prisma generate

4. Run the server  
npm run dev


---

## 🧠 Learning Outcome

- Real-world backend architecture  
- Scalable API design  
- Secure authentication system  
- Background job processing  
- Production-ready coding patterns  

---

## 💡 Future Improvements

- Email notification when message unlocks  
- Redis caching for performance  
- Frontend dashboard (React)  
- Shareable public message links  

---

## 🏁 Conclusion

This is not just a CRUD project — it’s a structured backend system with real-world patterns.