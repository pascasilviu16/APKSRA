import React from 'react';
import { SafeAreaView, View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'; // Adăugăm StackNavigationProp pentru a tipa navigation
import LoginScreen from './LoginS';
import RegisterScreen from './RegisterS';
import HomeScreen from './HomeS'; // Ecranul principal

// Definim tipurile pentru rutele navigării
type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

// Definirea navigatorului Stack
const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Tiparea pentru navigation în MainScreen
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

// Ecranul principal cu butoanele de Conectare și Înregistrare
function MainScreen({ navigation }: MainScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Conectare"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Înregistrare"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 10,
  },
});

export default App;
