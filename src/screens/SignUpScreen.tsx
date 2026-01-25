import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import ModalMessage from '../components/ModalMessage';
import BackButton from '../components/BackButton';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

const SignUpScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');

  const onSubmit = (data: FormData) => {
    // TODO: chamada real para criar usuário
    navigation?.navigate?.('Dashboard');
  };

  const onError = (errors: any) => {
    const first = errors && Object.values(errors)[0];
    setModalMessage(first?.message ?? 'Verifique os campos');
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Preencha os dados para criar sua conta.</Text>

        <Controller control={control} name="name" render={({ field: { onChange, value } }) => <Input label="Nome" value={value} onChangeText={onChange} />} />
        <Controller control={control} name="email" render={({ field: { onChange, value } }) => <Input label="E-mail" value={value} onChangeText={onChange} keyboardType="email-address" autoCapitalize="none" />} />
        <Controller control={control} name="password" render={({ field: { onChange, value } }) => <Input label="Senha" value={value} onChangeText={onChange} secureTextEntry />} />

        <Button title="Criar conta" onPress={handleSubmit(onSubmit, onError)} />
      </View>

      <ModalMessage visible={modalVisible} title="Erro" message={modalMessage} onClose={() => setModalVisible(false)} />
      <BackButton onPress={() => navigation?.goBack?.()} style={styles.back} />
    </SafeAreaView>
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 24 },
  inner: { marginTop: 32 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  subtitle: { color: '#475569', marginBottom: 24 },
  back: { position: 'absolute', top: 18, left: 18 },
});
