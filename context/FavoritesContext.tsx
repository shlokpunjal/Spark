import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Quote } from "../types/Quote";

type FavoritesContextType = {
    favorites: Quote[]
    addFavorite: (quote: Quote) => void
    removeFavorite: (id: string) => void
    isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)
const STORAGE_KEY = "spark_favorites"

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Quote[]>([])

    useEffect(() => {
        async function loadFavorites() {
            const stored = await AsyncStorage.getItem(STORAGE_KEY)
            if (stored) {
                setFavorites(JSON.parse(stored))
            }
        }
        loadFavorites()
    },[])

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    }, [favorites])

    function addFavorite(quote: Quote) {
        setFavorites(prev => [...prev, quote])
    }

    function removeFavorite(id: string) {
        setFavorites(prev => prev.filter(q => q.id !== id))
    }

    function isFavorite(id: string) {
        return favorites.some(q => q.id === id)
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext)

    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider")
    }
    return context
}