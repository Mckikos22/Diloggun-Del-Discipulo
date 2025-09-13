import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { audioSamples } from '../data/mockData';

export default function AudioScreen() {
  const [sound, setSound] = React.useState(null);

  async function play(uri) {
    if (sound) { await sound.unloadAsync(); setSound(null); }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true });
    setSound(newSound);
  }

  React.useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reproductor (muestras)</Text>
      <FlatList
        data={audioSamples}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => play(item.uri)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.sub}>{Math.round(item.durationSec/60)} min aprox.</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.hint}>Sugerencia: cargue sus MP3 en un hosting propio o Supabase Storage y reemplace los enlaces.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  item: { padding: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
  title: { fontSize: 16, fontWeight: '600' },
  sub: { fontSize: 12, opacity: 0.7 },
  hint: { marginTop: 12, fontSize: 12, opacity: 0.8 }
});