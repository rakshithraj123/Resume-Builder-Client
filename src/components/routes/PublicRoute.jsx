// npm modules
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ user, children }) => {
  if (user) return <Navigate to="/" />
  return children
}

export default PublicRoute
