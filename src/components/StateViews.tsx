import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

// 1. Trạng thái Loading
interface LoadingViewProps {
  message?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({
  message = 'Đang tải dữ liệu thời tiết...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

// 2. Trạng thái Error (kèm nút Thử lại)
interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onRetry}>
        <Text style={styles.buttonText}>Thử lại</Text>
      </TouchableOpacity>
    </View>
  );
};

// 3. Trạng thái Empty
interface EmptyViewProps {
  message?: string;
}

export const EmptyView: React.FC<EmptyViewProps> = ({
  message = 'Không có dữ liệu thời tiết khả dụng.',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📭</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: 44,
    marginBottom: 12,
  },
  text: {
    color: '#F8FAFC',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  errorText: {
    color: '#FEE2E2',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#0284C7',
    fontSize: 15,
    fontWeight: '700',
  },
});