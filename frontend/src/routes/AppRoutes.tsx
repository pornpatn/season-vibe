import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import InventoryListPage from '../pages/inventory/InventoryListPage'
import InventoryDetailPage from '../pages/inventory/InventoryDetailPage'
// import OrdersPage from './pages/OrdersPage'
// import UsersPage from './pages/UsersPage'
// import ReportsPage from './pages/ReportsPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <InventoryListPage />
          </PrivateRoute>
        }
      />
      <Route path="/inventory/:id" element={<PrivateRoute><InventoryDetailPage /></PrivateRoute>} />
      {/* <Route
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
