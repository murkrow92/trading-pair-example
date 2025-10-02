// UI Layer - Favorites screen
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useCrypto } from '../contexts/CryptoContext';
import { CryptoCard } from '../components/CryptoCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Favorites'>;

interface FavoritesScreenProps {
  navigation: FavoritesScreenNavigationProp;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const { state, toggleFavorite, isFavorite } = useCrypto();

  const favoriteCryptos = state.cryptocurrencies.data.filter(crypto =>
    state.favorites.includes(crypto.id)
  );

  const handleCryptoPress = (crypto: any) => {
    navigation.navigate('Details', { crypto });
  };

  const renderCryptoItem = ({ item }: { item: any }) => (
    <CryptoCard
      crypto={item}
      onPress={() => handleCryptoPress(item)}
      onToggleFavorite={() => toggleFavorite(item.id)}
      isFavorite={isFavorite(item.id)}
    />
  );

  if (state.cryptocurrencies.loading) {
    return <LoadingSpinner message="Loading favorites..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          {favoriteCryptos.length} favorite {favoriteCryptos.length === 1 ? 'cryptocurrency' : 'cryptocurrencies'}
        </Text>
      </View>
      
      {favoriteCryptos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyMessage}>
            Tap the heart icon on any cryptocurrency to add it to your favorites.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteCryptos}
          renderItem={renderCryptoItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
