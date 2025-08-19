import { createContext, useContext, useState, ReactNode } from "react";

type ThemeContextType = {
  sidebarTheme: string;
  setSidebarTheme: (value: string) => void;
  bodyTheme: string;
  setBodyTheme: (value: string) => void;
  activeTheme: string;
  setActiveTheme: (value: string) => void;
  logoutTheme: string;
  setLogoutTheme: (value: string) => void;
  hoverTheme: string;
  setHoverTheme: (value: string) => void;
  textTheme: string;
  setTextTheme: (value: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarTheme, setSidebarTheme] = useState("bg-indigo-900");
  const [bodyTheme, setBodyTheme] = useState("bg-zinc-100");
  const [activeTheme, setActiveTheme] = useState("bg-indigo-700");
  const [logoutTheme, setLogoutTheme] = useState("bg-indigo-800");
  const [hoverTheme, setHoverTheme] = useState("hover:bg-indigo-700");
  const [textTheme, setTextTheme] = useState("text-indigo-600");

  return (
    <ThemeContext.Provider
      value={{ sidebarTheme, setSidebarTheme, bodyTheme, setBodyTheme, activeTheme, setActiveTheme, logoutTheme, setLogoutTheme, hoverTheme, setHoverTheme, textTheme, setTextTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};