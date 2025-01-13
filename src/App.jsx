import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  return (
    <StrictMode>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<User toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
export default App;
