import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { CleanWeatherData } from '../types/weather';
import { getCurrentCoordinates } from '../services/locationService';
import { fetchWeather } from '../services/weatherService';

import { CurrentWeather } from '../components/CurrentWeather';
import { HourlyForecast } from '../components/HourlyForecast';
import { WeatherMetrics } from '../components/WeatherMetrics';
import { DailyForecast } from '../components/DailyForecast';
import {LoadingView , ErrorView , EmptyView} from '../components/StateViews';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: NavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<CleanWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setErrorMsg(null);
      const coords = await getCurrentCoordinates();
      const weather = await fetchWeather(coords.latitude, coords.longitude);
      setData(weather);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Không thể tải dữ liệu thời tiết. Vui lòng kiểm tra lại kết nối!');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };
  

// 1. Loading
  if (loading) {
    return <LoadingView message="Đang lấy tọa độ GPS & tải thời tiết..." />;
  }

  // 2. Error
  if (errorMsg) {
    return <ErrorView message={errorMsg} onRetry={loadData} />;
  }

  // 3. Empty
  if (!data) {
    return <EmptyView />;
  }

  // 4. Màn hình chính
  return (
    <View style={styles.bg}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
        }
      >
        <CurrentWeather
          location={data.location}
          temp={data.current.temp}
          condition={data.current.condition}
          icon={data.current.icon}
          feelsLike={data.current.feelsLike}
          maxTemp={data.current.maxTemp}
          minTemp={data.current.minTemp}
        />

        <HourlyForecast hourly={data.hourly} />

        <WeatherMetrics metrics={data.metrics} />

        <DailyForecast
          daily={data.daily}
          onSelectDay={(dayItem) =>
            navigation.navigate('Detail', {
              dayData: dayItem,
              location: data.location,
            })
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#0284C7' },
  scrollContent: { paddingVertical: 40, paddingBottom: 60 },
  center: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  stateText: { color: '#FFFFFF', fontSize: 16, marginTop: 12 },
  errorText: { color: '#FEE2E2', fontSize: 16, textAlign: 'center', marginBottom: 16 },
  retryBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryBtnText: { color: '#0284C7', fontWeight: '700' },
});