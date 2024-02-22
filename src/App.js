import { AppRoutes } from './Data/AppRoutes'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './Security/AuthContext'
import Login from './Pages/LoginPage/Login'
import AdminPanel from './Pages/Admin/AdminPanel'

function App() {
  let routes = Object.values(AppRoutes)

  function AuthenticatedRoute({ children }) {
    const AuthContext = useAuth()
    if (AuthContext.isAuthenticate) {
      //&& AuthContext.position != 'Admin'
      console.log(AuthContext.isAuthenticate)
      return children
    }
    return <Navigate to="/" />
  }

  function AuthenticatedRouteAdmin({ children }) {
    const AuthContext = useAuth()
    if (AuthContext.isAuthenticate) {
      return children
    }

    return <Navigate to="/" />
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={
              <AuthenticatedRouteAdmin>
                <AdminPanel />
              </AuthenticatedRouteAdmin>
            }
          />
          <Route path="/login" element={<Login />} />
          {routes.map((route, i) => {
            return (
              <Route
                key={i}
                path={route.path}
                element={
                  <AuthenticatedRoute>{route.component}</AuthenticatedRoute>
                }
              />
            )
          })}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
