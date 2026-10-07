import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface Props {
  location: string;
  temp: number;
  condition: string;
  icon: string;
  feelsLike: number;
  maxTemp: number;
  minTemp: number;
}

export const CurrentWeather: React.FC<Props> = ({
  location,
  temp,
  condition,
  icon,
  feelsLike,
  maxTemp,
  minTemp,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.location}>{location}</Text>
      <Image source={{ uri: icon }} style={styles.icon} />
      <Text style={styles.temp}>{temp}°</Text>
      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.subText}>
        Cảm nhận: {feelsLike}°
      </Text>
      <Text style = {styles.subText}>Nhiệt độ cao nhất: {maxTemp}° - Nhiệt độ thấp nhấp: {minTemp}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  location: { fontSize: 26, fontWeight: '700', color: '#FFFFFF' },
  icon: { width: 80, height: 80 },
  temp: { fontSize: 68, fontWeight: '200', color: '#FFFFFF' },
  condition: { fontSize: 20, color: '#E2E8F0', marginTop: -5, textTransform: 'capitalize' },
  subText: { fontSize: 14, color: '#CBD5E1', marginTop: 8 },
});