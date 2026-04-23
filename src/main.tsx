import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Import the Provider we just built
import { AppProvider } from './context/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrapping App means every component inside can access the theme and invoices */}
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)