import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeProvider";


const ThemeToggle = () => {
        const {theme, toggleTheme} = useContext(ThemeContext);

        return (
                <div>
                        <button onClick={toggleTheme}
                        className="p-2 rounded-md bg-gray-800 text-white dark:bg-gray-200 dark:text-black">
                                {theme === "light" ? '🌙 Dark' : '🌞 Light'}
                        </button>
                </div>
        );
};

export default ThemeToggle;