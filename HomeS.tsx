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
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Alege ce vrei să faci!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="INCHIRIAZA"
          onPress={() => navigation.navigate('Inchiriere')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="COMPOST"
          onPress={() => navigation.navigate('Compost')}
        />
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
    marginVertical: 10, // Spațiu între butoane
    width: 200, // Opțional, pentru a face butoanele mai mari
  },
});

export default HomeScreen;
