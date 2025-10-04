import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCurrency } from '../contexts/CryptoContext';
import { CurrencyItem } from '../components/CurrencyItem';
import { CustomButton } from '../components/CustomButton';
import { CurrencyList } from '../components/CurrencyList';
import { CryptoList } from '../components/CryptoList';
import { useTheme } from '../theme/ThemeProvider';
import { useCurrencyStore } from '../store/currencyStore';

export const DemoScreen: React.FC = () => {
  const { state, setModeA, setModeB, setModeAll, setQuery, clearQuery, getFilteredList, insertMockA, insertMockB, clearDatabase } = useCurrency();
  const { colors } = useTheme();
  const { mode, setMode } = useCurrencyStore();

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showApiData, setShowApiData] = useState<boolean>(false);
  const filtered = getFilteredList();

  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>Crypto App</Text>
        <Text style={[styles.subheading, { color: colors.textSecondary }]}>
          Demo with Dark Theme, API Integration & State Management
        </Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Data Source</Text>
          <View style={styles.row}>
            <CustomButton 
              label="Mock Data" 
              icon="server-outline" 
              variant={!showApiData ? "primary" : "ghost"} 
              onPress={() => setShowApiData(false)} 
            />
            <CustomButton 
              label="Live API" 
              icon="globe-outline" 
              variant={showApiData ? "primary" : "ghost"} 
              onPress={() => setShowApiData(true)} 
            />
          </View>
        </View>

        {!showApiData && (
          <>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Database Controls</Text>
              <View style={styles.row}>
                <CustomButton label="Clear DB" icon="trash-outline" variant="ghost" onPress={clearDatabase} />
                <CustomButton 
                  label="Insert Data" 
                  icon="download-outline" 
                  variant="primary" 
                  onPress={async () => { await insertMockA(); await insertMockB(); }} 
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Data Mode</Text>
              <View style={styles.row}>
                <CustomButton 
                  label="Crypto (A)" 
                  icon="logo-bitcoin" 
                  variant={mode === 'A' ? "primary" : "ghost"} 
                  onPress={() => { setModeA(); setMode('A'); }} 
                />
                <CustomButton 
                  label="Fiat (B)" 
                  icon="cash-outline" 
                  variant={mode === 'B' ? "primary" : "ghost"} 
                  onPress={() => { setModeB(); setMode('B'); }} 
                />
              </View>
              <View style={styles.row}>
                <CustomButton 
                  label="All (A+B)" 
                  icon="cart-outline" 
                  variant={mode === 'ALL' ? "primary" : "ghost"} 
                  onPress={() => { setModeAll(); setMode('ALL'); }} 
                />
              </View>
            </View>
          </>
        )}
      </View>

      {state.loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color={colors.iconPrimary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading data...
          </Text>
        </View>
      )}
    </>
  );

  if (showApiData) {
    return <CryptoList />;
  }

  if (showSearch) {
    return (
      <CurrencyList
        items={filtered}
        query={state.query}
        onQueryChange={setQuery}
        onCancelSearch={() => {
          clearQuery();
          setShowSearch(false);
        }}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={state.items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <CurrencyItem item={item} />}
        ListHeaderComponent={<ListHeader />}
        ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: colors.separator }]} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Tap "Insert Data" to load currencies
            </Text>
            <View style={[styles.searchTrigger, { backgroundColor: colors.surfaceSecondary }]}>
              <Text 
                style={[styles.searchTriggerText, { color: colors.textTertiary }]} 
                onPress={() => setShowSearch(true)}
              >
                Tap to search
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  heading: { fontSize: 28, fontWeight: '800' },
  subheading: { marginTop: 2, fontSize: 14 },
  controls: { padding: 12, gap: 16 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  row: { flexDirection: 'row', gap: 12 },
  loading: { alignItems: 'center', paddingVertical: 20 },
  loadingText: { marginTop: 8, fontSize: 14 },
  sep: { height: StyleSheet.hairlineWidth, marginLeft: 66 },
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 40,
    paddingHorizontal: 20 
  },
  emptyText: { 
    marginTop: 16, 
    marginBottom: 20, 
    textAlign: 'center',
    fontSize: 16 
  },
  searchTrigger: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchTriggerText: { fontWeight: '600' },
});