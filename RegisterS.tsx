import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.0.141:3000/addUser', {
        username,
        password,
      });

      if (response.data.success) {
        const { points } = response.data;
        // Navigare către ecranul Home, cu username și points trimise ca parametri
        navigation.navigate('Home', { username, points });
      } else {
        console.error('Înregistrare eșuată');
      }
    } catch (error) {
      console.error('Eroare la înregistrare:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nume de utilizator"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="black" // Text placeholder negru
      />
      <TextInput
        placeholder="Parolă"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="black" // Text placeholder negru
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>ÎNREGISTRARE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#bcffab', // Verde deschis
  },
  input: {
    height: 50,
    borderColor: 'black', // Marginea neagră
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8, // Colțuri rotunjite
    backgroundColor: '#ffffff',
    color: 'black', // Textul din câmpurile de input negru
  },
  button: {
    backgroundColor: '#34a1eb', // Albastru pentru buton
    paddingVertical: 15,
    borderRadius: 10, // Colțuri rotunjite pentru buton
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // Text alb pe buton
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
