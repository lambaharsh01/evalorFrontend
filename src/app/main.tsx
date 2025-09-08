// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../style/index.css'

import { BrowserRouter } from 'react-router-dom'
import Router from './router.tsx'
import { Toaster } from "sonner"


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <Router />
    <Toaster
      position="top-right"
      richColors
      duration={3000}
      theme="light"
      toastOptions={{
        style: {
          borderRadius: "0.2rem",
        },
      }}
    />
  </BrowserRouter>
  // </StrictMode>,
)
