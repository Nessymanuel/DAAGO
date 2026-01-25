import * as React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const ClaimFormScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState('');

  const handleSubmit = () => {
    // placeholder: enviar formulário para API
    console.log({ title, description, date });
    navigation?.navigate?.('Dashboard');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <ScrollView>
        <Text className="text-2xl font-bold text-blue-600 mb-2">Registrar Sinistro</Text>
        <Text className="text-gray-600 mb-6">Preencha os dados do sinistro para iniciar o processo de atendimento.</Text>

        <Text className="text-sm text-gray-700 mb-1">Título</Text>
        <TextInput value={title} onChangeText={setTitle} className="border border-gray-200 rounded-md px-3 py-2 mb-4" />

        <Text className="text-sm text-gray-700 mb-1">Descrição</Text>
        <TextInput value={description} onChangeText={setDescription} multiline className="border border-gray-200 rounded-md px-3 py-2 mb-4 h-28" />

        <Text className="text-sm text-gray-700 mb-1">Data</Text>
        <TextInput value={date} onChangeText={setDate} placeholder="AAAA-MM-DD" className="border border-gray-200 rounded-md px-3 py-2 mb-6" />

        <TouchableOpacity className="w-full bg-blue-600 py-3 rounded-lg items-center" onPress={handleSubmit}>
          <Text className="text-white font-semibold">Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClaimFormScreen;
