import * as React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function PickerSheet({ visible, title, options = [], onSelect, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>
          <FlatList
            data={options}
            keyExtractor={(item, idx) => String(idx) + item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex:1, backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'flex-end' },
  sheet: { backgroundColor:'#fff', maxHeight:'70%', borderTopLeftRadius:16, borderTopRightRadius:16, padding:16 },
  title: { fontSize:16, fontWeight:'800', marginBottom:8 },
  item: { paddingVertical:12, borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'#eee' },
  itemText: { fontSize:15 },
  close: { paddingVertical:12, alignItems:'center' },
  closeText: { fontWeight:'700' }
});