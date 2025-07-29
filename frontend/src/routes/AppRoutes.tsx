import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import InventoryListPage from '../features/inventory/InventoryListPage'
import InventoryItemDetailPage from '../features/inventory/InventoryItemDetailPage'
import CategoryListPage from '../features/inventory/CategoryListPage'
import UnitListPage from '../features/inventory/UnitListPage'
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
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <InventoryListPage />
          </ProtectedRoute>
        }
      />
      <Route path="/inventory/:id" element={<ProtectedRoute><InventoryItemDetailPage /></ProtectedRoute>} />
      <Route
        path="/inventoryCategory"
        element={
          <ProtectedRoute>
            <CategoryListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventoryUnit"
        element={
          <ProtectedRoute>
            <UnitListPage />
          </ProtectedRoute>
        }
      />
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
