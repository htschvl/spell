import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import Home from './pages/Home.tsx'
import NTFs from './pages/NTFs.tsx'
// import Collabs from './pages/Collabs.tsx'
import ContactUs from './pages/ContactUs.tsx'
import NotFound from './pages/NotFound.tsx'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import './index.scss'

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/nfts', element: <NTFs /> },
      // { path: '/collabs', element: <Collabs /> },
      { path: '/contact', element: <ContactUs /> },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
