// UI Layer - Home screen with crypto list
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useCrypto } from '../contexts/CryptoContext';
import { CryptoCard } from '../components/CryptoCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorView } from '../components/ErrorView';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { state, fetchCryptocurrencies, toggleFavorite, isFavorite } = useCrypto();

  const handleCryptoPress = (crypto: any) => {
    navigation.navigate('Details', { crypto });
  };

  const handleRefresh = () => {
    fetchCryptocurrencies();
  };

  const renderCryptoItem = ({ item }: { item: any }) => (
    <CryptoCard
      crypto={item}
      onPress={() => handleCryptoPress(item)}
      onToggleFavorite={() => toggleFavorite(item.id)}
      isFavorite={isFavorite(item.id)}
    />
  );

  if (state.cryptocurrencies.loading && state.cryptocurrencies.data.length === 0) {
    return <LoadingSpinner message="Loading cryptocurrencies..." />;
  }

  if (state.cryptocurrencies.error) {
    return (
      <ErrorView
        message={state.cryptocurrencies.error}
        onRetry={fetchCryptocurrencies}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Tracker</Text>
        <Text style={styles.subtitle}>Top Cryptocurrencies</Text>
      </View>
      
      <FlatList
        data={state.cryptocurrencies.data}
        renderItem={renderCryptoItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={state.cryptocurrencies.loading}
            onRefresh={handleRefresh}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    paddingVertical: 8,
  },
});
