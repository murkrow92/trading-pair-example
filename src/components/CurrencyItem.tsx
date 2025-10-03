import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CurrencyInfo } from '../types';

interface Props {
  item: CurrencyInfo;
  onPress?: (item: CurrencyInfo) => void;
  showChevron?: boolean;
}

export const CurrencyItem: React.FC<Props> = ({ item, onPress, showChevron = true }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress?.(item)} activeOpacity={0.7}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name?.[0]?.toUpperCase()}</Text>
      </View>
      <View style={styles.nameCol}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.code}>{item.code ?? item.symbol}</Text>
        {showChevron && <Ionicons name="chevron-forward" size={18} color="#A0A4A8" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#474D57',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFFFFF', fontWeight: '700' },
  nameCol: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, color: '#0B1220' },
  rightCol: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  code: { fontSize: 14, color: '#606A75', marginRight: 6 },
});
