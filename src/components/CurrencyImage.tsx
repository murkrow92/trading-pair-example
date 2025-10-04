import React from 'react';
import { View, Text, StyleSheet, Image, ImageStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface CurrencyImageProps {
  symbol: string;
  imageUrl?: string;
  size?: number;
  style?: ImageStyle;
}

export const CurrencyImage: React.FC<CurrencyImageProps> = ({ 
  symbol, 
  imageUrl, 
  size = 38, 
  style 
}) => {
  const { colors } = useTheme();
  
  const imageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={[imageStyle, style]}
        defaultSource={require('../../assets/icon.png')}
        onError={() => {
          
        }}
      />
    );
  }

  
  return (
    <View style={[styles.avatar, imageStyle, { backgroundColor: colors.avatarBackground }, style]}>
      <Text style={[styles.avatarText, { color: colors.textInverse, fontSize: size * 0.4 }]}>
        {symbol.substring(0, 2).toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: '700',
  },
});
