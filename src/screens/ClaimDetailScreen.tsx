import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ClaimDetailScreen: React.FC<{ route?: any; navigation?: any }> = ({ route, navigation }) => {
  const claim = route?.params?.claim;

  if (!claim)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Detalhes do Sinistro</Text>
        <Text style={{ color: '#64748B' }}>Sinistro não encontrado</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{claim.title}</Text>
        <Text style={styles.meta}>{claim.date} • {claim.status}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.text}>{claim.description}</Text>
        </View>

        {claim.images && claim.images.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Imagens</Text>
            {claim.images.map((uri: string, idx: number) => (
              <Image key={idx} source={{ uri }} style={styles.image} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClaimDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 24 },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  meta: { color: '#64748B', marginBottom: 12 },
  section: { marginTop: 12 },
  sectionTitle: { fontWeight: '700', marginBottom: 6 },
  text: { color: '#334155' },
  image: { width: '100%', height: 200, borderRadius: 8, marginTop: 8 },
});
