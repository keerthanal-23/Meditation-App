import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './components/Auth';

export default function App() {
  return (
    <View style={styles.container}>
      <Auth />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',  // Added to ensure Auth component has full width
    padding: 20,    // Added to give some spacing from edges
  },
});
