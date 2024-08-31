
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from '@/store/store';
import index from '../app/index';
import detail from './detail';
import singUpScreen from './singUpScreen';
import { initializeDatabase, loadProjects } from '@/store/projectSlice';

type stackScreens = {
  index: undefined;
  detail: undefined;
  Screen2: undefined;
  Home: undefined;
  singUpScreen: undefined;
  dbtest: undefined;
};

const Stack = createNativeStackNavigator<stackScreens>();

function RootLayout() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeDatabase());
    dispatch(loadProjects(1));
  }, [dispatch]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" component={index} options={{ title: 'Index' }} />
      <Stack.Screen name="detail" component={detail} options={{ title: 'Detail' }} />
      <Stack.Screen name="singUpScreen" component={singUpScreen} options={{ title: 'Sign Up' }} />
      {/* <Stack.Screen name="dbtest" component={dbtest} options={{ title: 'db' }} /> */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
}
