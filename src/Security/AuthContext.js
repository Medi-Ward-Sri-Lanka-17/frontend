import { apiClient } from '../Api/ApiClient'
import { executeJwtAuthenticationService } from '../Api/AuthenticationApi'

const { createContext, useContext } = require('react')

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

function logout() {
  setIsAuthenticate(false)
  setToken(null)
  setUser(null)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticate, setIsAuthenticate] = useState(false)
  const [token, setToken] = useState(null)

  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(username, password)

      if (response.status == 200) {
        const jwtToken = 'Bearer ' + response.data.jwtToken

        setIsAuthenticate(true)
        setUser(response.data.user)
        setToken(jwtToken)

        apiClient.interceptors.request.use((config) => {
          console.log('intercepting and adding a token')
          config.headers.Authorization = jwtToken
          return config
        })

        return true
      } else {
        logout()
        console.error(response.status)
        return false
      }
    } catch (error) {
      console.error(response.status)
      logout()
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticate, user, login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  )
}
