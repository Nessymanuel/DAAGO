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
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

const LoginScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');

  const onSubmit = (data: FormData) => {
    // TODO: autenticação real aqui
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
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Use seu e-mail e senha para acessar a conta.</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input label="E-mail" value={value} onChangeText={onChange} keyboardType="email-address" autoCapitalize="none" />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => <Input label="Senha" value={value} onChangeText={onChange} secureTextEntry />}
        />

        <Button title="Entrar" onPress={handleSubmit(onSubmit, onError)} style={styles.mb3} />

        <Button title="Criar uma conta" variant="outline" onPress={() => navigation?.navigate?.('SignUp')} />
      </View>

      <ModalMessage visible={modalVisible} title="Erro" message={modalMessage} onClose={() => setModalVisible(false)} />
      <BackButton onPress={() => navigation?.goBack?.()} style={styles.back} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 24 },
  inner: { marginTop: 48 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  subtitle: { color: '#475569', marginBottom: 24 },
  mb3: { marginBottom: 12 },
  back: { position: 'absolute', top: 18, left: 18 },
});
