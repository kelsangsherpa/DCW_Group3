import { CartProvider } from '@/context/CartContext';
import { Slot } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Layout() {
  return (
    <CartProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>DCW_Group3</Text>
        </View>
        <Slot />
      </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
