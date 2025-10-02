# Crypto Tracker App

A React Native cryptocurrency tracking app built with Expo, following Android architecture guidelines.

## Features

- 📊 Real-time cryptocurrency prices
- 📈 Interactive price charts
- ❤️ Favorites functionality
- 🔄 Pull-to-refresh
- 📱 Modern, responsive UI
- 🎯 Clean architecture following Android guidelines

## Architecture

This app follows the recommended Android app architecture with clear separation of concerns:

### Data Layer

- `src/services/` - API services for data fetching
- `src/types/` - Type definitions and data models

### Domain Layer

- `src/contexts/` - State management and business logic
- `src/utils/` - Utility functions and formatters

### UI Layer

- `src/screens/` - Screen components
- `src/components/` - Reusable UI components
- `src/navigation/` - Navigation setup

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Axios** for API calls
- **React Native Chart Kit** for price charts
- **Expo Vector Icons** for icons
- **CoinGecko API** for cryptocurrency data

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager
- Expo CLI
- iOS Simulator or Android Emulator (for mobile testing)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run web    # For web development
   pnpm run ios    # For iOS simulator
   pnpm run android # For Android emulator
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CryptoCard.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorView.tsx
│   └── PriceChart.tsx
├── contexts/           # State management
│   └── CryptoContext.tsx
├── navigation/         # Navigation setup
│   └── AppNavigator.tsx
├── screens/           # Screen components
│   ├── HomeScreen.tsx
│   ├── DetailsScreen.tsx
│   └── FavoritesScreen.tsx
├── services/          # API services
│   └── cryptoService.ts
├── types/            # Type definitions
│   └── index.ts
└── utils/            # Utility functions
    └── formatters.ts
```

## Key Features Implementation

### 1. Clean Architecture

- **Data Layer**: API services handle data fetching
- **Domain Layer**: Context provides state management and business logic
- **UI Layer**: Components and screens handle presentation

### 2. State Management

- Uses React Context and useReducer for predictable state updates
- Centralized state management for cryptocurrencies and favorites
- Error handling and loading states

### 3. API Integration

- CoinGecko API for real-time cryptocurrency data
- Error handling and retry mechanisms
- Type-safe API responses

### 4. Modern UI/UX

- Material Design principles
- Responsive design for different screen sizes
- Smooth animations and transitions
- Pull-to-refresh functionality

## API Endpoints Used

- `GET /coins/markets` - Get top cryptocurrencies
- `GET /coins/{id}/market_chart` - Get price history
- `GET /coins/markets` - Get specific cryptocurrency details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
