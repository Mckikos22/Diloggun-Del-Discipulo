import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PickerSheet from '../components/PickerSheet';
import { buildInterpretation } from '../lib/engine';
import { ORISHAS } from '../data/orishas';

// data
const { ODDUS, ORISHA_ROLES, SOLUTION_TEMPLATES } = require('../data/oddus');
const { EXTRA_TEMPLATES } = require('../data/solution_templates_extra');

function norm(s='') {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export default function ConsultaScreen() {
  const oddusOptions = React.useMemo(() => Object.keys(ODDUS || {}).sort(), []);
  const [odduToyale, setOdduToyale] = React.useState(oddusOptions[0] || '');
  const [odduOutcome, setOdduOutcome] = React.useState(oddusOptions[1] || '');
  const [outcomeKind, setOutcomeKind] = React.useState('ire'); // 'ire' | 'osogbo'
  const [outcomeType, setOutcomeType] = React.useState('');
  const [orisha, setOrisha] = React.useState('Eleguá');
  const [result, setResult] = React.useState(null);

  // Build subtype options from templates
  const subtypeOptions = React.useMemo(() => {
    const merged = { ...(SOLUTION_TEMPLATES || {}), ...(EXTRA_TEMPLATES || {}) };
    const prefix = norm(outcomeKind) + ':';
    const opts = Object.keys(merged)
      .filter(k => k.startsWith(prefix))
      .map(k => k.slice(prefix.length))
      .sort();
    return Array.from(new Set(opts)); // unique
  }, [outcomeKind]);

  // Build orisha options from roles + common list
    const orishaOptions = ORISHAS;

  // Pickers visibility
  const [showToyale, setShowToyale] = React.useState(false);
  const [showOutcomeOddu, setShowOutcomeOddu] = React.useState(false);
  const [showKind, setShowKind] = React.useState(false);
  const [showSubtype, setShowSubtype] = React.useState(false);
  const [showOrisha, setShowOrisha] = React.useState(false);

  function run() {
    const kind = norm(outcomeKind);
    const type = outcomeType || (subtypeOptions[0] || '');
    const out = buildInterpretation({ odduToyale, odduOutcome, outcomeKind: kind, outcomeType: type, orisha });
    setResult(out);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estrategia de consulta</Text>
      <Text style={styles.caption}>Selecciona: Oddu Toyale → Ire/Osogbo → Tipo → Orisha que defiende</Text>

      <Text style={styles.label}>Oddu Toyale</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setShowToyale(true)}>
        <Text style={styles.selText}>{odduToyale || 'Elegir…'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Oddu de resultado (Ire/Osogbo)</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setShowOutcomeOddu(true)}>
        <Text style={styles.selText}>{odduOutcome || 'Elegir…'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Ire u Osogbo</Text>
      <View style={{ flexDirection:'row', gap:10 }}>
        <TouchableOpacity style={[styles.chip, outcomeKind==='ire' && styles.chipActive]} onPress={() => setOutcomeKind('ire')}>
          <Text style={[styles.chipText, outcomeKind==='ire' && styles.chipTextActive]}>Iré</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.chip, outcomeKind==='osogbo' && styles.chipActive]} onPress={() => setOutcomeKind('osogbo')}>
          <Text style={[styles.chipText, outcomeKind==='osogbo' && styles.chipTextActive]}>Osogbo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Tipo de {outcomeKind}</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setShowSubtype(true)}>
        <Text style={styles.selText}>{outcomeType || (subtypeOptions[0] || 'Elegir…')}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Orisha que defiende</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setShowOrisha(true)}>
        <Text style={styles.selText}>{orisha || 'Elegir…'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={run}>
        <Text style={styles.btnText}>Interpretar</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Interpretación</Text>
          <Text style={styles.cardText}>{result.interpretation}</Text>
          <Text style={styles.refs}>[{result.refs.odduToyale}] → [{result.refs.outcomeKind}:{result.refs.outcomeType}] con {result.refs.orisha}</Text>
        </View>
      )}

      {/* Pickers */}
      <PickerSheet visible={showToyale} title="Elegir Oddu Toyale" options={oddusOptions} onSelect={(v)=>{setOdduToyale(v); setShowToyale(false);}} onClose={()=>setShowToyale(false)} />
      <PickerSheet visible={showOutcomeOddu} title="Elegir Oddu de resultado" options={oddusOptions} onSelect={(v)=>{setOdduOutcome(v); setShowOutcomeOddu(false);}} onClose={()=>setShowOutcomeOddu(false)} />
      <PickerSheet visible={showSubtype} title={"Elegir tipo de " + outcomeKind} options={subtypeOptions} onSelect={(v)=>{setOutcomeType(v); setShowSubtype(false);}} onClose={()=>setShowSubtype(false)} />
      <PickerSheet visible={showOrisha} title="Elegir Orisha" options={orishaOptions} onSelect={(v)=>{setOrisha(v); setShowOrisha(false);}} onClose={()=>setShowOrisha(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '800' },
  caption: { fontSize: 12, opacity: 0.7, marginBottom: 12 },
  label: { marginTop: 12, fontWeight: '700' },
  selector: { borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:8, marginTop:6 },
  selText: { fontSize:15 },
  chip: { paddingVertical:8, paddingHorizontal:12, borderRadius:20, borderWidth:1, borderColor:'#ddd', marginTop:6 },
  chipActive: { backgroundColor:'#222', borderColor:'#222' },
  chipText: { color:'#222', fontWeight:'700' },
  chipTextActive: { color:'#fff' },
  btn: { backgroundColor:'#222', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  btnText: { color: '#fff', fontWeight: '800' },
  card: { backgroundColor: '#f6f6f6', padding: 14, borderRadius: 10, marginTop: 16 },
  cardTitle: { fontWeight: '800', marginBottom: 6 },
  cardText: { lineHeight: 20 },
  refs: { marginTop: 8, fontSize: 12, opacity: 0.6 }
});