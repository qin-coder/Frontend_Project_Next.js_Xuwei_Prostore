# 🛒 ProStore - Modern E-commerce Platform

A comprehensive **full-stack e-commerce platform** built with **Next.js 15** and **React 19**. This project is based on Brad Traversy's advanced course and is designed to reflect **real-world production standards**.

ProStore integrates cutting-edge tools and libraries to implement features such as **authentication**, **admin dashboards**, **shopping carts**, **payment processing (Stripe & PayPal)**, **real-time updates**, and more.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.3  
- **Language**: TypeScript  
- **Database**: PostgreSQL with Prisma ORM (Neon Database)  
- **Authentication**: NextAuth.js (JWT, sessions, cookies)  
- **Styling**: Tailwind CSS 4 + tailwindcss-animate  
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) + Radix UI + Lucide Icons  
- **Forms**: React Hook Form + Zod Validation  
- **Email**: React Email with Resend  
- **File Upload**: UploadThing  
- **Payments**: Stripe & PayPal  
- **Data Visualization**: Recharts  
- **Carousel**: Embla Carousel  
- **Testing**: Jest + ts-jest  
- **State Management**: React Hooks  
- **Build Tools**: Webpack 5, ESLint, PostCSS, dotenv  

---

## ✨ Features

- ✅ User Authentication & Authorization (JWT / Session)
- 🛍️ Product Catalog with Category Filtering
- 🧺 Dynamic Shopping Cart
- 💳 Secure Payments with **Stripe** and **PayPal**
- 🧾 Order Management (User & Admin)
- 🔔 Email Notifications via **Resend**
- 🛠️ Admin Dashboard (Products, Orders, Users)
- 📤 File Upload for Product Images
- 📝 Review and Rating System
- 🎨 Dark Mode with **next-themes**
- 🔄 Real-time Updates
- 📈 Charts with Recharts
- 🧪 Unit Testing with **Jest**

---

## 📚 What's Included in This Project

- Built with **Next.js 15.3.3** and **React 19**
- Admin panel with product/user/order management
- Fully functional **shopping cart** and **checkout flow**
- Integrated **Stripe** and **PayPal** for secure payments
- Full **TypeScript** support and **Zod** schema validation
- **Prisma ORM** with **PostgreSQL** and Neon serverless support
- Authentication with **NextAuth.js** using JWT and cookies
- File uploads via **UploadThing**
- Dynamic UI built using **shadcn/ui**, **Radix UI**, and **Tailwind CSS**
- Email sending with **React Email** and **Resend**
- Real-time updates and modern UI interactions
- Testing using **Jest** and **ts-jest**

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
https://github.com/qin-coder/Frontend_Project_Next.js_Xuwei_Prostore.git

cd prostore

```

### 2. Install Dependencies

```bash
npm install
# or
yarn install

```

### 3. Set Up Environment Variables

```bash
#Copy the example environment file and fill in the required keys:

cp .env.example .env

Environment variables you'll need include:

DATABASE_URL

NEXTAUTH_SECRET

NEXTAUTH_URL

STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET

RESEND_API_KEY


```

### 4. Generate Prisma Client

```bash

npx prisma generate

```
### 5. Run Database Migrations

```bash

npx prisma migrate dev

```
### 6. Start Development Server

```bash

npm run dev


```



