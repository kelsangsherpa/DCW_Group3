import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Modal,
  Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';

export default function AppointmentScreen() {
  const { setAppointment } = useCart();
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [ampm, setAmPm] = useState('AM');

  const handleConfirm = () => {
    const finalDate = new Date(selectedDate);
    finalDate.setHours(ampm === 'PM' ? selectedHour + 12 : selectedHour);
    finalDate.setMinutes(selectedMinute);

    setAppointment({
      date: finalDate.toDateString(),
      time: finalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    router.push('/cart');
  };

  const generateDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = generateDays();
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Book an Appointment</Text>

      <TextInput
        label="Selected Date & Time"
        value={`${selectedDate.toDateString()} at ${
          selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${ampm}`}
        mode="outlined"
        style={styles.input}
        onPressIn={() => setShowModal(true)}
        right={<TextInput.Icon icon="calendar" onPress={() => setShowModal(true)} />}
      />

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date & Time</Text>

            <Text style={styles.sectionHeader}>Date:</Text>
            <Picker
              selectedValue={selectedDate.toString()}
              onValueChange={(itemValue) => setSelectedDate(new Date(itemValue))}
              style={styles.picker}
            >
              {days.map((day) => (
                <Picker.Item
                  key={day.toString()}
                  label={day.toDateString()}
                  value={day.toString()}
                />
              ))}
            </Picker>

            <Text style={styles.sectionHeader}>Time:</Text>
            <View style={styles.timePickerContainer}>
              <Picker
                selectedValue={selectedHour}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}
                style={[styles.picker, styles.timePicker]}
              >
                {hours.map((hour) => (
                  <Picker.Item key={hour} label={hour.toString()} value={hour} />
                ))}
              </Picker>

              <Picker
                selectedValue={selectedMinute}
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}
                style={[styles.picker, styles.timePicker]}
              >
                {minutes.map((minute) => (
                  <Picker.Item 
                    key={minute} 
                    label={minute.toString().padStart(2, '0')} 
                    value={minute} 
                  />
                ))}
              </Picker>

              <Picker
                selectedValue={ampm}
                onValueChange={(itemValue) => setAmPm(itemValue)}
                style={[styles.picker, styles.timePicker]}
              >
                <Picker.Item label="AM" value="AM" />
                <Picker.Item label="PM" value="PM" />
              </Picker>
            </View>

            <Button
              title="Confirm"
              onPress={() => {
                setShowModal(false);
                handleConfirm();
              }}
              color="#28a745"
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Continue to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    marginVertical: 15,
    backgroundColor: '#fff',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  picker: {
    marginVertical: 10,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timePicker: {
    flex: 1,
  },
});
