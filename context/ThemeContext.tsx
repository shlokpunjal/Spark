import { createContext, useContext, useState, ReactNode } from "react";

type Colors = {
    background: string
    text: string
    card: string
    subtext: string
}

type ThemeContextType = {
    isDark: boolean
    colors: Colors
    toggleTheme: () => void
}

const lightColors: Colors = {
    background: "#e7e6e6",
    text: "#1a1a1a",
    card: "#f0f0f0",
    subtext: "#666666",
}

const darkColors: Colors = {
    background: "#121212",
    text: "#f5f5f5",
    card: "#1e1e1e",
    subtext: "#aaaaaa",
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(false)

    const colors = isDark ? darkColors : lightColors

    function toggleTheme() {
        setIsDark(prev => !prev)
    }

    return (
        <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)

    if(!context){
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}