// npm modules
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/" />
  return children
}

export default ProtectedRoute
