import { StyleSheet, Text, View } from 'react-native';
export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Diamond Car Wash</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});