# 📄 DocSprint

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://invoice-ease-iota.vercel.app/)

A sleek and professional **MERN-based invoicing and document generator app** that helps individuals and businesses create, manage, and download invoices and documents like Offer Letters, Internship Letters, Experience Letters, and more — all from a clean and responsive interface.

---
## 🚀 Features

### 🧾 Invoice Management
- Create invoices using modern, responsive templates
- Store and view previous invoices securely
- Download PDF copies instantly

### 📄 Document Generator
- Select from multiple professional document types:
  - Offer Letter
  - Internship Letter
  - Experience Letter
  - Promotion Letter
- Auto-filled and exportable as PDF

### 🌟 Modern UI
- Responsive and mobile-friendly
- Clean animations with **Framer Motion**
- Tailwind CSS-based design system

### 🔒 Authentication
- Login/Register with sessions (using cookies)
- Protected routes with JWT

### 📦 Tech Stack
- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, cookies, Redux for state

---

## 📁 Folder Structure

```text
DocSprint/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── Generic/ # Layout, Home, Login, Register, NotFound
│ │ ├── Invoicing/ # Templates, InvoiceForm, InvoicePDF, Invoices, Selection
│ │ └── Documents/ # DocumentForm, Preview, TypeSelection
│ ├── Context/ # Template and Auth contexts
│ ├── Redux/ # Auth slice and store setup
│ ├── App.jsx # Main routing + lazy loading
│ └── main.jsx
├── server/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── index.js # Express server setup
└── .env
```

## 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/docsprint.git
cd docsprint   

# Install frontend dependencies
npm install

# Start the client (in one terminal)
npm run dev

# Start the backend (in another terminal)
cd server
npm install
npm run dev
```
---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with CTA |
| `/login` | User login |
| `/register` | User registration |
| `/invoice` | Select between new invoice or view history |
| `/templates` | Choose an invoice template |
| `/invoiceform` | Fill out invoice form |
| `/bill` | Final invoice preview (PDF download view) |
| `/invoices` | View previously generated invoices (auth required) |
| `/documents` | Choose document type |
| `/documents/:type` | Fill document form (e.g., offer, experience) |
| `/documents/preview` | View and export document as PDF |
| `*` | 404 Page Not Found route |

---

## 🧠 Developer Notes

- Uses `React.lazy()` & `Suspense` for lazy loading all major pages
- Redux Toolkit for authentication and state management
- Protected routes with JWT (secured via HTTP-only cookies)
- Modular and scalable file structure
- Designed with responsiveness in mind using Tailwind CSS
- Deployed backend supports CORS, session management, and dotenv-based config

---
