import * as React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';

const SignUpScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = () => {
    // placeholder: chamada para criar usuário
    navigation?.navigate?.('Dashboard');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="mt-8">
        <Text className="text-2xl font-bold text-blue-600 mb-2">Criar conta</Text>
        <Text className="text-gray-600 mb-6">Preencha os dados para criar sua conta.</Text>

        <Text className="text-sm text-gray-700 mb-1">Nome</Text>
        <TextInput value={name} onChangeText={setName} className="border border-gray-200 rounded-md px-3 py-2 mb-4" />

        <Text className="text-sm text-gray-700 mb-1">E-mail</Text>
        <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" className="border border-gray-200 rounded-md px-3 py-2 mb-4" />

        <Text className="text-sm text-gray-700 mb-1">Senha</Text>
        <TextInput value={password} onChangeText={setPassword} secureTextEntry className="border border-gray-200 rounded-md px-3 py-2 mb-6" />

        <TouchableOpacity className="w-full bg-blue-600 py-3 rounded-lg items-center" onPress={handleSignUp}>
          <Text className="text-white font-semibold">Criar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
