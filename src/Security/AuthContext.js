import { apiClient } from '../Api/ApiClient'
import { executeJwtAuthenticationService } from '../Api/AuthenticationApi'
import { retrieveProfilePicture } from '../Services/Home/retrieveProfilePicture'

const { createContext, useContext, useState } = require('react')

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticate, setIsAuthenticate] = useState(false)
  const [token, setToken] = useState(null)
  const [position, setPosition] = useState(null)
  const [username, setUsername] = useState(null)
  const [nic, setNic] = useState(null)
  const [proPicUrl, setProPicUrl] = useState(null)

  

  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(username, password)
      if (response.status == 200) {
        const jwtToken = 'Bearer ' + response.data.jwtToken

        setIsAuthenticate(true)
        setUser(response.data.user)
        setToken(jwtToken)
        setPosition(response.data.user.position)
        setUsername(response.data.user.username)
        setNic(response.data.user.nic)
        setProPicUrl(response.data.imgUrl)

        apiClient.interceptors.request.use((config) => {
          console.log('intercepting and adding a token')
          config.headers.Authorization = jwtToken
          return config
        })
      } else {
        logout()
      }

      return response
    } catch (error) {
      console.error('Catch error')
      logout()
      return false
    }
  }

  function logout() {
    setIsAuthenticate(false)
    setToken(null)
    setUser(null)
  }

  //Newly Added......................................................
  
  // async function refreshPropilePicture(nic){
  //   const response= await retrieveProfilePicture(nic)
  //   setProUrl(response)
  // }

  

  // const updateCentralizeState=(newValues)=>{
  //     setProUrl(newValues)
  // }

  //.................................................................

  return (
    <AuthContext.Provider
      value={{
        isAuthenticate,
        user,
        login,
        logout,
        token,
        setIsAuthenticate,
        position,
        setPosition,
        username,
        nic,
        proPicUrl,

      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
