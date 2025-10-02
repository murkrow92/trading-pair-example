import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface Props {
	label: string;
	onPress: () => void;
	icon?: keyof typeof Ionicons.glyphMap;
	variant?: ButtonVariant;
	style?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
}

export const CustomButton: React.FC<Props> = ({ label, onPress, icon, variant = 'primary', style, textStyle, disabled }) => {
	const { container, text, iconColor } = getStyles(variant, disabled);
	return (
		<TouchableOpacity
			style={[styles.base, container, style]}
			onPress={onPress}
			activeOpacity={0.9}
			disabled={disabled}
		>
			{icon ? <Ionicons name={icon} size={18} color={iconColor} /> : null}
			<Text style={[styles.textBase, text, textStyle]}>{label}</Text>
		</TouchableOpacity>
	);
};

function getStyles(variant: ButtonVariant, disabled?: boolean) {
	const palettes = {
		primary: { bg: '#1E63D6', border: '#1E63D6', text: '#FFFFFF', icon: '#FFFFFF' },
		secondary: { bg: '#F1F5FF', border: '#D8E3FF', text: '#0B1220', icon: '#0B1220' },
		ghost: { bg: '#EEF5FF', border: '#CFE0FF', text: '#1E63D6', icon: '#1E63D6' },
	} as const;
	const p = palettes[variant];
	const container: ViewStyle = {
		backgroundColor: disabled ? '#E9EDF3' : p.bg,
		borderColor: p.border,
		borderWidth: variant === 'primary' ? 0 : 1,
		shadowColor: variant === 'primary' ? '#1E63D6' : '#000',
		shadowOpacity: variant === 'primary' ? 0.25 : 0,
		shadowRadius: variant === 'primary' ? 6 : 0,
		shadowOffset: variant === 'primary' ? { width: 0, height: 4 } : { width: 0, height: 0 },
		elevation: variant === 'primary' ? 2 : 0,
	};
	return {
		container,
		text: { color: disabled ? '#9AA5B1' : p.text } as TextStyle,
		iconColor: disabled ? '#9AA5B1' : p.icon,
	};
}

const styles = StyleSheet.create({
	base: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		paddingVertical: 12,
		borderRadius: 12,
	},
	textBase: { fontWeight: '700' },
});
