export type RootStackParamList = {
  Home: undefined;
  Detail: {
    dayData: {
      date: string;
      condition: string;
      icon: string;
      maxTemp: number;
      minTemp: number;
      rainChance: number;
      rawDetail?: any;
    };
    location: string;
  };
};