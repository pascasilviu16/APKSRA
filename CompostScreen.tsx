import React from 'react';
import { View, Text, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';  // Asigură-te că Axios este importat
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App'; // Importăm tipul din App.tsx

// Tip pentru proprietatile rutei Compost
type CompostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Compost'>;
type CompostScreenRouteProp = RouteProp<RootStackParamList, 'Compost'>;

interface Props {
  navigation: CompostScreenNavigationProp;
  route: CompostScreenRouteProp;
}

// Lista de articole pentru compost și punctele asociate
const compostItems = [
  { name: 'resturi vegetale', points: 10 },
  { name: 'frunze uscate', points: 20 },
  { name: 'bucati lemn', points: 30 },
  { name: 'coji legume', points: 40 },
  { name: 'pungi hartie', points: 50 },
  { name: 'coji fructe', points: 60 },
];

const CompostScreen: React.FC<Props> = ({ route, navigation }) => {
  const { username, points } = route.params || {}; // Verificăm dacă există parametrii

  if (!username || points === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Eroare: Parametrii lipsesc!</Text>
      </View>
    );
  }

  const handleCompostItem = (item: { name: string; points: number }) => {
    // Confirmăm adăugarea punctelor
    Alert.alert(
      'Confirmare',
      `Vrei sa adaugi ${item.points} puncte pentru compostarea ${item.name}?`,
      [
        {
          text: 'Anuleaza',
          style: 'cancel',
        },
        {
          text: 'Confirma',
          onPress: () => addCompostPoints(item),
        },
      ]
    );
  };

  const addCompostPoints = async (item: { name: string; points: number }) => {
    try {
      const newPoints = points + item.points;

      // Actualizam punctele in baza de date
      const response = await axios.post('http://192.168.0.141:3000/updatePoints', {
        username,
        points: newPoints,
        item: item.name,
      });

      if (response.data.success) {
        Alert.alert('Succes!', `Ai adaugat ${item.points} puncte.`);
        // Navigam inapoi la ecranul principal si actualizam punctele
        navigation.navigate('Home', { username, points: newPoints });
      } else {
        Alert.alert('Eroare', 'A aparut o problema la adaugarea punctelor.');
      }
    } catch (error) {
      console.error('Eroare la adaugarea punctelor:', error);
      Alert.alert('Eroare', 'A aparut o problema la conectarea la server.');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/background_compost.png')} // Asigură-te că imaginea este plasată corect
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Ai {points} puncte disponibile</Text>
        {compostItems.map((item) => (
          <View key={item.name} style={styles.buttonContainer}>
            <Button
              title={`${item.name} (${item.points} puncte)`}
              onPress={() => handleCompostItem(item)}
            />
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default CompostScreen;
