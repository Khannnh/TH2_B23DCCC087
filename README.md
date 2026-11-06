# TH2 — Ứng dụng dự báo thời tiết

Ứng dụng di động xây dựng bằng React Native CLI và TypeScript. Dữ liệu thời tiết được lấy từ WeatherAPI.com.

## Chức năng chính

- Hiển thị thời tiết hiện tại: địa điểm, nhiệt độ, trạng thái thời tiết, cảm giác như và nhiệt độ cao/thấp trong ngày.
- Hiển thị dự báo theo giờ trong 24 giờ tiếp theo, gồm thời gian, biểu tượng, nhiệt độ và khả năng mưa.
- Hiển thị dự báo 7 ngày, gồm trạng thái thời tiết, nhiệt độ cao/thấp và khả năng mưa.
- Chọn một ngày trong dự báo để xem thông tin chi tiết như lượng mưa, gió, độ ẩm, UV và tầm nhìn.
- Hiển thị các chỉ số hiện tại: nhiệt độ, độ ẩm, tốc độ/hướng gió, UV, lượng mưa, áp suất và tầm nhìn.
- Hỗ trợ tải lại dữ liệu, trạng thái đang tải, lỗi và dữ liệu trống.

## Cấu trúc mã nguồn

```text
App.tsx
src/
  components/
    CurrentWeather.tsx     Thông tin thời tiết hiện tại
    HourlyForecast.tsx     Dự báo theo giờ
    DailyForecast.tsx      Dự báo 7 ngày
    WeatherMetrics.tsx     Các chỉ số thời tiết
    StateViews.tsx         Giao diện tải, lỗi và dữ liệu trống
  screens/
    HomeScreen.tsx         Màn hình chính
    DetailScreen.tsx       Chi tiết dự báo ngày được chọn
  services/
    weatherService.ts      Gọi WeatherAPI và chuyển đổi dữ liệu
    locationService.ts     Lấy tọa độ thiết bị, có tọa độ Hà Nội dự phòng
  types/
    navigation.ts          Kiểu dữ liệu điều hướng
    weather.ts             Kiểu dữ liệu thời tiết
android/                   Cấu hình và mã nguồn Android
ios/                       Cấu hình và mã nguồn iOS
```

## Cài đặt và chạy

Yêu cầu Node.js `>= 22.11.0` và môi trường React Native đã được cấu hình cho nền tảng cần chạy. Xem [hướng dẫn thiết lập React Native](https://reactnative.dev/docs/set-up-your-environment).

Tại thư mục gốc dự án, cài đặt các thư viện:

```sh
npm install
```

Khởi động Metro:

```sh
npm start
```

Mở terminal khác tại thư mục gốc và chạy trên Android emulator hoặc thiết bị Android:

```sh
npm run android
```

Dự án gọi endpoint `forecast.json` của WeatherAPI.com. API key hiện được khai báo trong `src/services/weatherService.ts`.

## Build APK Android

Trên macOS/Linux:

```sh
cd android
./gradlew assembleRelease
```

Trên Windows PowerShell:

```powershell
cd android
.\gradlew assembleRelease
```

APK đầu ra:

```text
android/app/build/outputs/apk/release/app-release.apk
```
