import React from 'react'
import ReactDOM from 'react-dom/client'
import { ControlProvider } from './context/ControlProvider'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ControlProvider>
    <App />
  </ControlProvider>
)
