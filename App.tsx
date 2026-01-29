import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  OnboardingScreen,
  LoginScreen,
  SignUpScreen,
  DashboardScreen,
  EmergencyScreen,
  ClaimFormScreen,
  ClaimDetailScreen,
} from "./src/screens";
import { AuthProvider } from './src/store/AuthContext';
import MainTabs from './src/navigation/MainTabs';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  Emergency: undefined;
  ClaimForm: undefined;
  ClaimDetail: { claim: any } | undefined;
  EmergencyContacts: undefined;
  Documents: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Dashboard" component={MainTabs} />
            <Stack.Screen name="Emergency" component={EmergencyScreen} />
            <Stack.Screen name="EmergencyContacts" component={require('./src/screens/EmergencyContactsScreen').default} />
            <Stack.Screen name="Documents" component={require('./src/screens/DocumentsScreen').default} />
            <Stack.Screen name="ClaimForm" component={ClaimFormScreen} />
            <Stack.Screen name="ClaimDetail" component={ClaimDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
