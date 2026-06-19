import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../../context/FavoritesContext';
import { Quote } from '../../types/Quote';

export default function Favorites() {
  const { favorites } = useFavorites();

  function renderItem({ item }: { item: Quote }) {
    return (
      <View style={styles.card}>
        <Text style={styles.quoteText}>"{item.text}"</Text>
        <Text style={styles.author}>— {item.author}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  list: { padding: 16 },
  card: { backgroundColor: '#e9e9e9', borderRadius: 12, padding: 16, marginBottom: 12 },
  quoteText: { fontSize: 16, marginBottom: 8 },
  author: { fontSize: 14, color: '#666' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#888' },
});