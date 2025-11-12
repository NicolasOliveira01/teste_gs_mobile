import Toast from 'react-native-toast-message';

export const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
  Toast.show({
    type,
    text1: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true
  });
};