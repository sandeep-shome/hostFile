import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") || false
  );

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
