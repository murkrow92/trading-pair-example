// UI Layer - Price chart component
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { CryptoPriceHistory } from '../types';
import { formatPrice } from '../utils/formatters';

interface PriceChartProps {
  priceHistory: CryptoPriceHistory;
  currentPrice: number;
  symbol: string;
}

const screenWidth = Dimensions.get('window').width;

export const PriceChart: React.FC<PriceChartProps> = ({
  priceHistory,
  currentPrice,
  symbol,
}) => {
  if (!priceHistory.prices || priceHistory.prices.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No chart data available</Text>
      </View>
    );
  }

  const chartData = {
    labels: [],
    datasets: [
      {
        data: priceHistory.prices.map(([timestamp, price]) => price),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#007AFF',
    },
    formatYLabel: (value: string) => formatPrice(parseFloat(value)),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{symbol.toUpperCase()} Price Chart</Text>
      <Text style={styles.currentPrice}>
        Current: {formatPrice(currentPrice)}
      </Text>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withDots={false}
        withShadow={false}
        withScrollableDot={false}
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 32,
  },
});
