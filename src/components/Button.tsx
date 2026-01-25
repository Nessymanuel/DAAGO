import * as React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from '../theme/colors';

type Variant = 'primary' | 'secondary' | 'danger' | 'outline';

interface Props {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const variantStyles: Record<Variant, { button: ViewStyle; text: TextStyle }> = {
  primary: { button: { backgroundColor: colors.primary }, text: { color: '#fff' } },
  secondary: { button: { backgroundColor: '#F3F4F6' }, text: { color: colors.primary } },
  danger: { button: { backgroundColor: colors.danger }, text: { color: '#fff' } },
  outline: { button: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB' }, text: { color: colors.primary } },
};

export default function Button({ title, onPress, variant = 'primary', style, textStyle }: Props) {
  const vs = variantStyles[variant];
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.button, vs.button, style]}>
      <Text style={[styles.text, vs.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  },
});
