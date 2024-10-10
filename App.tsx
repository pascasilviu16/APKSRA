import React from 'react';
import { SafeAreaView, View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import LoginScreen from './LoginS';
import RegisterScreen from './RegisterS';
import HomeScreen from './HomeS'; // Ecranul principal
import InchiriereScreen from './InchiriereScreen'; // Ecran pentru închiriere
import CompostScreen from './CompostScreen'; // Ecran pentru compost

// Definim tipurile pentru rutele navigării
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Home: { username: string; points: number };
  Inchiriere: { username: string; points: number };
  Compost: undefined;
};

// Definirea navigatorului Stack
const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'titluuuuu' }} />
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
