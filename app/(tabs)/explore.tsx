import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetch } from '../../hooks/useFetch';
import { ApiQuote } from '../../types/ApiQuote';
import { mapApiQuote } from '../../utils/mapApiQuote';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Explore() {
  const { data, loading, error, refetch } = useFetch<ApiQuote[]>('https://dummyjson.com/quotes/random/10');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { colors } = useTheme();

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.text} />
        <Text style={[styles.loadingText, { color: colors.subtext }]}>Fetching fresh quotes...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: colors.background }]}>
        <Ionicons name="cloud-offline-outline" size={48} color={colors.subtext} />
        <Text style={[styles.errorText, { color: colors.text }]}>Couldn't load quotes</Text>
        <Text style={[styles.errorSubtext, { color: colors.subtext }]}>{error}</Text>
        <TouchableOpacity onPress={refetch} style={[styles.retryButton, { backgroundColor: colors.card }]}>
          <Text style={[styles.retryText, { color: colors.text }]}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const quotes = data?.map(mapApiQuote) ?? [];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <FlatList
        data={quotes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={colors.text} />
        }
        renderItem={({ item }) => {
          const favorited = isFavorite(item.id);
          return (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.quoteText, { color: colors.text }]}>"{item.text}"</Text>
              <View style={styles.row}>
                <Text style={[styles.author, { color: colors.subtext }]}>— {item.author}</Text>
                <TouchableOpacity
                  onPress={() => (favorited ? removeFavorite(item.id) : addFavorite(item))}
                  style={styles.heartButton}
                >
                  <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={24} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16, paddingBottom: 80 },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  quoteText: { fontSize: 17, lineHeight: 24, marginBottom: 12, fontFamily: 'Lora_400Regular' },
  author: { fontSize: 13, fontFamily: 'Poppins_400Regular' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heartButton: { padding: 4 },
  errorText: { fontSize: 16, fontFamily: 'Poppins_500Medium' },
  errorSubtext: { fontSize: 13, fontFamily: 'Poppins_400Regular', textAlign: 'center' },
  retryButton: { marginTop: 8, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  retryText: { fontFamily: 'Poppins_500Medium', fontSize: 14 },
  loadingText: { fontSize: 14, fontFamily: 'Poppins_400Regular', marginTop: 16 },
});