# Spark ✨

A motivational quotes app built with React Native (Expo SDK 54) - clean, offline-friendly, and fully theme-aware.

## Features

- **Home** - Shows the same motivational quote all day,picked deterministically from a hardcoded list using a day-of-year calculation. Works fully offline.
- **Explore** - Fetches live random quotes from a public quotes API. Includes loading states, error handling with a retry button, and pull-to-refresh.
- **Favorites** - Save any quote from Home or Explore into one shared favorites list. Persists across app restarts using AsyncStorage.
- **Dark Mode** - A floating toggle button (sun/moon icon) switches the entire app's theme — backgrounds, gradients, text, tab bar, and cards all adapt.
- **Custom Typography** - Lora for quote text, Poppins for UI elements (buttons, labels, author names).

## Tech Stack

- **React Native** (Expo SDK 54)
- **Expo Router** - file-based navigation with tab routing
- **TypeScript** - fully typed, including generic hooks
- **Context API** - `FavoritesContext` and `ThemeContext` for global state
- **AsyncStorage** - local persistence for favorites
- **expo-linear-gradient** - gradient backgrounds
- **@expo-google-fonts** - custom font loading (Lora, Poppins)

## Architecture Highlights

- A generic `useFetch<T>` hook handles all API calls - loading, error, and refetch states, decoupled from any specific data shape.
- API responses are mapped into the app's internal `Quote` type immediately after fetching, keeping the rest of the app shape-agnostic to the data source.
- Theme and Favorites state both follow the same Context pattern: a Provider holding state, paired with a custom hook (`useTheme()`, `useFavorites()`) that throws if used outside its Provider.

## Project Structure
```
spark/
├── app/              # Screens & navigation (Expo Router)
│   └── (tabs)/       # Home, Explore, Favorites tabs
├── context/          # FavoritesContext, ThemeContext
├── hooks/            # useFetch, useDailyQuote
├── data/             # Hardcoded quotes for Home
├── types/            # Quote, ApiQuote type definitions
└── utils/            # API, app type mapping
```

## Status

- Built as a learning project to practice React Native architecture (Context API, generic TypeScript hooks, and theme-driven UI) before applying the same patterns to a production client app.
- Would develop in future.

## Setup & Installation

1. Clone the repo and install dependencies:
```bash
   git clone https://github.com/shlokpunjal/spark
   cd spark
   npm config set legacy-peer-deps true
   npm install
```
- Recommended: restart typescript server



2. Start the dev server:
```bash
   npx expo start
```

3. Run on a device:
   - Scan the QR code with **Expo Go** (Android/iOS), or
   - Press `a` for Android emulator, `i` for iOS simulator

### Build a standalone APK (Android)
```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   eas build --platform android --profile preview
```