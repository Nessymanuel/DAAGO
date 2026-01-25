import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import Card from '../components/Card';
import { getDocuments, addDocument } from '../services/mockApi';
import { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import BackButton from '../components/BackButton';
import Input from '../components/Input';

const DocumentsScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const [docs, setDocs] = useState<any[]>([]);

  const load = async () => {
    const data = await getDocuments();
    setDocs(data || []);
  };

  // upload flow: show modal form, pick file and submit
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [docName, setDocName] = useState('');
  const [docUri, setDocUri] = useState('');

  const pickForUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
      if (res.type === 'success') {
        setDocUri(res.uri ?? '');
        setDocName(res.name ?? '');
      }
    } catch (e) {
      console.warn('document picker error', e);
    }
  };

  const submitUpload = async () => {
    if (!docUri) return;
    await addDocument({ name: docName || 'Documento', uri: docUri });
    setUploadModalVisible(false);
    setDocName('');
    setDocUri('');
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Documentos</Text>
        <Card>
          {docs.length === 0 ? <Text style={{ color: '#64748B' }}>Nenhum documento</Text> : (
            <FlatList data={docs} keyExtractor={(i) => i.id} renderItem={({ item }) => <View style={{ paddingVertical: 8 }}><Text style={{ fontWeight: '700' }}>{item.name}</Text></View>} />
          )}

          <TouchableOpacity onPress={() => setUploadModalVisible(true)} style={{ marginTop: 12 }}>
            <Text style={{ color: '#2563EB' }}>+ Fazer upload de documento</Text>
          </TouchableOpacity>
        </Card>
        <Modal visible={uploadModalVisible} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
              <Text style={{ fontWeight: '700', marginBottom: 8 }}>Fazer upload de documento</Text>
              <Input label="Nome do documento" value={docName} onChangeText={setDocName} />
              <TouchableOpacity onPress={pickForUpload} style={{ marginTop: 8 }}>
                <Text style={{ color: '#2563EB' }}>{docUri ? 'Trocar ficheiro' : 'Selecionar ficheiro'}</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
                <TouchableOpacity onPress={() => setUploadModalVisible(false)} style={{ padding: 8 }}><Text>Cancelar</Text></TouchableOpacity>
                <TouchableOpacity onPress={submitUpload} style={{ padding: 8, marginLeft: 12 }}><Text>Salvar</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <BackButton onPress={() => navigation?.navigate?.('Dashboard')} style={{ position: 'absolute', top: 18, left: 18 }} />
      </View>
    </SafeAreaView>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F3F4F6' }, inner: { padding: 24 }, title: { fontSize: 22, fontWeight: '800', marginBottom: 12 } });
