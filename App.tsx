import React from 'react';
import { SafeAreaView, View, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import LoginScreen from './LoginS';
import RegisterScreen from './RegisterS';
import HomeScreen from './HomeS'; // Ecranul principal
import InchiriereScreen from './InchiriereScreen'; // Ecran pentru închiriere
import CompostScreen from './CompostScreen';  // Ecran pentru compost

// Definim tipurile pentru rutele navigării
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Home: { username: string; points: number };
  Inchiriere: { username: string; points: number };
  Compost: { username: string; points: number }; 
};

// Definirea navigatorului Stack
const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Bine ați venit!' }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Home" component={HomeScreen} options={({ route }) => ({ title: `Bine ai venit, ${route.params?.username || 'Utilizator'}!`, })} />
        <Stack.Screen name="Inchiriere" component={InchiriereScreen} /> 
        <Stack.Screen name="Compost" component={CompostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Tiparea pentru navigation în MainScreen
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

// Ecranul principal cu logo și butoanele de Conectare și Înregistrare
function MainScreen({ navigation }: MainScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Adăugăm logo-ul */}
      <Image
        source={require('./assets/logo.png')} // Asigură-te că imaginea este plasată corect
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>CONECTARE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>ÎNREGISTRARE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bcffab', // Verde deschis
  },
  logo: {
    width: 350, // Ajustăm lățimea pentru a fi dublă
    height: 240, // Ajustăm înălțimea pentru a fi dublă
    marginBottom: 10, // Spațiu sub logo
  },
  buttonContainer: {
    margin: 10, // Mărim distanța dintre butoane
  },
  button: {
    backgroundColor: '#34a1eb',
    paddingVertical: 14, // Mărim paddingul pentru a face butonul mai înalt
    paddingHorizontal: 12, // Mărim lățimea butoanelor
    borderRadius: 10, // Colțuri ușor rotunjite
  },
  buttonText: {
    color: '#FFFFFF', // Text alb pe buton
    fontSize: 22, // Mărim textul
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
