// App.tsx

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigation';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
    </NavigationContainer>
  );
}