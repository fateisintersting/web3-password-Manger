import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3PasswordManager from './components/Web3PasswordManager.jsx'
import Home from './components/Home.jsx';


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
          <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<MainApp />);
