import { StyleSheet, Text, TouchableOpacity } from 'react-native';
export default function ServiceCard({ title, price, onSelect }: any) {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.card}>
      <Text>{title}</Text>
      <Text>${price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});