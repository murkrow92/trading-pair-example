import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { useTopCryptocurrencies } from '../hooks/useCryptoQueries';
import { useCurrencyStore } from '../store/currencyStore';
import { CurrencyItem } from './CurrencyItem';
import { CurrencyInfo } from '../types';

interface CryptoListProps {
  onItemPress?: (item: CurrencyInfo) => void;
}

export const CryptoList: React.FC<CryptoListProps> = ({ onItemPress }) => {
  const { colors } = useTheme();
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
    <View style={styles.itemContainer}>
      <CurrencyItem 
        item={item} 
        onPress={handleItemPress}
        showChevron={false}
      />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => handleFavoritePress(item)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite(item.id) ? colors.error : colors.iconSecondary}
        />
      </TouchableOpacity>
    </View>
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="trending-up-outline" size={64} color={colors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>
        No Cryptocurrencies
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textTertiary }]}>
        Pull to refresh or check your connection
      </Text>
    </View>
  );

  const ErrorComponent = () => (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
      <Text style={[styles.errorTitle, { color: colors.textSecondary }]}>
        Failed to Load Data
      </Text>
      <Text style={[styles.errorSubtitle, { color: colors.textTertiary }]}>
        {error?.message || 'Something went wrong'}
      </Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: colors.surfaceSecondary }]}
        onPress={() => refetch()}
      >
        <Text style={[styles.retryButtonText, { color: colors.textPrimary }]}>
          Try Again
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading && !cryptocurrencies) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.iconPrimary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Loading cryptocurrencies...
        </Text>
      </View>
    );
  }

  if (error && !cryptocurrencies) {
    return <ErrorComponent />;
  }

  const data = cryptocurrencies || [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surfaceSecondary }]}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Top Cryptocurrencies
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {data.length} currencies • Tap ❤️ to favorite
        </Text>
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
    </View>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  favoriteButton: {
    padding: 8,
    marginLeft: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
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
