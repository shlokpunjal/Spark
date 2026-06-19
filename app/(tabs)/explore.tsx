import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetch } from '../../hooks/useFetch';
import { ApiQuote } from '../../types/ApiQuote';
import { mapApiQuote } from '../../utils/mapApiQuote';
import { useFavorites } from '../../context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';

export default function Explore() {
  const { data, loading, error } = useFetch<ApiQuote[]>('https://dummyjson.com/quotes/random/10');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Something went wrong: {error}</Text>
      </SafeAreaView>
    );
  }

  const quotes = data?.map(mapApiQuote) ?? [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={quotes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const favorited = isFavorite(item.id);
          return (
            <View style={styles.card}>
              <Text style={styles.quoteText}>"{item.text}"</Text>
              <View style={styles.row}>
                <Text style={styles.author}>— {item.author}</Text>
                <TouchableOpacity onPress={() => (favorited ? removeFavorite(item.id) : addFavorite(item))}>
                  <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={22} color="#e74c3c" />
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
  list: { padding: 16 },
  card: { backgroundColor: '#f0f0f0', borderRadius: 12, padding: 16, marginBottom: 12 },
  quoteText: { fontSize: 16, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  author: { fontSize: 14, color: '#666' },
});