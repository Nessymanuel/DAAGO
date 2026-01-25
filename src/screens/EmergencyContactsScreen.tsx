import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import { getEmergencyContacts, addEmergencyContact } from '../services/mockApi';

const EmergencyContactsScreen: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);

  const load = async () => {
    const data = await getEmergencyContacts();
    setContacts(data || []);
  };

  useEffect(() => { load(); }, []);

  const addDummy = async () => {
    await addEmergencyContact({ name: 'Contato de Exemplo', phone: '112' });
    load();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Contactos de Emergência</Text>
        <Card>
          {contacts.length === 0 ? <Text style={{ color: '#64748B' }}>Nenhum contacto</Text> : (
            <FlatList data={contacts} keyExtractor={(i) => i.id} renderItem={({ item }) => <View style={{ paddingVertical: 8 }}><Text style={{ fontWeight: '700' }}>{item.name}</Text><Text style={{ color: '#64748B' }}>{item.phone}</Text></View>} />
          )}
          <TouchableOpacity onPress={addDummy} style={{ marginTop: 12 }}>
            <Text style={{ color: '#2563EB' }}>+ Adicionar contacto de exemplo</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default EmergencyContactsScreen;

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F3F4F6' }, inner: { padding: 24 }, title: { fontSize: 22, fontWeight: '800', marginBottom: 12 } });
