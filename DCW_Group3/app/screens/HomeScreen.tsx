import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Welcome to Diamond Car Wash!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
