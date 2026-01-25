import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
}

export default function BackButton({ onPress, style }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{'‹ Voltar'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  text: {
    color: '#475569',
    fontSize: 16,
  },
});
