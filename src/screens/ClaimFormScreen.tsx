import * as React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import ModalMessage from '../components/ModalMessage';
import BackButton from '../components/BackButton';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato AAAA-MM-DD'),
});

type FormData = z.infer<typeof schema>;

const ClaimFormScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');

  const onSubmit = (data: FormData) => {
    // placeholder: enviar formulário para API
    console.log(data);
    setModalMessage('Sinistro registrado com sucesso');
    setModalVisible(true);
  };

  const onError = (errors: any) => {
    const first = errors && Object.values(errors)[0];
    setModalMessage(first?.message ?? 'Verifique os campos');
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Text style={styles.title}>Registrar Sinistro</Text>
          <Text style={styles.subtitle}>Preencha os dados do sinistro para iniciar o processo de atendimento.</Text>

          <Controller control={control} name="title" render={({ field: { onChange, value } }) => <Input label="Título" value={value} onChangeText={onChange} />} />

          <Controller control={control} name="description" render={({ field: { onChange, value } }) => <Input label="Descrição" value={value} onChangeText={onChange} multiline style={{ height: 112 }} />} />

          <Controller control={control} name="date" render={({ field: { onChange, value } }) => <Input label="Data" value={value} onChangeText={onChange} placeholder="AAAA-MM-DD" />} />

          <Button title="Enviar" onPress={handleSubmit(onSubmit, onError)} />
        </Card>
      </ScrollView>

      <ModalMessage visible={modalVisible} title={modalMessage === 'Sinistro registrado com sucesso' ? 'Sucesso' : 'Erro'} message={modalMessage} onClose={() => setModalVisible(false)} />
      <BackButton onPress={() => navigation?.goBack?.()} style={styles.back} />
    </SafeAreaView>
  );
};

export default ClaimFormScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 24 },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  subtitle: { color: '#475569', marginBottom: 16 },
  back: { position: 'absolute', top: 18, left: 18 },
});
