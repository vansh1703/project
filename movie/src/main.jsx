import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expandedcard from './components/Expandedcard.jsx';
import Watchlist from './components/Watchlist.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movie/:id" element={<Expandedcard />} />
        <Route path="/watchlist" element={<Watchlist />} /> {/* 🟢 Add this */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
