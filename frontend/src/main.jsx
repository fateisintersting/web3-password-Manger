import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3PasswordManager from './components/Web3PasswordManager.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>

//     <App />
//   </StrictMode>,
// )


const MainApp = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Web3PasswordManager />} />
          <Route path="/home" element={<App />} />
        </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<MainApp />);
