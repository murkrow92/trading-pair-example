// UI Layer - Crypto details screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, CryptoPriceHistory } from '../types';
import { cryptoService } from '../services/cryptoService';
import { PriceChart } from '../components/PriceChart';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorView } from '../components/ErrorView';
import { useCrypto } from '../contexts/CryptoContext';
import {
  formatPrice,
  formatMarketCap,
  formatVolume,
  formatPercentage,
  formatDate,
} from '../utils/formatters';

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
  const { crypto } = route.params;
  const { toggleFavorite, isFavorite } = useCrypto();
  const [priceHistory, setPriceHistory] = useState<CryptoPriceHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPriceHistory();
  }, [crypto.id]);

  const fetchPriceHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const history = await cryptoService.getCryptoPriceHistory(crypto.id, 7);
      setPriceHistory(history);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load price history');
    } finally {
      setLoading(false);
    }
  };

  const isPositive = crypto.price_change_percentage_24h >= 0;

  if (loading) {
    return <LoadingSpinner message="Loading price history..." />;
  }

  if (error) {
    return (
      <ErrorView
        message={error}
        onRetry={fetchPriceHistory}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Image source={{ uri: crypto.image }} style={styles.logo} />
            <View style={styles.headerInfo}>
              <Text style={styles.symbol}>{crypto.symbol.toUpperCase()}</Text>
              <Text style={styles.name}>{crypto.name}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(crypto.id)}
          >
            <Ionicons
              name={isFavorite(crypto.id) ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite(crypto.id) ? '#FF1744' : '#666'}
            />
          </TouchableOpacity>
        </View>

        {/* Price Section */}
        <View style={styles.priceSection}>
          <Text style={styles.currentPrice}>{formatPrice(crypto.current_price)}</Text>
          <View style={[styles.changeContainer, isPositive ? styles.positive : styles.negative]}>
            <Ionicons
              name={isPositive ? 'trending-up' : 'trending-down'}
              size={16}
              color={isPositive ? '#00C853' : '#FF1744'}
            />
            <Text style={[styles.change, isPositive ? styles.positive : styles.negative]}>
              {formatPercentage(crypto.price_change_percentage_24h)} (24h)
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Market Cap</Text>
            <Text style={styles.statValue}>{formatMarketCap(crypto.market_cap)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Volume (24h)</Text>
            <Text style={styles.statValue}>{formatVolume(crypto.total_volume)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Rank</Text>
            <Text style={styles.statValue}>#{crypto.market_cap_rank}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Last Updated</Text>
            <Text style={styles.statValue}>{formatDate(crypto.last_updated)}</Text>
          </View>
        </View>

        {/* Price Chart */}
        {priceHistory && (
          <PriceChart
            priceHistory={priceHistory}
            currentPrice={crypto.current_price}
            symbol={crypto.symbol}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  favoriteButton: {
    padding: 8,
  },
  priceSection: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  positive: {
    color: '#00C853',
  },
  negative: {
    color: '#FF1744',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statItem: {
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
