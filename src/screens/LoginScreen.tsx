import * as React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // placeholder: chamar API / contexto de autenticação
    navigation?.navigate?.('Dashboard');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="mt-12">
        <Text className="text-2xl font-bold text-blue-600 mb-2">Entrar</Text>
        <Text className="text-gray-600 mb-6">Use seu e-mail e senha para acessar a conta.</Text>

        <Text className="text-sm text-gray-700 mb-1">E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-200 rounded-md px-3 py-2 mb-4"
        />

        <Text className="text-sm text-gray-700 mb-1">Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-200 rounded-md px-3 py-2 mb-6"
        />

        <TouchableOpacity className="w-full bg-blue-600 py-3 rounded-lg items-center mb-3" onPress={handleLogin}>
          <Text className="text-white font-semibold">Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-full border border-gray-200 py-3 rounded-lg items-center" onPress={() => navigation?.navigate?.('SignUp')}>
          <Text className="text-blue-600">Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
