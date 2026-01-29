import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import ModalMessage from '../components/ModalMessage';
import BackButton from '../components/BackButton';
import DateInput from '../components/DateInput';
import { submitClaim } from '../services/mockApi';

const schema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato AAAA-MM-DD'),
});

type FormData = z.infer<typeof schema>;

const ClaimFormScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');
  const [images, setImages] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState<any>(null);

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permissão necessária', 'Permita acesso à galeria para adicionar imagens');
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!res.canceled && res.assets?.length) {
        setImages((prev) => [res.assets[0].uri, ...prev]);
      }
    } catch (e) {
      console.warn('image picker error', e);
    }
  };

  const sendLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permita o acesso à localização para enviar a localização');
        return;
      }

      const pos = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    } catch (e) {
      console.warn('location error', e);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const payload: any = { ...data, images, ...(location && { location }) };
      await submitClaim(payload);
      setModalMessage('Sinistro registrado com sucesso');
      setModalVisible(true);
    } catch {
      setModalMessage('Erro ao enviar sinistro');
      setModalVisible(true);
    }
  };

  const onError = (errors: any) => {
    const first = Object.values(errors)?.[0];
    setModalMessage((first as any)?.message ?? 'Verifique os campos');
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ padding: 24, flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton onPress={() => navigation?.goBack?.()} style={styles.back} />
        <Card>
          <Text style={styles.title}>Registrar Sinistro</Text>
          <Text style={styles.subtitle}>
            Preencha os dados do sinistro para iniciar o processo de atendimento.
          </Text>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input label="Título" value={value} onChangeText={onChange} />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Descrição"
                value={value}
                onChangeText={onChange}
                multiline
                style={{ height: 112 }}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DateInput label="Data do acidente" value={value} onChange={onChange} />
            )}
          />

          <View style={{ marginTop: 8 }}>
            <Text style={styles.section}>Imagens</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text style={styles.link}>+ Adicionar</Text>
              </TouchableOpacity>

              {images.map((uri, idx) => (
                <Image key={idx} source={{ uri }} style={styles.thumb} />
              ))}
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={styles.section}>Localização</Text>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={sendLocation}
                style={[styles.imagePicker, { paddingHorizontal: 16 }]}
              >
                <Text style={styles.link}>Enviar localização atual</Text>
              </TouchableOpacity>

              {location && (
                <Text style={styles.location}>
                  {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </Text>
              )}
            </View>
          </View>

          <Button title="Enviar" onPress={handleSubmit(onSubmit, onError)} style={styles.btnEnviar} />
        </Card>
      </ScrollView>

      <ModalMessage
        visible={modalVisible}
        title={modalMessage === 'Sinistro registrado com sucesso' ? 'Sucesso' : 'Erro'}
        message={modalMessage}
        onClose={() => {
          setModalVisible(false);
          if (modalMessage === 'Sinistro registrado com sucesso') {
            navigation?.navigate?.('Dashboard');
          }
        }}
      />

      </KeyboardAvoidingView>
  );
};

export default ClaimFormScreen;

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  subtitle: { color: '#475569', marginBottom: 16 },
  back: {marginTop:16, marginBottom:16},
  section: { color: '#475569', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center' },
  imagePicker: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: { color: '#2563EB' },
  thumb: { width: 64, height: 64, borderRadius: 6, marginLeft: 8 },
  location: { marginLeft: 12, color: '#0F172A' },
  btnEnviar:{ backgroundColor: "#2563EB", paddingVertical: 16, borderRadius: 10, marginTop:16}
});
