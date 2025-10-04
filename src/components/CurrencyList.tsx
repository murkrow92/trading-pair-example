import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { CurrencyInfo } from '../types';
import { CurrencyItem } from './CurrencyItem';
import { useTheme } from '../theme/ThemeProvider';
import { useI18n } from '../hooks/useI18n';

interface Props {
  items: CurrencyInfo[];
  query: string;
  onQueryChange: (q: string) => void;
  onCancelSearch: () => void;
  onItemPress?: (item: CurrencyInfo) => void;
}

export const CurrencyList: React.FC<Props> = ({
  items,
  query,
  onQueryChange,
  onCancelSearch,
  onItemPress,
}) => {
  const { colors } = useTheme();
  const { t } = useI18n();
  
  const renderItem = ({ item }: { item: CurrencyInfo }) => (
    <CurrencyItem item={item} onPress={onItemPress} showFavorite={true} />
  );

  const Empty = () => (
    <View style={styles.empty}>
      <Ionicons name="search-outline" size={64} color={colors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>{t('empty.noResults')}</Text>
      <Text style={[styles.emptySub, { color: colors.textTertiary }]}>{t('empty.trySuggestion')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchBar, { backgroundColor: colors.surfaceSecondary, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onCancelSearch} accessibilityLabel="Back" style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.iconPrimary} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          value={query}
          onChangeText={onQueryChange}
          placeholder={t('search.placeholder')}
          placeholderTextColor={colors.textTertiary}
          autoFocus
          returnKeyType="search"
        />
        <TouchableOpacity
          onPress={() => {
            onQueryChange('');
            Keyboard.dismiss();
            onCancelSearch();
          }}
          accessibilityLabel="Close"
          style={styles.iconBtn}
        >
          <Ionicons name="close" size={22} color={colors.iconPrimary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={<Empty />}
        ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: colors.separator }]} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={items.length === 0 ? styles.emptyList : undefined}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconBtn: { 
    padding: 8,
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    fontSize: 16,
    fontWeight: '500',
  },
  sep: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 66,
  },
  empty: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: { 
    marginTop: 16, 
    fontSize: 18, 
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySub: { 
    marginTop: 8, 
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  emptyList: {
    flex: 1,
  },
});
