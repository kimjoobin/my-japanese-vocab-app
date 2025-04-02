import { RouterProvider } from 'react-router'
import { root } from './router/root'

function App() {
  return (
    <RouterProvider router={root}></RouterProvider>
  )
}

export default App
