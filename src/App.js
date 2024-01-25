import { AppRoutes } from './Data/AppRoutes'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  let routes = Object.values(AppRoutes)

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => {
          return <Route key={i} path={route.path} element={route.component} />
        })}
      </Routes>
    </BrowserRouter>
    // <Router>
    //   <Routes>
    //     {routes.map((route, i) => {
    //       return <Route key={i} path={route.path} element={route.component} />
    //     })}
    //   </Routes>
    // </Router>
  )
}

export default App
