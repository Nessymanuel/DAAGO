import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import { getNotifications } from '../services/mockApi';
import { useEffect, useState } from 'react';

const NotificationsScreen: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);

  const load = async () => {
    const data = await getNotifications();
    setNotes(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Notificações</Text>
        <Card>
          {notes.length === 0 ? <Text style={{ color: '#64748B' }}>Sem notificações</Text> : notes.map((n) => <View key={n.id} style={{ marginBottom: 8 }}><Text style={{ fontWeight: '700' }}>{n.title}</Text><Text style={{ color: '#64748B' }}>{n.body}</Text></View>)}
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  inner: { padding: 24 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
});
