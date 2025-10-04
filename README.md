# Crypto Mobile App

A React Native mobile application for cryptocurrency management built with Expo, featuring dark theme, favorites management, and real-time API integration.

## 🚀 Key Features

- **Dark/Light Theme**: Toggle between dark and light interfaces
- **Cryptocurrency Management**: Display crypto and fiat currencies
- **Search Functionality**: Search by name or symbol
- **Favorites**: Mark and manage favorite currencies
- **Live API**: Integrate with CoinGecko API for real-time data
- **Database**: Local data storage with SQLite
- **Caching**: Use React Query for data caching
- **i18n**: Multi-language support (English/Vietnamese)

## 🛠️ Technologies Used

- **React Native** with **Expo**
- **TypeScript** for type safety
- **Zustand** for state management
- **React Query** for data fetching and caching
- **SQLite** for local database
- **i18next** for internationalization
- **Jest** for unit testing

## 📋 System Requirements

- Node.js >= 16.0.0
- pnpm (recommended) or npm
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

## 🔧 Installation

### 1. Clone repository
```bash
git clone <repository-url>
cd crypto-mobile-app
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Run the application
```bash
# Start Expo development server
pnpm start

# Or run on specific platform
pnpm ios     # iOS
pnpm android # Android
pnpm web     # Web
```

## 📱 Usage

### Main Screens
- **Demo Screen**: Display currencies list from mock data
- **Live API**: Show real-time data from CoinGecko API
- **Search**: Search currencies by name or symbol
- **Favorites**: View and manage favorite currencies

### Search Functionality
- Search by currency name (e.g., "Bitcoin", "bit")
- Search by symbol (e.g., "BTC", "btc")
- Case-insensitive search
- Supports partial keyword matching

### Favorites Management
- Tap ❤️ icon to add/remove favorites
- View favorites list in dedicated tab
- Favorites are persisted across app restarts

### Theme Switching
- Tap theme icon to toggle dark/light mode
- Theme preference is saved and restored on app restart

## 🧪 Testing

### Run Tests
```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test --coverage

# Run tests in watch mode
pnpm test --watch
```

### Test Structure
```
__tests__/
├── search-typescript.test.ts      # Search logic tests
├── database-typescript.test.ts    # Database operations tests
└── favorites-typescript.test.ts   # Favorites management tests
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CurrencyItem.tsx
│   ├── CurrencyList.tsx
│   ├── CurrencyImage.tsx
│   └── ui/             # UI components
├── contexts/           # React contexts
├── db/                 # Database layer
├── hooks/              # Custom hooks
├── i18n/               # Internationalization
├── mock/               # Mock data
├── navigation/         # Navigation setup
├── providers/          # Context providers
├── screens/            # Screen components
├── services/           # Business logic services
├── store/              # Zustand stores
├── theme/              # Theme management
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## 🔧 Configuration

### Environment Variables
Create `.env` file in root directory:
```env
EXPO_PUBLIC_API_URL=https://api.coingecko.com/api/v3
```

### Database
- SQLite database is automatically created on startup
- Schema migration is handled automatically
- Database file: `currency.db`

### API Configuration
- **CoinGecko API**: Default endpoint for live data
- **Rate limiting**: Handled automatically
- **Caching**: React Query cache for 5 minutes

## 🚀 Build and Deploy

### Development Build
```bash
# iOS
expo build:ios

# Android
expo build:android
```

### Production Build
```bash
# EAS Build (recommended)
eas build --platform all

# Or build locally
expo build:ios --type archive
expo build:android --type apk
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler won't start**
   ```bash
   npx expo start --clear
   ```

2. **Database errors**
   ```bash
   # Delete database and restart
   rm currency.db
   pnpm start
   ```

3. **TypeScript errors**
   ```bash
   npx tsc --noEmit
   ```

4. **Test failures**
   ```bash
   npx jest --clearCache
   ```

### Performance Issues
- Use React Query DevTools to debug caching
- Check memory usage with Flipper
- Optimize images with expo-image

## 📚 API Reference

### Services
- `DatabaseService`: Manage database operations
- `SearchService`: Handle search logic
- `FavoritesService`: Manage favorites

### Hooks
- `useCryptoQueries`: React Query hooks for API calls
- `useI18n`: Internationalization hook
- `useTheme`: Theme management hook

### Stores
- `useAppStore`: Main application state
- `useThemeStore`: Theme state management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- CoinGecko API for cryptocurrency data
- Expo team for React Native framework
- React Query team for data fetching solution
