import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// Tọa độ mặc định (Hà Nội) nếu user từ chối cấp quyền
const DEFAULT_COORDS = {
  latitude: 21.0285,
  longitude: 105.8542,
};

// 1. Hàm xin quyền truy cập vị trí
const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    return auth === 'granted';
  }

  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Quyền truy cập vị trí',
        message: 'Ứng dụng cần vị trí của bạn để hiển thị dự báo thời tiết chính xác.',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Từ chối',
        buttonPositive: 'Đồng ý',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return false;
};

// 2. Hàm lấy tọa độ hiện tại
export const getCurrentCoordinates = async (): Promise<{ latitude: number; longitude: number }> => {
  const hasPermission = await requestLocationPermission();

  // Xử lý trường hợp không được cấp quyền: trả về tọa độ mặc định
  if (!hasPermission) {
    console.warn('Không được cấp quyền GPS, sử dụng vị trí mặc định.');
    return DEFAULT_COORDS;
  }

  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Lỗi lấy vị trí GPS:', error.message);
        // Lỗi timeout hoặc không bật GPS thì fallback về vị trí mặc định
        resolve(DEFAULT_COORDS);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};