import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDailyQuote } from '../../hooks/useDailyQuote';
import { useFavorites } from '../../context/FavoritesContext';

export default function Home() {
    const quote = useDailyQuote();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    const favorited = isFavorite(quote.id);

    function handleToggleFavorite() {
        if (favorited) {
            removeFavorite(quote.id);
        } else {
            addFavorite(quote);
        }
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Text style={styles.quoteText}>"{quote.text}"</Text>
                    <Text style={styles.author}>— {quote.author}</Text>

                    <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
                        <Ionicons
                            name={favorited ? 'heart' : 'heart-outline'}
                            size={32}
                            color="#fff"
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
    quoteText: { fontSize: 24, color: '#fff', textAlign: 'center', marginBottom: 16, fontWeight: '600' },
    author: { fontSize: 16, color: '#cce', textAlign: 'center' },
    favoriteButton: { marginTop: 24 },
});