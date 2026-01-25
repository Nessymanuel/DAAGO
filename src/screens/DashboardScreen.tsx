import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import { getClaims } from '../services/mockApi';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../store/AuthContext';

const DashboardScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const [claims, setClaims] = useState<any[]>([]);

  const load = async () => {
    const data = await getClaims();
    setClaims(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const auth = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inner}>
          <Text style={styles.greeting}>Bom dia, {auth.user?.name ?? 'Usuário'}</Text>

          <Card style={styles.heroCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroTitle}>Comunicar Novo Acidente</Text>
                <Text style={styles.heroSubtitle}>Iniciar um novo relatório de sinistro</Text>
                <Button title="Começar" onPress={() => navigation?.navigate?.('ClaimForm')} style={{ marginTop: 8, alignSelf: 'flex-start' }} />
              </View>
              <Image source={require('../assets/splash-icon.png')} style={styles.heroImage} />
            </View>
          </Card>

          <View style={styles.grid}>
            <TouchableOpacity style={styles.smallCard} onPress={() => navigation?.navigate?.('Sinistros')}>
              <Text style={styles.smallTitle}>Meus Sinistros</Text>
              <Text style={styles.smallSub}>2 ativos, 1 encerrado</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallCard} onPress={() => navigation?.navigate?.('EmergencyContacts')}>
              <Text style={styles.smallTitle}>Contactos de Emergência</Text>
              <Text style={styles.smallSub}>Ver ou adicionar contactos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallCard} onPress={() => navigation?.navigate?.('Documents')}>
              <Text style={styles.smallTitle}>Documentos</Text>
              <Text style={styles.smallSub}>Seguro, BI, e mais</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallCard} onPress={() => navigation?.navigate?.('Notificacoes')}>
              <Text style={styles.smallTitle}>Notificações</Text>
              <Text style={styles.smallSub}>3 não lidas</Text>
            </TouchableOpacity>
          </View>

          <Card style={{ marginTop: 12 }}>
            <Text style={styles.cardTitle}>Meus sinistros</Text>
            {claims.length === 0 ? (
              <Text style={{ color: '#64748B' }}>Nenhum sinistro registrado</Text>
            ) : (
              claims.map((c) => (
                <TouchableOpacity key={c.id} style={styles.claimItem} onPress={() => navigation?.navigate?.('ClaimDetail', { claim: c })}>
                  <View>
                    <Text style={styles.claimTitle}>{c.title}</Text>
                    <Text style={styles.claimMeta}>{c.date} • {c.status}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
            <Button title="Atualizar" variant="outline" onPress={load} style={{ marginTop: 8 }} />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 24 },
  inner: { marginTop: 24 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 6 },
  subtitle: { color: '#475569', marginBottom: 16 },
  cardTitle: { fontWeight: '700', color: '#111827', marginBottom: 8 },
  mb2: { marginBottom: 8 },
  claimItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E2E8F0', marginBottom: 8 },
  claimTitle: { fontWeight: '700', color: '#0F172A' },
  claimMeta: { color: '#64748B', marginTop: 4 },
  heroCard: { paddingVertical: 16, paddingHorizontal: 12 },
  heroTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  heroSubtitle: { color: '#64748B', marginTop: 6 },
  heroImage: { width: 96, height: 96, marginLeft: 12, resizeMode: 'contain' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, justifyContent: 'space-between' },
  smallCard: { width: '48%', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8 },
  smallTitle: { fontWeight: '700', color: '#0F172A', marginBottom: 6 },
  smallSub: { color: '#64748B' },
});
