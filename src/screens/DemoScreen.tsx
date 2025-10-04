import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCurrency } from '../contexts/CryptoContext';
import { CurrencyItem } from '../components/CurrencyItem';
import { CustomButton } from '../components/CustomButton';
import { CurrencyList } from '../components/CurrencyList';
import { CryptoList } from '../components/CryptoList';
import { useTheme } from '../theme/ThemeProvider';
import { useCurrencyStore } from '../store/currencyStore';
import { useI18n } from '../hooks/useI18n';

export const DemoScreen: React.FC = () => {
  const { state, setModeA, setModeB, setModeAll, setQuery, clearQuery, getFilteredList, insertMockA, insertMockB, clearDatabase } = useCurrency();
  const { colors } = useTheme();
  const { mode, setMode, favorites, getFavorites } = useCurrencyStore();
  const { t, changeLanguage, getCurrentLanguage } = useI18n();

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showApiData, setShowApiData] = useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const filtered = getFilteredList();

  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>{t('app.title')}</Text>
        <Text style={[styles.subheading, { color: colors.textSecondary }]}>
          {t('app.subtitle')}
        </Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{t('dataSource.title')}</Text>
          <View style={styles.row}>
            <CustomButton 
              label={t('dataSource.mockData')} 
              icon="server-outline" 
              variant={!showApiData ? "primary" : "ghost"} 
              onPress={() => setShowApiData(false)} 
            />
            <CustomButton 
              label={t('dataSource.liveApi')} 
              icon="globe-outline" 
              variant={showApiData ? "primary" : "ghost"} 
              onPress={() => setShowApiData(true)} 
            />
          </View>
        </View>

        {!showApiData && (
          <>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{t('database.title')}</Text>
              <View style={styles.row}>
                <CustomButton label={t('database.clearDb')} icon="trash-outline" variant="ghost" onPress={clearDatabase} />
                <CustomButton 
                  label={t('database.insertData')} 
                  icon="download-outline" 
                  variant="primary" 
                  onPress={async () => { 
                    try {
                      console.log('Starting data insertion...');
                      await insertMockA(); 
                      await insertMockB();
                      console.log('Data insertion completed');
                    } catch (error) {
                      console.error('Error inserting data:', error);
                    }
                  }} 
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{t('dataMode.title')}</Text>
              <View style={styles.row}>
                <CustomButton 
                  label={t('dataMode.crypto')} 
                  icon="logo-bitcoin" 
                  variant={mode === 'A' ? "primary" : "ghost"} 
                  onPress={() => { setModeA(); setMode('A'); setShowFavorites(false); }} 
                />
                <CustomButton 
                  label={t('dataMode.fiat')} 
                  icon="cash-outline" 
                  variant={mode === 'B' ? "primary" : "ghost"} 
                  onPress={() => { setModeB(); setMode('B'); setShowFavorites(false); }} 
                />
              </View>
              <View style={styles.row}>
                <CustomButton 
                  label={t('dataMode.all')} 
                  icon="cart-outline" 
                  variant={mode === 'ALL' ? "primary" : "ghost"} 
                  onPress={() => { setModeAll(); setMode('ALL'); setShowFavorites(false); }} 
                />
                <CustomButton 
                  label={t('dataMode.favorites')} 
                  icon="heart-outline" 
                  variant={showFavorites ? "primary" : "ghost"} 
                  onPress={() => { setShowFavorites(true); }} 
                />
              </View>
            </View>
          </>
        )}
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Language</Text>
          <View style={styles.row}>
            <CustomButton 
              label="English" 
              icon="globe-outline" 
              variant={getCurrentLanguage() === 'en' ? "primary" : "ghost"} 
              onPress={() => changeLanguage('en')} 
            />
            <CustomButton 
              label="Tiếng Việt" 
              icon="globe-outline" 
              variant={getCurrentLanguage() === 'vi' ? "primary" : "ghost"} 
              onPress={() => changeLanguage('vi')} 
            />
          </View>
        </View>
      </View>

      {state.loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color={colors.iconPrimary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            {t('loading.text')}
          </Text>
        </View>
      )}
    </>
  );

  if (showApiData) {
    return <CryptoList onBackPress={() => setShowApiData(false)} />;
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

  if (showFavorites) {
    const favoriteItems = getFavorites();
    
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={favoriteItems}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <CurrencyItem item={item} showFavorite={true} showChevron={false} />}
          ListHeaderComponent={<ListHeader />}
          ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: colors.separator }]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-outline" size={48} color={colors.textTertiary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                {t('empty.noFavorites')}
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
                {t('empty.addFavoritesHint')}
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={state.items}
        keyExtractor={(i) => i.id}
          renderItem={({ item }) => <CurrencyItem item={item} showFavorite={true} />}
        ListHeaderComponent={<ListHeader />}
        ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: colors.separator }]} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {t('empty.insertDataHint')}
            </Text>
            <TouchableOpacity 
              style={[styles.searchTrigger, { backgroundColor: colors.surfaceSecondary }]}
              onPress={() => setShowSearch(true)}
            >
              <Text style={[styles.searchTriggerText, { color: colors.textTertiary }]}>
                {t('search.tapToSearch')}
              </Text>
            </TouchableOpacity>
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
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  searchTrigger: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchTriggerText: { fontWeight: '600' },
});