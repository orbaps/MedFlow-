# 🏥 MedFlow - Intelligent Drug Inventory Management System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, full-stack web application for managing pharmaceutical inventory across hospitals and retailers with AI-powered insights for demand forecasting and expiry risk optimization.

## ✨ Features

### 🏥 Hospital Management
- **Real-time Inventory Tracking** - Monitor medicine stock levels across departments
- **Expiry Alerts** - Automated notifications for medicines nearing expiration
- **AI-Powered Insights** - Demand forecasting and seasonal trend detection
- **Department-wise Organization** - Manage inventory by ICU, Emergency, Pharmacy, etc.
- **Batch Management** - Track individual batches with expiry dates and quantities

### 🏪 Retailer Portal
- **Order Management** - Process hospital orders with confirm/reject workflow
- **Stock Analytics** - Visualize top-requested medicines and trends
- **Real-time Updates** - Instant order status synchronization
- **Inventory Alerts** - Low stock and expiry warnings

### 🤖 AI Features
- **Demand Forecasting** - Predict future medicine requirements
- **Seasonal Trend Detection** - Identify patterns (e.g., dengue season)
- **Expiry Risk Optimization** - Suggest transfers or discounts for near-expiry stock
- **Smart Reordering** - Auto-generate purchase orders based on consumption trends

### 🔐 Security & Performance
- **JWT Authentication** - Secure token-based auth
- **Role-Based Access Control** - Hospital vs Retailer permissions
- **Rate Limiting** - Prevent API abuse
- **Error Handling** - Comprehensive error boundaries and logging
- **Input Validation** - Zod schema validation on forms
- **Security Headers** - Helmet.js protection

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **React Hook Form** + **Zod** for form validation
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Hot Toast** for notifications
- **Axios** for API calls

### Backend
- **Node.js** + **Express.js**
- **TypeScript** for type safety
- **Prisma ORM** with SQLite (dev) / PostgreSQL (prod)
- **JWT** for authentication
- **Winston** for logging
- **Helmet** for security
- **Express Rate Limit** for API protection
- **Morgan** for HTTP request logging
- **Compression** for response optimization

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/medflow.git
cd medflow
```

### Backend Setup
```bash
cd server
npm install

# Create .env file
cp .env.example .env

# Configure your .env file with:
# DATABASE_URL="file:./dev.db"
# JWT_SECRET="your-secret-key"
# PORT=3001
# NODE_ENV="development"

# Run Prisma migrations
npx prisma migrate dev

# Start backend server
npm run dev
```

### Frontend Setup
```bash
cd ..  # Back to root
npm install

# Start frontend dev server
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 🔑 Demo Credentials

### Hospital Account
- **Email**: `hospital@medflow.com`
- **Password**: `hospital123`

### Retailer Account
- **Email**: `retailer@medflow.com`
- **Password**: `retailer123`

## 📁 Project Structure

```
medflow/
├── src/                          # Frontend source
│   ├── api/                      # API client configuration
│   ├── components/               # Reusable React components
│   │   ├── layout/              # Header, Sidebar, Layout
│   │   └── shared/              # KPICard, StatusBadge, etc.
│   ├── features/                # Feature-based modules
│   │   ├── auth/                # Login, authentication
│   │   ├── hospital/            # Hospital dashboard
│   │   └── retailer/            # Retailer dashboard
│   ├── store/                   # Redux store & slices
│   │   ├── authSlice.ts
│   │   ├── inventorySlice.ts
│   │   ├── ordersSlice.ts
│   │   └── aiSlice.ts
│   ├── types/                   # TypeScript interfaces
│   └── App.tsx                  # Main app component
│
├── server/                      # Backend source
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Auth, error handling, security
│   │   ├── routes/             # API route definitions
│   │   ├── utils/              # Logger, helpers
│   │   └── index.ts            # Server entry point
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   └── logs/                   # Application logs
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Inventory
- `GET /api/inventory/medicines` - Get all medicines with batches
- `POST /api/inventory/medicines` - Create medicine
- `PATCH /api/inventory/batches/:id` - Update batch stock

### Orders
- `GET /api/orders` - Get orders (filtered by role)
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Alerts
- `GET /api/alerts` - Get alerts for entity
- `POST /api/alerts` - Create alert

### AI Insights
- `GET /api/ai/forecast/:medicineId` - Get demand forecast
- `GET /api/ai/expiry-risk/:hospitalId` - Get expiry risk analysis

## 🎨 UI/UX Features

- **Modern Gradient Design** - Premium aesthetic with blue-purple gradients
- **Responsive Layout** - Mobile-first design
- **Loading States** - Skeleton screens and spinners
- **Toast Notifications** - Real-time user feedback
- **Error Boundaries** - Graceful error handling
- **Form Validation** - Inline error messages
- **Smooth Animations** - Micro-interactions and transitions

## 🧪 Testing

```bash
# Frontend tests
npm run test

# Backend tests
cd server
npm run test

# Test coverage
npm run test:coverage
```

## 🚢 Deployment

### Using Docker
```bash
# Build and run with docker-compose
docker-compose up -d
```

### Manual Deployment
1. Build frontend: `npm run build`
2. Build backend: `cd server && npm run build`
3. Set environment variables
4. Run migrations: `npx prisma migrate deploy`
5. Start server: `npm start`

## 📊 Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role
  createdAt DateTime @default(now())
}

model Medicine {
  id          String   @id @default(uuid())
  name        String
  category    String
  batches     Batch[]
}

model Batch {
  id          String   @id @default(uuid())
  batchNumber String
  quantity    Int
  expiryDate  DateTime
  medicine    Medicine @relation(fields: [medicineId], references: [id])
}

model Order {
  id          String   @id @default(uuid())
  status      OrderStatus
  quantity    Int
  priority    Priority
  createdAt   DateTime @default(now())
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Your Name** - *Initial work*

## 🙏 Acknowledgments

- Design inspiration from modern healthcare dashboards
- Icons from Lucide React
- UI components styled with Tailwind CSS

---

**Built with ❤️ for better healthcare inventory management**
