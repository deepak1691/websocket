import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './componets/ContextApi.jsx'
import { SocketProvider } from './context/SocketContext.jsx';
import  { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <StrictMode>
    <SocketProvider>
    <App />
    <Toaster/>
    </SocketProvider>
   
  </StrictMode>
  </AuthProvider>
)
