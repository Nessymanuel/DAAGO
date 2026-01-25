import * as React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import ModalMessage from '../components/ModalMessage';
import BackButton from '../components/BackButton';
import DateInput from '../components/DateInput';
import * as ImagePicker from 'expo-image-picker';
import { submitClaim } from '../services/mockApi';
import * as Location from 'expo-location';

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
  const [images, setImages] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState<any>(null);

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permissão necessária', 'Permita acesso à galeria para adicionar imagens');
        return;
      }
      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
      if (!res.canceled && res.assets && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setImages((s) => [uri, ...s]);
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
      const payload: any = { ...data, images };
      if (location) payload.location = location;
      const created = await submitClaim(payload);
      setModalMessage('Sinistro registrado com sucesso');
      setModalVisible(true);
      console.log('created claim', created);
    } catch (e) {
      setModalMessage('Erro ao enviar sinistro');
      setModalVisible(true);
    }
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

          <Controller control={control} name="date" render={({ field: { onChange, value } }) => <DateInput label="Data do acidente" value={value} onChange={onChange} />} />

          <View style={{ marginTop: 8 }}>
            <Text style={{ color: '#475569', marginBottom: 8 }}>Imagens</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text style={{ color: '#2563EB' }}>+ Adicionar</Text>
              </TouchableOpacity>
              {images.map((uri, idx) => (
                <Image key={idx} source={{ uri }} style={styles.thumb} />
              ))}
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={{ color: '#475569', marginBottom: 8 }}>Localização</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={sendLocation} style={[styles.imagePicker, { paddingHorizontal: 16 }]}>
                <Text style={{ color: '#2563EB' }}>Enviar localização atual</Text>
              </TouchableOpacity>
              {location ? <Text style={{ marginLeft: 12, color: '#0F172A' }}>{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</Text> : null}
            </View>
          </View>

          <Button title="Enviar" onPress={handleSubmit(onSubmit, onError)} />
        </Card>
      </ScrollView>

      <ModalMessage
        visible={modalVisible}
        title={modalMessage === 'Sinistro registrado com sucesso' ? 'Sucesso' : 'Erro'}
        message={modalMessage}
        onClose={() => {
          setModalVisible(false);
          if (modalMessage === 'Sinistro registrado com sucesso') navigation?.navigate?.('Dashboard');
        }}
      />
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
  imagePicker: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  thumb: { width: 64, height: 64, borderRadius: 6, marginLeft: 8 },
});
