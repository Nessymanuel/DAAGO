import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import ClaimFormScreen from '../screens/ClaimFormScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ClaimsListScreen from '../screens/ClaimsListScreen';
import { Text } from 'react-native';
import EmergencyContactsScreen from '../screens/EmergencyContactsScreen';
import DocumentsScreen from '../screens/DocumentsScreen';

const Tab = createBottomTabNavigator();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={DashboardScreen} options={{ tabBarLabel: 'Início' }} />
      <Tab.Screen name="Sinistros" component={ClaimsListScreen} options={{ tabBarLabel: 'Sinistros' }} />
      <Tab.Screen name="Upload" component={ClaimFormScreen} options={{ tabBarLabel: 'Upload' }} />
      <Tab.Screen name="Notificacoes" component={NotificationsScreen} options={{ tabBarLabel: 'Notificações' }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
};

export default MainTabs;
