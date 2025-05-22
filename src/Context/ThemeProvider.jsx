import { createContext, useEffect, useState } from "react";


const ThemeContext = createContext()

const ThemeProvider = ({children}) => {
        const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

        useEffect(()=> {
                const root = document.documentElement;
                root.setAttribute("data-theme", theme);
                localStorage.setItem("theme", theme);
        }, [theme])

        const toggleTheme = () => {
                setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')
        }
        return (
                <ThemeContext.Provider value={{theme, toggleTheme}}>
                        {children}
                </ThemeContext.Provider>
        );
};

export {ThemeContext, ThemeProvider};