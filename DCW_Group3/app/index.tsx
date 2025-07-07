// app/index.tsx
import { services } from '@/constants/services';
import { useCart } from '@/context/CartContext';
import useLocation from '@/hooks/useLocations';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


const storeImages = [
  require('../assets/images/logo1.png'),
  require('../assets/images/logo2.png'),
];

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const location = useLocation();
  const [badge, setBadge] = useState(0);
  /// return data from cart
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.submitted === 'true') {
      Alert.alert('Order Submitted', 'Your car wash appointment has been placed successfully!');
    }
  }, [params]);


//set a number in hte badge when product added to cart
  useEffect(() => {
    setBadge(cart.length);
  }, [cart]);

  const handleSelectService = (item: any) => {
    addToCart(item);
    Alert.alert('Service Added', `${item.title} added to cart.`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with location and user avatar */}
      <View style={styles.topBar}>
        <Text style={styles.locationText}>
          {location?.coords
            ? `Lat: ${location.coords.latitude.toFixed(2)}, Lon: ${location.coords.longitude.toFixed(2)}`
            : 'Fetching location...'}
        </Text>
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

      {/* Store logo carousel */}
      <Carousel
        loop
        width={300}
        height={150}
        autoPlay={true}
        data={storeImages}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image source={item} style={styles.logo} resizeMode="contain" />
        )}
      />

      {/* Services carousel */}
      <Text style={styles.sectionTitle}>Services</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service) => (
          <TouchableOpacity key={service.id} onPress={() => handleSelectService(service)}>
            <View style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text>${service.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Packages */}
      <Text style={styles.sectionTitle}>Packages</Text>
      {['Basic Package', 'Premium Package', 'Ultimate Package'].map((pkg, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => handleSelectService({ id: `pkg-${idx}`, title: pkg, price: 30 + idx * 20 })}>
          <View style={styles.packageCard}>
            <Text style={styles.packageTitle}>{pkg}</Text>
            <Text>${30 + idx * 20}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Action buttons */}
      <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/details')}>
        <Text style={styles.actionText}>Select Car Detailing Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/appointment')}>
        <Text style={styles.actionText}>Book an Appointment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/cart')}>
        <Text style={styles.actionText}>Pay and Place Order</Text>
      </TouchableOpacity>
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
  locationText: {
    fontSize: 12,
    color: '#444',
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
  logo: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  serviceCard: {
    marginRight: 15,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  serviceTitle: {
    fontWeight: '600',
  },
  packageCard: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  packageTitle: {
    fontWeight: 'bold',
  },
  actionButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
