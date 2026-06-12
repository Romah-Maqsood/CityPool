import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/colors';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterVehicleScreen from '../screens/RegisterVehicleScreen';
import VerifyIdentityScreen from '../screens/VerifyIdentityScreen';
import PostRideScreen from '../screens/PostRideScreen';
import HomeScreen from '../screens/HomeScreen';
import RideDetailsScreen from '../screens/RideDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="RegisterVehicle" component={RegisterVehicleScreen} />
        <Stack.Screen name="VerifyIdentity" component={VerifyIdentityScreen} />
        <Stack.Screen name="PostRide" component={PostRideScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;