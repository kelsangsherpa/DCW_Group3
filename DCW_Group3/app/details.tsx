import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const detailingServices = [
  { id: 'd1', title: 'Full Interior Vacuuming', price: 15 },
  { id: 'd2', title: 'Interior Window Cleaning', price: 10 },
  { id: 'd3', title: 'Exterior Steam Wash', price: 20 },
  { id: 'd4', title: 'Leather Seat Treatment', price: 25 },
];

export default function DetailScreen() {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const [badge, setBadge] = useState(0);

  useEffect(() => {
    setBadge(cart.length);
  }, [cart]);

  const handleAddService = (service: { id: string; title: string; price: number }) => {
    addToCart(service);
    Alert.alert('Service Added', `${service.title} added to cart.`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top bar with back and badge */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>

        <View>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
          {badge > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.title}>Car Detailing Services</Text>

      {detailingServices.map((service) => (
        <TouchableOpacity
          key={service.id}
          onPress={() => handleAddService(service)}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>{service.title}</Text>
          <Text>${service.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },
});
