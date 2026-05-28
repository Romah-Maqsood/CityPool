// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/colors';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;