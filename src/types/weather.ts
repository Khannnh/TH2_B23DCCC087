export interface CleanWeatherData {
  location: string;
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    icon: string;
    maxTemp: number;
    minTemp: number;
  };
  hourly: Array<{
    time: string;
    temp: number;
    icon: string;
    rainChance: number;
  }>;
  daily: Array<{
    date: string;
    condition: string;
    icon: string;
    maxTemp: number;
    minTemp: number;
    rainChance: number;
  }>;
  metrics: Array<{
    id: string;
    label: string;
    value: string;
  }>;
}