import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Utils/ThemeOptions";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children})=>{
    const defaultTheme = JSON.parse(localStorage.getItem("theme")) || themeOptions[0].value;
const [theme, settheme] = useState(defaultTheme);

const values = {
    theme,settheme,defaultTheme
}
return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
)
}

export const useTheme = ()=>useContext(ThemeContext)
