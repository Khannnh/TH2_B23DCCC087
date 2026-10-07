import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Props {
  daily: Array<{
    date: string;
    condition: string;
    icon: string;
    maxTemp: number;
    minTemp: number;
    rainChance: number;
    rawDetail?: any;
  }>;
  onSelectDay: (item: any) => void;
}

export const DailyForecast: React.FC<Props> = ({ daily, onSelectDay }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DỰ BÁO 7 NGÀY TỚI</Text>
      {daily.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.row}
          activeOpacity={0.7}
          onPress={() => onSelectDay(item)}
        >
          <Text style={styles.date}>{item.date}</Text>
          <View style={styles.conditionBox}>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={styles.rain}>{item.rainChance}%</Text>
          </View>
          <Text style={styles.tempRange}>
            {item.minTemp}° — <Text style={styles.maxTemp}>{item.maxTemp}°</Text>
          </Text>
        </TouchableOpacity>
      ))}
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
  title: { fontSize: 12, fontWeight: '700', color: '#E2E8F0', marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  date: { width: 95, fontSize: 14, color: '#FFFFFF', fontWeight: '500' },
  conditionBox: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 30, height: 30 },
  rain: { fontSize: 12, color: '#67E8F9', marginLeft: 4, width: 35 },
  tempRange: { fontSize: 14, color: '#E2E8F0' },
  maxTemp: { color: '#FFFFFF', fontWeight: '700' },
});