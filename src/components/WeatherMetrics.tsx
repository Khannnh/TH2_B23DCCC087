import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  metrics: Array<{ id: string; label: string; value: string }>;
}

export const WeatherMetrics: React.FC<Props> = ({ metrics }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHỈ SỐ CHI TIẾT</Text>
      <View style={styles.grid}>
        {metrics.map((item) => (
          <View key={item.id} style={styles.metricCard}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginVertical: 8 },
  title: { fontSize: 12, fontWeight: '700', color: '#E2E8F0', marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  metricCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  label: { fontSize: 13, color: '#CBD5E1' },
  value: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginTop: 4 },
});