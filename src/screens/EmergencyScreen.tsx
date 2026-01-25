import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';

const EmergencyScreen: React.FC<{ navigation?: any }> = ({ navigation }: { navigation?: any }) => {
  const handleCall = () => {
    // placeholder: integrar com Linking.openURL('tel:...') se desejar
    console.log('Chamar serviço de emergência');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Emergência</Text>
        <Text style={styles.subtitle}>Aperte para acionar os contatos ou serviços de emergência.</Text>

        <Button title="Acionar Emergência" variant="danger" onPress={handleCall} style={styles.mb3} />
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
