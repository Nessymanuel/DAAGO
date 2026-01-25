import * as React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

const DashboardScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="mt-6">
        <Text className="text-2xl font-bold text-blue-600 mb-2">Dashboard</Text>
        <Text className="text-gray-600 mb-6">Visão geral das suas notificações e registros.</Text>

        <TouchableOpacity className="w-full bg-red-500 py-3 rounded-lg items-center mb-3" onPress={() => navigation?.navigate?.('Emergency')}>
          <Text className="text-white font-semibold">Emergência</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-full bg-blue-600 py-3 rounded-lg items-center" onPress={() => navigation?.navigate?.('ClaimForm')}>
          <Text className="text-white font-semibold">Registrar Sinistro</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
