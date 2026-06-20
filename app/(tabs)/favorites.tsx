import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { Quote } from '../../types/Quote';

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites()
  const { colors } = useTheme()

  function renderItem({ item }: { item: Quote }) {
    return (
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.quoteText, { color: colors.text }]}>"{item.text}"</Text>
        <View style={styles.row}>
          <Text style={[styles.author, { color: colors.subtext }]}>— {item.author}</Text>
          <TouchableOpacity onPress={() => removeFavorite(item.id)}>
            <Ionicons name="heart" size={22} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: colors.subtext }]}>No favorites yet</Text>
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
  list: { padding: 16, paddingBottom: 100 },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  quoteText: { fontSize: 17, lineHeight: 24, marginBottom: 12, fontFamily: 'Lora_400Regular' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  author: { fontSize: 13, fontFamily: 'Poppins_400Regular' },
  heartButton: { padding: 4 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyText: { fontSize: 16, fontFamily: 'Poppins_400Regular' },
});