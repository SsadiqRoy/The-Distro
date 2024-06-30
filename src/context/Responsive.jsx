import { createContext, useContext, useState } from "react";

const Context = createContext();

function Responsive({ children }) {
  const [isOpenSidebar, setOpenSidebar] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const value = {
    isOpenSidebar,
    setOpenSidebar,
    isDarkMode,
    setDarkMode,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useResponsive() {
  const context = useContext(Context);

  if (!context) throw new Error("You call the useResponsive outside Responsive Context");
  return context;
}

export default Responsive;
