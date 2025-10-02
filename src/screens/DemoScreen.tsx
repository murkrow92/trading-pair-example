import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCurrency } from '../contexts/CryptoContext';
import { CurrencyItem } from '../components/CurrencyItem';
import { CustomButton } from '../components/CustomButton';
import { CurrencyList } from '../components/CurrencyList';

export const DemoScreen: React.FC = () => {
  const { state, setModeA, setModeB, setModeAll, setQuery, clearQuery, getFilteredList, insertMockA, insertMockB, clearDatabase } = useCurrency();

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const filtered = getFilteredList();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Currencies</Text>
        <Text style={styles.subheading}>Demo of reusable list + search</Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.row}>
          <CustomButton label="Clear DB" icon="trash-outline" variant="ghost" onPress={clearDatabase} />
          <CustomButton label="Insert DB" icon="download-outline" variant="primary" onPress={async () => { await insertMockA(); await insertMockB(); }} />
        </View>
        <View style={styles.row}>
          <CustomButton label="Use List A - Crypto" icon="logo-bitcoin" variant="primary" onPress={setModeA} />
          <CustomButton label="Use List B - Fiat" icon="cash-outline" variant="primary" onPress={setModeB} />
        </View>
        <View style={styles.row}>
          <CustomButton label="Show Purchasable (A+B)" icon="cart-outline" variant="primary" onPress={setModeAll} />
        </View>
      </View>

      {state.loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      )}

      {showSearch ? (
        <CurrencyList
          items={filtered}
          query={state.query}
          onQueryChange={setQuery}
          onCancelSearch={() => {
            clearQuery();
            setShowSearch(false);
          }}
        />
      ) : (
        <View style={styles.card}>
          <View style={styles.searchTriggerWrap}>
            <View style={styles.searchTrigger}>
              <Ionicons name="search-outline" size={18} color="#5A6A7A" />
              <Text style={styles.searchTriggerText} onPress={() => setShowSearch(true)}>
                Tap to search
              </Text>
            </View>
          </View>
          <FlatList
            data={state.items}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <CurrencyItem item={item} />}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  heading: { fontSize: 28, fontWeight: '800', color: '#0B1220' },
  subheading: { marginTop: 2, color: '#6B7380' },
  controls: { padding: 12, gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  card: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  searchTriggerWrap: { padding: 12 },
  searchTrigger: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#EEF2F5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTriggerText: { color: '#5A6A7A', fontWeight: '600' },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: '#EDEFF2', marginLeft: 16 },
  loading: { alignItems: 'center' },
});
