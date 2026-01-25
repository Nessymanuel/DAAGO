// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import {
//   OnboardingScreen,
//   LoginScreen,
//   SignUpScreen,
//   DashboardScreen,
//   EmergencyScreen,
//   ClaimFormScreen,
// } from './src/screens';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Onboarding" component={OnboardingScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Dashboard" component={DashboardScreen} />
//         <Stack.Screen name="Emergency" component={EmergencyScreen} />
//         <Stack.Screen name="ClaimForm" component={ClaimFormScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


// import React from "react";
// import { Text } from "react-native";

// export default function App() {
//   return <>
//   <Text>Olá, Mundo!</Text>
//   </>
// }


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
