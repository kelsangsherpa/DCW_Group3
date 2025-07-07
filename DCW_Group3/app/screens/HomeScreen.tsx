import useLocation from '@/hooks/useLocations';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { services } from '../../constants/services';
import { useCart } from '../../context/CartContext';


const storeImages = [
  require('../../assets/images/logo1.png'),
  require('../../assets/images/logo2.png'),
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const location = useLocation();

  const handleSelectService = (item: any) => {
    addToCart(item);
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
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
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

      {/* Navigate to detail screen */}
      <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('Details' as never)}>
        <Text style={styles.detailButtonText}>Go to Detailing Options</Text>
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
  detailButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
