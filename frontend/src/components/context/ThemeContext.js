import { createTheme, ThemeProvider } from "@mui/material";
import { useContext, createContext, useState, useMemo } from "react";

// Creating the theme context
const ThemeContext = createContext();

// ThemeContextProvider component
export const ThemeContextProvider = ({ children }) => {
  // Defining the theme using createTheme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#408663', // The primary color you want
          },
        },
        typography: {
          fontFamily: 'Poppins, sans-serif',
        },
      }),
    []
  );

  // Returning ThemeProvider to wrap children and pass theme down
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ theme }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);
