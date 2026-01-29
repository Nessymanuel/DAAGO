import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';

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
    <KeyboardAvoidingView style={{flex:1,backgroundColor:'#F3F4F6'}} behavior={Platform.OS==='ios'?'padding':undefined}>
      <ScrollView contentContainerStyle={{padding:24,flexGrow:1,justifyContent:'center'}} keyboardShouldPersistTaps="handled">
      
      <Text style={styles.detailTitle}>Detalhes do Sinistro</Text>
      <Card style={styles.card}>
        <Text style={styles.title}>{claim.title}</Text>
        <Text style={styles.meta}>{claim.date} • <Text style={styles.claimStatus}>{claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}</Text></Text>
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
        </Card>
        <Button title="Voltar" onPress={() => navigation?.goBack?.()} style={{ marginTop: 8, backgroundColor: '#2563EB', paddingVertical: 16, borderRadius: 10, alignSelf: 'flex-start' }} />

  </ScrollView>
  </KeyboardAvoidingView>
  );
};

export default ClaimDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 24, },
  card: { marginTop: 12 },
  title: { fontSize: 18, fontWeight: '600',  color: '#2563EB', marginBottom: 6,textTransform:'capitalize' },
  meta: { color: '#64748B', marginBottom: 12 },
  section: { marginTop: 12 },
  sectionTitle: { fontWeight: '700', marginBottom: 6 },
  text: { color: '#334155' },
  image: { width: '100%', height: 200, borderRadius: 8, marginTop: 8 },
  detailTitle: {marginTop: 18 , fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 6,textTransform:'capitalize' },
  claimStatus: { color: '#05b887' },
});
