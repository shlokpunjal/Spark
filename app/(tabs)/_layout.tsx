import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const { colors, isDark } = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? '#fff' : '#192f6a',
        tabBarInactiveTintColor: colors.subtext,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: isDark ? '#2a2a2a' : '#e5e5e5',
        },
        tabBarLabelStyle: { fontFamily: 'Poppins_500Medium', fontSize: 12 },
      }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explore', tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: 'Favorites', tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} /> }}
      />
    </Tabs>
  );
}