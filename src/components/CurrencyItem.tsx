import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CurrencyInfo } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { CurrencyImage } from './CurrencyImage';

interface Props {
  item: CurrencyInfo;
  onPress?: (item: CurrencyInfo) => void;
  showChevron?: boolean;
}

export const CurrencyItem: React.FC<Props> = ({ item, onPress, showChevron = true }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity style={[styles.row, { backgroundColor: colors.surface }]} onPress={() => onPress?.(item)} activeOpacity={0.7}>
      <CurrencyImage 
        symbol={item.symbol} 
        imageUrl={item.imageUrl} 
        size={38}
      />
      <View style={styles.nameCol}>
        <Text style={[styles.name, { color: colors.textPrimary }]}>{item.name}</Text>
        {item.price && (
          <Text style={[styles.price, { color: colors.textSecondary }]}>
            ${item.price.toLocaleString()}
          </Text>
        )}
      </View>
      <View style={styles.rightCol}>
        <Text style={[styles.code, { color: colors.textTertiary }]}>{item.code ?? item.symbol}</Text>
        {item.change24h && (
          <Text style={[
            styles.change, 
            { color: item.change24h >= 0 ? colors.success : colors.error }
          ]}>
            {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
          </Text>
        )}
        {showChevron && <Ionicons name="chevron-forward" size={18} color={colors.iconSecondary} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  nameCol: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: '600' },
  price: { fontSize: 14, marginTop: 2 },
  rightCol: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  code: { fontSize: 14, marginRight: 6 },
  change: { fontSize: 12, fontWeight: '600' },
});
