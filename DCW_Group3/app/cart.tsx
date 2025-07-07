import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CartScreen() {
  const { cart, appointment, setCart, setAppointment } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmitOrder = () => {
    if (!cart.length) {
      Alert.alert('Cart is empty', 'Please add some services first.');
      return;
    }
    if (!appointment) {
      Alert.alert('No Appointment', 'Please book an appointment before submitting.');
      return;
    }

    Alert.alert('Order Confirmed', 'Your car wash has been booked!');
    setCart([]); // clear cart
    setAppointment(null); // clear appointment
    router.push('/?submitted=true');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No services selected.</Text>
        }
      />

      {/* Appointment Info */}
      {appointment && (
        <View style={styles.appointment}>
          <Text style={styles.subTitle}>Appointment</Text>
          <Text>{appointment.date} at {appointment.time}</Text>
        </View>
      )}

      {/* Total */}
      <Text style={styles.total}>Total: ${total}</Text>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitOrder}
      >
        <Text style={styles.submitText}>Submit Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  empty: {
    fontStyle: 'italic',
    color: '#999',
    marginTop: 20,
  },
  appointment: {
    marginTop: 20,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  total: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
