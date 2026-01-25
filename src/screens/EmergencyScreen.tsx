import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Linking } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';

const EmergencyScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const callNumber = (number: string) => {
    const url = `tel:${number}`;
    Linking.openURL(url).catch(() => console.warn('Erro ao abrir telefone'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Assistência de Emergência</Text>
        <Text style={styles.subtitle}>Detalhes do Sinistro</Text>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: '700', marginBottom: 6 }}>Ligar para Ambulância (112)</Text>
          <Text style={{ color: '#64748B', marginBottom: 8 }}>Se houver feridos e for necessária ajuda médica.</Text>
          <Button title="Ligar Agora" variant="danger" onPress={() => callNumber('112')} style={styles.mb3} />
        </View>

        <View style={{ marginBottom: 4 }}>
          <Text style={{ fontWeight: '700', marginBottom: 6 }}>Solicitar Guincho</Text>
          <Text style={{ color: '#64748B', marginBottom: 8 }}>Para remover um veículo inoperante do local.</Text>
          <Button title="Solicitar Serviço" onPress={() => callNumber('0800000000')} style={styles.mb3} />
        </View>

        <Button title="Voltar" variant="outline" onPress={() => navigation?.goBack?.()} />
      </Card>
    </SafeAreaView>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 24, alignItems: 'center', justifyContent: 'center' },
  card: { width: '100%', maxWidth: 420 },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  subtitle: { color: '#475569', marginBottom: 16 },
  mb3: { marginBottom: 12 },
});
