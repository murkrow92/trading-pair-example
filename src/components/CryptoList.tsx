import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { useTopCryptocurrencies } from '../hooks/useCryptoQueries';
import { useCurrencyStore } from '../store/currencyStore';
import { CurrencyItem } from './CurrencyItem';
import { CurrencyInfo } from '../types';
import { useI18n } from '../hooks/useI18n';

interface CryptoListProps {
  onItemPress?: (item: CurrencyInfo) => void;
  onBackPress?: () => void;
}

export const CryptoList: React.FC<CryptoListProps> = ({ onItemPress, onBackPress }) => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { 
    data: cryptocurrencies, 
    isLoading, 
    error, 
    refetch,
    isRefetching 
  } = useTopCryptocurrencies(50);
  
  const { 
    favorites, 
    toggleFavorite, 
    isFavorite,
    getFilteredList 
  } = useCurrencyStore();

  const [refreshing, setRefreshing] = useState(false);

  
  useEffect(() => {
    if (cryptocurrencies) {
      useCurrencyStore.getState().setItems(cryptocurrencies);
    }
  }, [cryptocurrencies]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const handleItemPress = (item: CurrencyInfo) => {
    onItemPress?.(item);
  };

  const handleFavoritePress = (item: CurrencyInfo) => {
    toggleFavorite(item.id);
  };

  const renderItem = ({ item }: { item: CurrencyInfo }) => (
    <CurrencyItem 
      item={item} 
      onPress={handleItemPress}
      showChevron={false}
      showFavorite={true}
    />
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="trending-up-outline" size={64} color={colors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>
        {t('empty.noCryptocurrencies')}
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textTertiary }]}>
        {t('empty.pullToRefresh')}
      </Text>
    </View>
  );

  const ErrorComponent = () => (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
      <Text style={[styles.errorTitle, { color: colors.textSecondary }]}>
        {t('crypto.failedToLoad')}
      </Text>
      <Text style={[styles.errorSubtitle, { color: colors.textTertiary }]}>
        {error?.message || t('crypto.somethingWentWrong')}
      </Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: colors.surfaceSecondary }]}
        onPress={() => refetch()}
      >
        <Text style={[styles.retryButtonText, { color: colors.textPrimary }]}>
          {t('crypto.tryAgain')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading && !cryptocurrencies) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.iconPrimary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          {t('loading.cryptocurrencies')}
        </Text>
      </View>
    );
  }

  if (error && !cryptocurrencies) {
    return <ErrorComponent />;
  }

  const data = cryptocurrencies || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surfaceSecondary }]}>
        <View style={styles.headerContent}>
          {onBackPress && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          )}
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]} numberOfLines={1}>
              {t('crypto.topCryptocurrencies')}
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
              {t('crypto.currenciesCount', { count: data.length })}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyComponent />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isRefetching}
            onRefresh={handleRefresh}
            tintColor={colors.iconPrimary}
            colors={[colors.iconPrimary]}
          />
        }
        contentContainerStyle={data.length === 0 ? styles.emptyList : undefined}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.separator }]} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flexShrink: 1,
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
    flexShrink: 1,
    opacity: 0.8,
  },
  separator: {
    height: 1,
    marginLeft: 66,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyList: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  errorSubtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
