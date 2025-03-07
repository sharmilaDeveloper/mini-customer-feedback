# mini-customer-feedback

## **Mini Customer Feedback System**

This project is a full-stack feedback management system that allows customers to submit feedback , view feedback list and view overall statistics.

## **Features**

 1) Submit feedback with validation
 2) View total feedback count and average rating
 3) Display feedback list in a professional table format
 4) View feedback breakdown by rating
 5) Navigation between pages (Dashboard & Feedback Form)

---

## **Technology Stack**

### **Frontend**  
- React (Vite + TypeScript)  
- Material UI (MUI)  
- React Query (TanStack Query)  
- Axios for API calls  
- React Router for navigation  

### **Backend**  
- Node.js + Express  
- SQLite + Sequelize ORM  
- REST API with proper error handling  
- Data validation & structured API responses  

---

## **Project Structure**  

mini-customer-feedback/
│── backend/              # Node.js (Express + SQLite) Backend
│   ├── models/           # Sequelize models
│   ├── routes/           # Express API routes
│   ├── config/           # Database configuration
│   ├── index.js          # Main Express server file
│── frontend/             # React (Vite + TypeScript) Frontend
│   ├── src/
│   │   ├── components/   # UI components (FeedbackForm, Dashboard, FeedbackTable)
│   │   ├── service/      # API service functions
│   │   ├── App.tsx       # Main application file
│   │   ├── main.tsx      # React entry point


---

## **Setup Instructions**  

### **Backend Setup**  

1. Navigate to the backend folder:  

   cd backend
   npm init -y

3. Install dependencies:  

  npm install express sqlite3 sequelize cors dotenv express-validator
  npm install --save-dev nodemon

     
3. Run database migrations:  

   npx sequelize-cli db:migrate
    
4. Start the backend server:  
  
   npm start
   
   The backend should be running at `http://localhost:5000`.  

---

### **Frontend Setup (Vite + React + TypeScript)**  

1. Navigate to the frontend folder:  

  cd frontend
  npm create vite@latest . --template react-ts
  npm install
  
2. Install dependencies:  

npm install @mui/material @emotion/react @emotion/styled @tanstack/react-query react-hook-form axios react-router-dom


3. Start the development server:  

   npm run dev

   The frontend should be running at `http://localhost:5173`.  

---

## **API Endpoints**  

### **Feedback API**  

| Method | Endpoint        | Description                  
|--------|----------------|------------------------------
| GET    | `/api/feedback` | Fetch all feedback          
| POST   | `/api/feedback` | Submit new feedback         
| GET    | `/api/feedback/stats` | Get feedback statistics 

---

## **Environment Variables**  

Create a `.env` file in the **backend** directory with the following:  


PORT=5000
DATABASE_URL=sqlite:./database.sqlite

---


