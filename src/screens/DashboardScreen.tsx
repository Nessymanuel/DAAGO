import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';

const DashboardScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Visão geral das suas notificações e registros.</Text>

        <Card>
          <Text style={styles.cardTitle}>Ações rápidas</Text>
          <Button title="Emergência" variant="danger" onPress={() => navigation?.navigate?.('Emergency')} style={styles.mb2} />
          <Button title="Registrar Sinistro" onPress={() => navigation?.navigate?.('ClaimForm')} />
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 24 },
  inner: { marginTop: 24 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  subtitle: { color: '#475569', marginBottom: 16 },
  cardTitle: { fontWeight: '700', color: '#111827', marginBottom: 8 },
  mb2: { marginBottom: 8 },
});
