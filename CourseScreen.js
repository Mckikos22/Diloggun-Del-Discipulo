import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { courseModules } from '../data/mockData';

export default function CourseScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={courseModules}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.sub}>{item.lessons} lecciones</Text>
            <TouchableOpacity style={styles.cta}>
              <Text style={styles.ctaText}>Empezar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd', borderRadius: 10, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '700' },
  sub: { fontSize: 12, opacity: 0.7, marginVertical: 6 },
  cta: { backgroundColor: '#222', paddingVertical: 10, borderRadius: 8, alignSelf: 'flex-start', paddingHorizontal: 14 },
  ctaText: { color: 'white', fontWeight: '600' }
});