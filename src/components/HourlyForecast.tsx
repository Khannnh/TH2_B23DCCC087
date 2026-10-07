import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

interface Props {
  hourly: Array<{
    time: string;
    temp: number;
    icon: string;
    rainChance: number;
  }>;
}

export const HourlyForecast: React.FC<Props> = ({ hourly }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DỰ BÁO THEO GIỜ (24H)</Text>
      <FlatList
        data={hourly}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.time}>{item.time}</Text>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={styles.rain}>{item.rainChance}%</Text>
            <Text style={styles.temp}>{item.temp}°</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  title: { fontSize: 12, fontWeight: '700', color: '#E2E8F0', marginBottom: 10 },
  item: { alignItems: 'center', width: 65, marginRight: 10 },
  time: { fontSize: 13, color: '#F1F5F9' },
  icon: { width: 40, height: 40, marginVertical: 4 },
  rain: { fontSize: 11, color: '#67E8F9', fontWeight: '600' },
  temp: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginTop: 2 },
});