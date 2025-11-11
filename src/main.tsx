import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// buckert url //
// https://dwvimgujxqqxxpttayxe.supabase.co/storage/v1/object/public/profile_image/dress2.jpg