import * as React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

export default function ModalMessage({ visible, title = 'Atenção', message = '', onClose }: Props) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>
            {typeof message === 'string' && message.trim() !== '' ? message : '!!input inválido'}
            </Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8, color: '#0F172A' },
  message: { color: '#374151', marginBottom: 16 },
  button: { alignItems: 'center', marginBottom: 12, backgroundColor: '#2563EB', paddingVertical: 16, borderRadius: 10  },
  buttonText: { color: '#fff', fontWeight: '700' },
});
