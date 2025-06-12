# 🧠 FormAI

**AI-powered Form Creation & Response Management Platform**

FormAI is a modern, intelligent platform that enables creators to generate smart forms using AI from a simple prompt. Whether you're collecting feedback, running surveys, or managing registrations, FormAI provides a seamless experience for both form creators and users.

---

## 🌐 Live Demo

🔗 [https://formai.com](https://formai.com)  
*(Replace with your actual deployed link)*

---

## ✨ Features

### 🎯 For Creators
- 🤖 **AI Prompt-Based Form Generation**
- 🚀 **Publish and Share Forms Instantly**
- 📊 **Track and Manage Responses in Real Time**
- 🧭 **Intuitive Admin & Creator Dashboards**

### 📝 For Users
- 📂 **Access Forms Shared With You**
- ✍️ **Fill Out and Submit Responses Easily**
- 🔁 **View and Review Your Past Submissions**

---

## 🛠 Tech Stack

- **Frontend**: React.js, Next.js 15, Tailwind CSS, Framer Motion, Shadcn UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT-based Auth (User & Admin roles)
- **AI Integration**: Gemini API
- **Hosting**: Vercel 

---

## 📁 Environment Variables

> ⚠️ Don’t forget to create a `.env` file in the root directory of your project and populate it with the following:

```env
MONGODB_URI=your_mongodb_connection_string
SALT_ROUNDS=10
SESSION_SECRET=your_session_secret
NEXT_PUBLIC_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key

🚀 Getting Started
🔧 Install & Run Locally
Copy
# 1. Clone the repository
git clone https://github.com/your-username/formai.git

# 2. Navigate to the project folder
cd formai

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev