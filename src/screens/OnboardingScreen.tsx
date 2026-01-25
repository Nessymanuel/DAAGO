import * as React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

const OnboardingScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
      <View className="items-center">
        <Text className="text-3xl font-bold text-blue-600 mb-4">Bem-vindo ao DAAGO</Text>
        <Text className="text-center text-gray-600 mb-8">Um app para gerenciar emergências e sinistros de forma rápida e segura.</Text>
      </View>

      <TouchableOpacity
        className="w-full bg-blue-600 py-3 rounded-lg items-center"
        onPress={() => navigation?.navigate?.('Login')}
      >
        <Text className="text-white font-semibold">Começar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
