import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './Context/ThemeContext.tsx'
import { MetaMaskContextProvider } from './Context/MetaMaskContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MetaMaskContextProvider>
          <App />
        </MetaMaskContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
