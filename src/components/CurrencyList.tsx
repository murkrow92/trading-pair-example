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
	const renderItem = ({ item }: { item: CurrencyInfo }) => (
		<CurrencyItem item={item} onPress={onItemPress} />
	);

	const Empty = () => (
		<View style={styles.empty}> 
			<Ionicons name="document-outline" size={64} color="#B0B0B0" />
			<Text style={styles.emptyTitle}>No Results</Text>
			<Text style={styles.emptySub}>Try "MCO"</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.searchBar}>
				<TouchableOpacity onPress={onCancelSearch} accessibilityLabel="Back" style={styles.iconBtn}>
					<Ionicons name="arrow-back" size={22} color="#2F3A47" />
				</TouchableOpacity>
				<TextInput
					style={styles.input}
					value={query}
					onChangeText={onQueryChange}
					placeholder="Search"
					autoFocus
					returnKeyType="search"
				/>
				<TouchableOpacity
					onPress={() => { onQueryChange(''); Keyboard.dismiss(); onCancelSearch(); }}
					accessibilityLabel="Close"
					style={styles.iconBtn}
				>
					<Ionicons name="close" size={22} color="#2F3A47" />
				</TouchableOpacity>
			</View>

			<View style={styles.card}>
				<FlatList
					data={items}
					renderItem={renderItem}
					keyExtractor={(i) => i.id}
					ListEmptyComponent={<Empty />}
					ItemSeparatorComponent={() => <View style={styles.sep} />}
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={items.length === 0 ? { flex: 1 } : undefined}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#F7F8FA' },
	searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#EEF2F5', borderBottomWidth: 1, borderBottomColor: '#E3E6EA' },
	iconBtn: { padding: 6 },
	input: { flex: 1, marginHorizontal: 12, paddingVertical: Platform.OS === 'ios' ? 8 : 4, fontSize: 18, color: '#2F3A47' },
	card: { flex: 1, margin: 12, borderRadius: 12, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3, borderWidth: 1, borderColor: '#F0F1F3' },
	sep: { height: StyleSheet.hairlineWidth, backgroundColor: '#EDEFF2', marginLeft: 66 },
	empty: { alignItems: 'center', justifyContent: 'center', flex: 1 },
	emptyTitle: { marginTop: 16, fontSize: 18, color: '#5C6B7A', fontWeight: '600' },
	emptySub: { marginTop: 4, fontSize: 14, color: '#7C8B99' },
});
