import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface Props {
  route: DetailScreenRouteProp;
}

export const DetailScreen: React.FC<Props> = ({ route }) => {
  const { dayData, location } = route.params;
  const day = dayData.rawDetail?.day;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerLoc}>{location}</Text>
      <Text style={styles.headerDate}>{dayData.date}</Text>

      <View style={styles.heroBox}>
        <Image source={{ uri: dayData.icon }} style={styles.icon} />
        <Text style={styles.condition}>{dayData.condition}</Text>
        <Text style={styles.tempRange}>
          Thấp nhất: {dayData.minTemp}°C — Cao nhất: {dayData.maxTemp}°C
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Thông tin chi tiết trong ngày</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Khả năng có mưa:</Text>
          <Text style={styles.value}>{dayData.rainChance}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tổng lượng mưa:</Text>
          <Text style={styles.value}>{day?.totalprecip_mm ?? 0} mm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tốc độ gió tối đa:</Text>
          <Text style={styles.value}>{day?.maxwind_kph ?? 0} km/h</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Độ ẩm trung bình:</Text>
          <Text style={styles.value}>{day?.avghumidity ?? 0}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Chỉ số UV cực đại:</Text>
          <Text style={styles.value}>{day?.uv ?? 0}</Text>
        </View>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={styles.label}>Tầm nhìn trung bình:</Text>
          <Text style={styles.value}>{day?.avgvis_km ?? 0} km</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0369A1' },
  content: { padding: 20 },
  headerLoc: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', textAlign: 'center' },
  headerDate: { fontSize: 16, color: '#BAE6FD', textAlign: 'center', marginTop: 4 },
  heroBox: { alignItems: 'center', marginVertical: 20 },
  icon: { width: 90, height: 90 },
  condition: { fontSize: 20, fontWeight: '600', color: '#FFFFFF', marginTop: 4 },
  tempRange: { fontSize: 15, color: '#E0F2FE', marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  card: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 16 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  label: { fontSize: 14, color: '#E0F2FE' },
  value: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
});