import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useAuth } from '../store/AuthContext';

const ProfileScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={{ fontWeight: '700' }}>{user?.name}</Text>
        <Text style={{ color: '#64748B' }}>{user?.email}</Text>

        <View style={{ marginTop: 16 }}>
          <Button title="Sair" variant="outline" onPress={async () => { await signOut(); navigation?.navigate?.('Login'); }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F3F4F6' }, inner: { padding: 24 }, title: { fontSize: 22, fontWeight: '800', marginBottom: 12 } });
