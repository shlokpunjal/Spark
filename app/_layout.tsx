import { Stack } from "expo-router";
import { FavoritesProvider } from "../context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from "@expo-google-fonts/lora";
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function ThemeToggleButton() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <TouchableOpacity style={styles.floatingButton} onPress={toggleTheme}>
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={24} color={isDark ? '#fff' : '#f5a623'} />
        </TouchableOpacity>
    )
}

function ThemedRoot() {
    const { colors } = useTheme()

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <Stack screenOptions={{ headerShown: false }} />
            <ThemeToggleButton />
        </View>
    )
}

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Lora_400Regular,
        Lora_600SemiBold,
        Lora_700Bold,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    })

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <FavoritesProvider>
                <ThemedRoot />
            </FavoritesProvider>
        </ThemeProvider>
    )
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    floatingButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: '#333',
        borderRadius: 24,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
})