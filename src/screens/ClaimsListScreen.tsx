import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import { getClaims } from '../services/mockApi';
import { useEffect, useState } from 'react';

const ClaimsListScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [claims, setClaims] = useState<any[]>([]);

  const load = async () => {
    const data = await getClaims();
    setClaims(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Meus Sinistros</Text>
        <Card>
          {claims.length === 0 ? (
            <Text style={{ color: '#64748B' }}>Nenhum sinistro registrado</Text>
          ) : (
            claims.map((c) => (
              <TouchableOpacity key={c.id} onPress={() => navigation?.navigate?.('ClaimDetail', { claim: c })} style={styles.item}>
                <Text style={styles.itemTitle}>{c.title}</Text>
                <Text style={styles.itemMeta}>{c.date} • {c.status}</Text>
              </TouchableOpacity>
            ))
          )}
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default ClaimsListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  inner: { padding: 24 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  itemTitle: { fontWeight: '700' },
  itemMeta: { color: '#64748B' },
});
