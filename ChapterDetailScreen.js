import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { chapters } from '../data/mockData';

export default function ChapterDetailScreen({ route }) {
  const { id } = route.params || {};
  const chapter = chapters.find(c => c.id === id) || chapters[0];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{chapter.title}</Text>
      <Text style={styles.body}>{chapter.body}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  body: { fontSize: 16, lineHeight: 24 }
});