import { ThemeContext } from "@/Context/ThemeContext";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};