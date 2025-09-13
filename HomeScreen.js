import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Iwa Crece</Text>
      <Text style={styles.subtitle}>Manual de uso real del Diloggun con IE y psicología positiva</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Capítulos')}>
        <Text style={styles.cardTitle}>Leer el libro</Text>
        <Text style={styles.cardText}>Explora capítulos, patakíes y métodos.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Audio')}>
        <Text style={styles.cardTitle}>Audiolibro</Text>
        <Text style={styles.cardText}>Reproduce muestras ACX y audios completos.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Curso')}>
        <Text style={styles.cardTitle}>Curso por módulos</Text>
        <Text style={styles.cardText}>Avanza paso a paso con clases y ejercicios.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Tienda')}>
        <Text style={styles.cardTitle}>Tienda</Text>
        <Text style={styles.cardText}>Compra el libro (KDP/Kindle), curso y recursos.</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 14, opacity: 0.7, marginBottom: 16 },
  card: { backgroundColor: '#f4f4f4', padding: 16, borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  cardText: { fontSize: 14, opacity: 0.8 }
});