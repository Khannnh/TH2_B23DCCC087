import axios from 'axios';
import { CleanWeatherData } from '../types/weather';

const API_KEY = '5e409977c03e404781b74157260710'
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (lat: number, lon: number): Promise<CleanWeatherData> => {
  const response = await axios.get(`${BASE_URL}/forecast.json`, {
    params: {
      key: API_KEY,
      q: `${lat},${lon}`,
      days: 7,
      aqi: 'no',
      alerts: 'no',
      lang: 'vi',
    },
  });

  const raw = response.data;
  const today = raw.forecast.forecastday[0];

  // 1. Tính toán chuẩn 24 giờ tiếp theo bắt đầu từ thời điểm hiện tại
  const currentEpoch = raw.location.localtime_epoch;
  const todayHours = raw.forecast.forecastday[0]?.hour || [];
  const tomorrowHours = raw.forecast.forecastday[1]?.hour || [];
  const allHours = [...todayHours, ...tomorrowHours];

  // Lấy các mốc giờ từ giờ hiện tại trở đi và cắt đúng 24 mốc tiếp theo
  const next24Hours = allHours
    .filter((h: any) => h.time_epoch >= currentEpoch - 1800)
    .slice(0, 24);

  return {
    // Tên địa điểm
    location: raw.location.name,

    // Thời tiết hiện tại
    current: {
      temp: Math.round(raw.current.temp_c),
      feelsLike: Math.round(raw.current.feelslike_c),
      condition: raw.current.condition.text,
      icon: `https:${raw.current.condition.icon}`,
      maxTemp: Math.round(today.day.maxtemp_c),
      minTemp: Math.round(today.day.mintemp_c),
    },

    // Dự báo 24 giờ tiếp theo (Mốc đầu hiển thị "Bây giờ")
    hourly: next24Hours.map((h: any, index: number) => ({
      time: index === 0 ? 'Bây giờ' : h.time.split(' ')[1],
      temp: Math.round(h.temp_c),
      icon: `https:${h.condition.icon}`,
      rainChance: h.chance_of_rain,
    })),

    // Dự báo 7 ngày
    daily: raw.forecast.forecastday.map((d: any) => ({
      date: d.date,
      condition: d.day.condition.text,
      icon: `https:${d.day.condition.icon}`,
      maxTemp: Math.round(d.day.maxtemp_c),
      minTemp: Math.round(d.day.mintemp_c),
      rainChance: d.day.daily_chance_of_rain,
      rawDetail: d,
    })),

    // 8 chỉ số theo dõi chi tiết
    metrics: [
      { id: 'temp', label: 'Nhiệt độ', value: `${Math.round(raw.current.temp_c)}°C` },
      { id: 'humidity', label: 'Độ ẩm', value: `${raw.current.humidity}%` },
      { id: 'wind_speed', label: 'Tốc độ gió', value: `${raw.current.wind_kph} km/h` },
      { id: 'wind_dir', label: 'Hướng gió', value: `${raw.current.wind_dir}` },
      { id: 'uv', label: 'Chỉ số UV', value: `${raw.current.uv}` },
      { id: 'precip', label: 'Lượng mưa', value: `${raw.current.precip_mm} mm` },
      { id: 'pressure', label: 'Áp suất', value: `${raw.current.pressure_mb} hPa` },
      { id: 'visibility', label: 'Tầm nhìn', value: `${raw.current.vis_km} km` },
    ],
  };
};