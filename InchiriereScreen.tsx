import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App'; // Asigură-te că folosești corect acest tip
import axios from 'axios';

type InchiriereScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inchiriere'>;
type InchiriereScreenRouteProp = RouteProp<RootStackParamList, 'Inchiriere'>;

interface Props {
  navigation: InchiriereScreenNavigationProp;
  route: InchiriereScreenRouteProp;
}

// Lista de articole și punctele asociate
const items = [
  { name: 'aspirator', points: 100 },
  { name: 'fier de calcat', points: 80 },
  { name: 'matura', points: 50 },
  { name: 'ceainic', points: 60 },
  { name: 'oale', points: 70 },
  { name: 'pe mine', points: 90 },
];

const InchiriereScreen: React.FC<Props> = ({ route, navigation }) => {
  const { username, points } = route.params;

  const handleRentItem = (item: { name: string; points: number }) => {
    // Verificăm dacă utilizatorul are suficiente puncte
    if (points >= item.points) {
      // Afișăm o confirmare
      Alert.alert(
        'Confirmare',
        `Vrei să închiriezi ${item.name} pentru ${item.points} puncte?`,
        [
          {
            text: 'Anulează',
            style: 'cancel',
          },
          {
            text: 'Confirmă',
            onPress: () => rentItem(item),
          },
        ]
      );
    } else {
      Alert.alert('Puncte insuficiente', 'Nu ai suficiente puncte pentru această închiriere.');
    }
  };

  const rentItem = async (item: { name: string; points: number }) => {
    try {
      const newPoints = points - item.points;
      // Actualizam punctele in baza de date
      const response = await axios.post('http://192.168.0.141:3000/updatePoints', {
        username,
        points: newPoints,
        item: item.name,
      });
  
      if (response.data.success) {
        Alert.alert('Inchiriere reusita!', `Ai inchiriat ${item.name}.`);
        // Actualizam punctele local si navigam inapoi la Home
        navigation.navigate('Home', { username, points: newPoints });
      } else {
        Alert.alert('Eroare', 'A aparut o problema la inchiriere.');
      }
    } catch (error) {
      console.error('Eroare la inchiriere:', error);
      Alert.alert('Eroare', 'A aparut o problema la conectarea la server.');
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Ai {points} puncte disponibile</Text>
      {items.map((item) => (
        <View key={item.name} style={styles.buttonContainer}>
          <Button
            title={`${item.name} (${item.points} puncte)`}
            onPress={() => handleRentItem(item)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default InchiriereScreen;
