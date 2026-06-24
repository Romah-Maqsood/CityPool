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
import RideConfirmedScreen from '../screens/RideConfirmedScreen';
import ChatScreen from '../screens/ChatScreen';
import GroupChatScreen from '../screens/GroupChatScreen';
import ActiveTripScreen from '../screens/ActiveTripScreen';
import MyRidesScreen from '../screens/MyRidesScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Login"           component={LoginScreen} />
        <Stack.Screen name="SignUp"          component={SignUpScreen} />
        <Stack.Screen name="RegisterVehicle" component={RegisterVehicleScreen} />
        <Stack.Screen name="VerifyIdentity"  component={VerifyIdentityScreen} />
        <Stack.Screen name="PostRide"        component={PostRideScreen} />
        <Stack.Screen name="Home"            component={HomeScreen} />
        <Stack.Screen name="MyRides"         component={MyRidesScreen} />
        <Stack.Screen name="RideDetails"     component={RideDetailsScreen} />
        <Stack.Screen name="RideConfirmed"   component={RideConfirmedScreen} />
        <Stack.Screen name="Chat"            component={ChatScreen} />
        <Stack.Screen name="GroupChat"       component={GroupChatScreen} />
        <Stack.Screen name="ActiveTrip"      component={ActiveTripScreen} />
        <Stack.Screen name="Wallet"          component={WalletScreen} />
        <Stack.Screen name="Profile"         component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;