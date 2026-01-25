import * as React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

const EmergencyScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const handleCall = () => {
    // placeholder: integrar com Linking.openURL('tel:...') se desejar
    console.log('Chamar serviço de emergência');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6 items-center justify-center">
      <Text className="text-2xl font-bold text-red-600 mb-4">Emergência</Text>
      <Text className="text-center text-gray-600 mb-8">Aperte para acionar os contatos ou serviços de emergência.</Text>

      <TouchableOpacity className="w-full bg-red-600 py-4 rounded-lg items-center mb-4" onPress={handleCall}>
        <Text className="text-white font-semibold">Acionar Emergência</Text>
      </TouchableOpacity>

      <TouchableOpacity className="w-full border border-gray-200 py-3 rounded-lg items-center" onPress={() => navigation?.goBack?.()}>
        <Text className="text-blue-600">Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EmergencyScreen;
