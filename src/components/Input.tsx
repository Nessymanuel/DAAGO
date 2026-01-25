import * as React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Props extends TextInputProps {
  label?: string;
  style?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle | TextStyle[];
}

export default function Input({ label, style, labelStyle, ...rest }: Props) {
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <TextInput style={styles.input} placeholderTextColor="#9CA3AF" {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, color: '#475569', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
});
