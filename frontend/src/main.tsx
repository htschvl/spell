import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import App from './App.tsx'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import NTFs from './pages/NTFs.tsx'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import './index.scss'
import NotFound from './pages/NotFound.tsx'

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/nfts', element: <NTFs /> },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
