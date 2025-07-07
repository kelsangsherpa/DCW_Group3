import { useCart } from '@/context/CartContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AppointmentScreen() {
  const { setAppointment } = useCart();
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    setAppointment({
      date: date.toDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    router.push('/cart');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Book an Appointment</Text>

      <Button title="Pick Date & Time" onPress={() => setShow(true)} />

      {show && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            if (Platform.OS === 'android') {
              if (event?.type === 'dismissed') {
                // Don't call setShow(false) directly
                setTimeout(() => setShow(false), 0);
                return;
              }

              // Delay hiding to avoid internal double-dismiss error
              if (selectedDate) {
                setDate(selectedDate);
                setTimeout(() => setShow(false), 0);
              }
            } else {
              // iOS: inline mode, so no need to hide
              if (selectedDate) {
                setDate(selectedDate);
              }
            }
          }}

        />
      )}

      <Text style={styles.selected}>
        Selected: {date.toDateString()} at{' '}
        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Continue to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  selected: {
    marginVertical: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
