import { createContext, useContext, useEffect, useState } from "react";
import { COLOR_MODE_LOCALSTROGE_KEY } from "../utilities/variables";
import { getCurrentPage } from "../utilities/utilities";

const Context = createContext();

function Responsive({ children }) {
  const [isOpenSidebar, setOpenSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const [isDarkMode, setDarkMode] = useState(() => {
    let isDark = localStorage.getItem(COLOR_MODE_LOCALSTROGE_KEY);
    if (isDark) return JSON.parse(isDark);

    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log(isDark, "after local storage check");
    return isDark;
  });

  const toggleDarkMode = () => setDarkMode((dark) => !dark);

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => setDarkMode(e.matches));
  }, [setDarkMode]);

  useEffect(() => {
    const currentTheme = isDarkMode ? "dark" : "light";
    const notCurrenTheme = isDarkMode ? "light" : "dark";

    document.querySelector("html").classList.remove(notCurrenTheme);
    document.querySelector("html").classList.add(currentTheme);

    localStorage.setItem(COLOR_MODE_LOCALSTROGE_KEY, JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const value = {
    isOpenSidebar,
    setOpenSidebar,
    isDarkMode,
    toggleDarkMode,
    currentPage,
    setCurrentPage,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useResponsive() {
  const context = useContext(Context);

  if (!context) throw new Error("You call the useResponsive outside Responsive Context");
  return context;
}

export default Responsive;
