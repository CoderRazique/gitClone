# 💻 GitHub Clone Frontend

A modern GitHub UI clone built with **React & Vite,**.
Supports authentication, repository browsing, and profile dashboard.

---

## 🛠 Tech Stack

* React.js
* Vite
* Axios
* React Router DOM
* Vercel & AWS Amplify (Deployment)

---

## 📁 Project Structure

```
frontend/
│── src/
│   │── components/
│   │── pages/
│   │── authContext/
│   │── assets/
│   │── App.jsx
│   │── main.jsx
│── .env
│── package.json
```

---

## ⚙️ Environment Variables

Create `.env`:

```
VITE_API_URL=https://your-backend-domain.com
```

---

## ▶️ Run Locally

```
npm install
npm run dev
```

---

## 🔗 API Usage

```
const API = import.meta.env.VITE_API_URL;
```

Example:

```
axios.post(`${API}/login`, data);
```

---

## 🚀 Deployment

### Vercel

```
npm run build
```

* Upload to Vercel
* Add environment variable:

```
VITE_API_URL=https://your-backend-domain.com
```

---

## ⚠️ Common Errors

### ❌ Mixed Content Error

Cause:

```
HTTPS frontend → HTTP backend
```

Fix:

```
Use HTTPS backend
```

---

### ❌ Network Error

* Backend not running
* Wrong API URL
* CORS issue

---

## 📱 Features

* User Authentication (Login/Signup)
* Repository Dashboard
* Profile Page
* Responsive UI
* GitHub-like design

---

## 📌 Author

**Md Abdul Razique**
