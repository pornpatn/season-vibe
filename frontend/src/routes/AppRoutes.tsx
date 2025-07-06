import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import VitePage from '../pages/VitePage'
// import InventoryPage from './pages/InventoryPage'
// import OrdersPage from './pages/OrdersPage'
// import UsersPage from './pages/UsersPage'
// import ReportsPage from './pages/ReportsPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vite" element={<VitePage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <InventoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <ReportsPage />
          </PrivateRoute>
        }
      /> */}

      {/* Not Found / 404 */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
