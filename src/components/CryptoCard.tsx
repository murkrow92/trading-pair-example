// UI Layer - Reusable component for displaying crypto information
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CryptoCurrency } from '../types';
import { formatPrice, formatMarketCap, formatPercentage } from '../utils/formatters';

interface CryptoCardProps {
  crypto: CryptoCurrency;
  onPress: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({
  crypto,
  onPress,
  onToggleFavorite,
  isFavorite,
}) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Image source={{ uri: crypto.image }} style={styles.logo} />
          <View style={styles.info}>
            <Text style={styles.symbol}>{crypto.symbol.toUpperCase()}</Text>
            <Text style={styles.name} numberOfLines={1}>
              {crypto.name}
            </Text>
            <Text style={styles.rank}>#{crypto.market_cap_rank}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.priceSection}>
            <Text style={styles.price}>{formatPrice(crypto.current_price)}</Text>
            <View style={[styles.changeContainer, isPositive ? styles.positive : styles.negative]}>
              <Ionicons
                name={isPositive ? 'trending-up' : 'trending-down'}
                size={12}
                color={isPositive ? '#00C853' : '#FF1744'}
              />
              <Text style={[styles.change, isPositive ? styles.positive : styles.negative]}>
                {formatPercentage(crypto.price_change_percentage_24h)}
              </Text>
            </View>
          </View>
          <Text style={styles.marketCap}>
            {formatMarketCap(crypto.market_cap)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? '#FF1744' : '#666'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rank: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  priceSection: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  positive: {
    color: '#00C853',
  },
  negative: {
    color: '#FF1744',
  },
  marketCap: {
    fontSize: 12,
    color: '#666',
  },
  favoriteButton: {
    padding: 4,
  },
});
