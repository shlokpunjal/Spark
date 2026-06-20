import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDailyQuote } from '../../hooks/useDailyQuote';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';

const lightGradient = ['#4c669f', '#3b5998', '#192f6a'] as const;
const darkGradient = ['#0f0c29', '#302b63', '#24243e'] as const;

export default function Home() {
    const quote = useDailyQuote();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const { isDark, colors } = useTheme()

    const favorited = isFavorite(quote.id);

    function handleToggleFavorite() {
        if (favorited) {
            removeFavorite(quote.id);
        } else {
            addFavorite(quote);
        }
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background}]}>
            <LinearGradient
                colors={isDark ? darkGradient : lightGradient}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Text style={styles.quoteText}>"{quote.text}"</Text>
                    <Text style={styles.author}>— {quote.author}</Text>

                    <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
                        <Ionicons
                            name={favorited ? 'heart' : 'heart-outline'}
                            size={32}
                            color="#e74c3c"
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    gradient: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
    content: { alignItems: 'center' },
    quoteText: { fontSize: 24, fontFamily: 'Lora_600SemiBold', color: '#fff', textAlign: 'center', marginBottom: 16, fontWeight: '600' },
    author: { fontSize: 16, color: '#cce', textAlign: 'center', fontFamily: 'Poppins_400Regular' },
    favoriteButton: { marginTop: 24 },
});