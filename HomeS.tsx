import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App'; // Importăm tipul din App.tsx

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { username, points } = route.params; // Accesăm username și points din parametrii rutei

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bine ai venit, {username}!</Text> 
      <Text style={styles.welcomeText}>salut, {username}! ai {points} puncte disponibile.</Text>
      <View style={styles.buttonContainer}>
      <Button title="INCHIRIAZA" onPress={() => navigation.navigate('Inchiriere', { username, points })} />
      </View>
      <View style={styles.buttonContainer}>
      <Button title="COMPOST" onPress={() => navigation.navigate('Compost', { username, points })}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: 200,
  },
});

export default HomeScreen;
