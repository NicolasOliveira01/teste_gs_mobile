// navigation/AppNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CoursesScreen from '../screens/CoursesScreen';
import CourseContentScreen from '../screens/CourseContentScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Courses: undefined;
  CourseContent: {
    courseId: string;
    area: string;
    nivel: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Criar Conta' }}
      />
      <Stack.Screen 
        name="Courses" 
        component={CoursesScreen}
        options={{ title: 'Minhas Trilhas' }}
      />
      <Stack.Screen 
        name="CourseContent" 
        component={CourseContentScreen}
        options={({ route }) => ({ 
          title: `Curso - ${route.params.area}` 
        })}
      />
    </Stack.Navigator>
  );
}