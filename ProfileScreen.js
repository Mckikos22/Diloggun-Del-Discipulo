import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = React.useState('Franklin Napoles Solano');
  const [email, setEmail] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Tu nombre" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Tu email" autoCapitalize="none" keyboardType="email-address" />
      <Text style={styles.hint}>Próximamente: inicio de sesión, progreso del curso, biblioteca personal.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  hint: { fontSize: 12, opacity: 0.7 }
});