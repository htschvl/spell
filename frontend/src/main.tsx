import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import NFTMarketplace from './pages/NFTMarketplace.tsx'
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
      { path: '/about', element: <About /> },
      { path: '/buy-nft', element: <NFTMarketplace /> },
      { path: '/contact', element: <ContactUs /> },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
