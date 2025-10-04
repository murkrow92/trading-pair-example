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
} from 'react-native';
import { CurrencyInfo } from '../types';
import { CurrencyItem } from './CurrencyItem';
import { useTheme } from '../theme/ThemeProvider';

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
  
  const renderItem = ({ item }: { item: CurrencyInfo }) => (
    <CurrencyItem item={item} onPress={onItemPress} />
  );

  const Empty = () => (
    <View style={styles.empty}>
      <Ionicons name="document-outline" size={64} color={colors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>No Results</Text>
      <Text style={[styles.emptySub, { color: colors.textTertiary }]}>Try "BTC" or "ETH"</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchBar, { backgroundColor: colors.surfaceSecondary, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onCancelSearch} accessibilityLabel="Back" style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.iconPrimary} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search"
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

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(i) => i.id}
          ListEmptyComponent={<Empty />}
          ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: colors.separator }]} />}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={items.length === 0 ? { flex: 1 } : undefined}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  iconBtn: { padding: 6 },
  input: {
    flex: 1,
    marginHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    fontSize: 18,
  },
  card: {
    flex: 1,
    margin: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
  },
  sep: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 66,
  },
  empty: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  emptyTitle: { marginTop: 16, fontSize: 18, fontWeight: '600' },
  emptySub: { marginTop: 4, fontSize: 14 },
});
