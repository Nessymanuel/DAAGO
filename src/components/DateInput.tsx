import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

type Props = {
  value?: string;
  onChange: (val: string) => void;
  label?: string;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function formatDateParts(y: number, m: number, d: number) {
  return `${y}-${pad(m)}-${pad(d)}`;
}

const DateInput: React.FC<Props> = ({ value, onChange, label }) => {
  const today = new Date();
  const [open, setOpen] = React.useState(false);
  const initial = value ? new Date(value) : today;
  const [year, setYear] = React.useState(initial.getFullYear());
  const [month, setMonth] = React.useState(initial.getMonth() + 1);
  const [day, setDay] = React.useState(initial.getDate());

  const apply = () => {
    onChange(formatDateParts(year, month, day));
    setOpen(false);
  };

  const inc = (setter: React.Dispatch<React.SetStateAction<number>>, max?: number) =>
    setter((v: number) => (max ? (v >= max ? 1 : v + 1) : v + 1));
  const dec = (setter: React.Dispatch<React.SetStateAction<number>>, max?: number) =>
    setter((v: number) => (v <= 1 ? (max ?? v) : v - 1));

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Text style={styles.valueText}>{value ?? 'Selecione a data'}</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecionar data</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.colLabel}>Ano</Text>
                <View style={styles.pickerRow}>
                  <TouchableOpacity onPress={() => dec(setYear)} style={styles.pickerBtn}><Text>-</Text></TouchableOpacity>
                  <Text style={styles.pickerValue}>{year}</Text>
                  <TouchableOpacity onPress={() => inc(setYear)} style={styles.pickerBtn}><Text>+</Text></TouchableOpacity>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.colLabel}>Mês</Text>
                <View style={styles.pickerRow}>
                  <TouchableOpacity onPress={() => dec(setMonth, 12)} style={styles.pickerBtn}><Text>-</Text></TouchableOpacity>
                  <Text style={styles.pickerValue}>{month}</Text>
                  <TouchableOpacity onPress={() => inc(setMonth, 12)} style={styles.pickerBtn}><Text>+</Text></TouchableOpacity>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.colLabel}>Dia</Text>
                <View style={styles.pickerRow}>
                  <TouchableOpacity onPress={() => dec(setDay, 31)} style={styles.pickerBtn}><Text>-</Text></TouchableOpacity>
                  <Text style={styles.pickerValue}>{day}</Text>
                  <TouchableOpacity onPress={() => inc(setDay, 31)} style={styles.pickerBtn}><Text>+</Text></TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
              <TouchableOpacity onPress={() => setOpen(false)} style={styles.actionBtn}><Text>Cancelar</Text></TouchableOpacity>
              <TouchableOpacity onPress={apply} style={[styles.actionBtn, { marginLeft: 8 }]}><Text>OK</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { color: '#475569', marginBottom: 6 },
  input: { padding: 12, borderWidth: 1, borderColor: '#E6EEF8', borderRadius: 8, backgroundColor: '#fff' },
  valueText: { color: '#0F172A' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 },
  modalCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  modalTitle: { fontWeight: '700', fontSize: 16, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  col: { alignItems: 'center', flex: 1 },
  colLabel: { color: '#475569', marginBottom: 6 },
  pickerRow: { flexDirection: 'row', alignItems: 'center' },
  pickerBtn: { padding: 8, borderRadius: 6, borderWidth: 1, borderColor: '#E2E8F0' },
  pickerValue: { marginHorizontal: 12 },
  actionBtn: { padding: 8 },
});
