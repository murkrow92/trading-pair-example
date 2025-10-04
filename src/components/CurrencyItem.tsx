import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CurrencyInfo } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { CurrencyImage } from './CurrencyImage';
import { useCurrencyStore } from '../store/currencyStore';

interface Props {
  item: CurrencyInfo;
  onPress?: (item: CurrencyInfo) => void;
  showChevron?: boolean;
  showFavorite?: boolean;
}

export const CurrencyItem: React.FC<Props> = ({
  item,
  onPress,
  showChevron = true,
  showFavorite = false,
}) => {
  const { colors } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useCurrencyStore();

  const handleFavoritePress = () => {
    toggleFavorite(item.id);
  };

  return (
    <View style={[styles.row, { backgroundColor: colors.surface }]}>
      <TouchableOpacity
        style={styles.mainContent}
        onPress={() => onPress?.(item)}
        activeOpacity={0.7}
      >
        <CurrencyImage symbol={item.symbol} imageUrl={item.imageUrl} size={38} />
        <View style={styles.nameCol}>
          <Text style={[styles.name, { color: colors.textPrimary }]}>{item.name}</Text>
          <Text style={[styles.symbol, { color: colors.textSecondary }]}>
            {item.code ?? item.symbol}
          </Text>
        </View>
        <View style={styles.rightCol}>
          {item.price && (
            <Text style={[styles.price, { color: colors.textPrimary }]}>
              ${item.price.toLocaleString()}
            </Text>
          )}
          {item.change24h && (
            <Text
              style={[
                styles.change,
                { color: item.change24h >= 0 ? colors.success : colors.error },
              ]}
            >
              {item.change24h >= 0 ? '+' : ''}
              {item.change24h.toFixed(2)}%
            </Text>
          )}
          {showChevron && (
            <Ionicons name="chevron-forward" size={18} color={colors.iconSecondary} />
          )}
        </View>
      </TouchableOpacity>

      {showFavorite && (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite(item.id) ? colors.error : colors.iconSecondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nameCol: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  symbol: {
    fontSize: 13,
    opacity: 0.7,
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 80,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  change: {
    fontSize: 13,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 8,
    marginLeft: 8,
  },
});
