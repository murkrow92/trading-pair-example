import React from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useAppStore } from '../store/appStore';
import { CurrencyItem } from '../components/CurrencyItem';
import { CustomButton } from '../components/CustomButton';
import { CurrencyList } from '../components/CurrencyList';
import { CryptoList } from '../components/CryptoList';
import { useTheme } from '../theme/ThemeProvider';
import { useI18n } from '../hooks/useI18n';
import { 
  AppHeader, 
  ControlSection, 
  ButtonRow, 
  LoadingIndicator, 
  EmptyState 
} from '../components/ui/AppHeader';

export const DemoScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t, changeLanguage, getCurrentLanguage } = useI18n();
  
  const {
    mode,
    query,
    loading,
    items,
    showSearch,
    showApiData,
    showFavorites,
    
    setMode,
    setQuery,
    clearQuery,
    setShowSearch,
    setShowApiData,
    setShowFavorites,
    clearDatabase,
    insertMockData,
    toggleFavorite,
    getFilteredList,
  } = useAppStore();

  const filtered = getFilteredList();

  const ListHeader = () => (
    <>
      <AppHeader
        title={t('app.title')}
        subtitle={t('app.subtitle')}
        showSearchButton={!showApiData && items.length > 0}
        onSearchPress={() => setShowSearch(true)}
      />

      <View style={styles.controls}>
        <ControlSection title={t('dataSource.title')}>
          <ButtonRow>
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
          </ButtonRow>
        </ControlSection>

        {!showApiData && (
          <>
            <ControlSection title={t('database.title')}>
              <ButtonRow>
                <CustomButton
                  label={t('database.clearDb')}
                  icon="trash-outline"
                  variant="ghost"
                  onPress={clearDatabase}
                />
                <CustomButton
                  label={t('database.insertData')}
                  icon="download-outline"
                  variant="primary"
                  onPress={insertMockData}
                />
              </ButtonRow>
            </ControlSection>

            <ControlSection title={t('dataMode.title')}>
              <ButtonRow>
                <CustomButton
                  label={t('dataMode.crypto')}
                  icon="logo-bitcoin"
                  variant={mode === 'A' ? "primary" : "ghost"}
                  onPress={() => {
                    setMode('A');
                    setShowFavorites(false);
                  }}
                />
                <CustomButton
                  label={t('dataMode.fiat')}
                  icon="cash-outline"
                  variant={mode === 'B' ? "primary" : "ghost"}
                  onPress={() => {
                    setMode('B');
                    setShowFavorites(false);
                  }}
                />
              </ButtonRow>
              <ButtonRow>
                <CustomButton
                  label={t('dataMode.all')}
                  icon="cart-outline"
                  variant={mode === 'ALL' ? "primary" : "ghost"}
                  onPress={() => {
                    setMode('ALL');
                    setShowFavorites(false);
                  }}
                />
                <CustomButton
                  label={t('dataMode.favorites')}
                  icon="heart-outline"
                  variant={showFavorites ? "primary" : "ghost"}
                  onPress={() => setShowFavorites(true)}
                />
              </ButtonRow>
            </ControlSection>
          </>
        )}

        <ControlSection title="Language">
          <ButtonRow>
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
          </ButtonRow>
        </ControlSection>
      </View>

      {loading && <LoadingIndicator />}
    </>
  );

  if (showApiData) {
    return <CryptoList onBackPress={() => setShowApiData(false)} />;
  }

  if (showSearch) {
    return (
      <CurrencyList
        items={filtered}
        query={query}
        onQueryChange={setQuery}
        onCancelSearch={() => {
          clearQuery();
          setShowSearch(false);
        }}
      />
    );
  }

  if (showFavorites) {
    const favoriteItems = useAppStore.getState().getFavorites();

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={favoriteItems}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <CurrencyItem 
              item={item} 
              showFavorite={true} 
              showChevron={false}
              onPress={() => toggleFavorite(item.id)}
            />
          )}
          ListHeaderComponent={<ListHeader />}
          ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: colors.separator }]} />}
          ListEmptyComponent={
            <EmptyState
              icon="heart-outline"
              title={t('empty.noFavorites')}
              subtitle={t('empty.addFavoritesHint')}
            />
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <CurrencyItem 
            item={item} 
            showFavorite={true}
            onPress={() => toggleFavorite(item.id)}
          />
        )}
        ListHeaderComponent={<ListHeader />}
        ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: colors.separator }]} />}
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title={t('empty.insertDataHint')}
            actionText={t('search.tapToSearch')}
            onActionPress={() => setShowSearch(true)}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  controls: { padding: 12, gap: 16 },
  sep: { height: 1, marginLeft: 66 },
});