import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';

export default function ShopScreen() {
  const [url, setUrl] = React.useState('https://tu-shopify-o-amazon.com/tu-producto');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienda</Text>
      <Text style={styles.sub}>Agrega el enlace a tu tienda (Shopify, Amazon KDP, TikTok Shop).</Text>
      <TextInput value={url} onChangeText={setUrl} style={styles.input} autoCapitalize="none" />
      <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.btnText}>Abrir tienda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: '700' },
  sub: { fontSize: 13, opacity: 0.7, marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  btn: { backgroundColor: '#222', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' }
});