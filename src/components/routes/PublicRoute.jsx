// npm modules
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) return <Navigate to="/" />
  return children
}

export default PublicRoute
