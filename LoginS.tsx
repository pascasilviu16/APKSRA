import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.141:3000/login', {
        username,
        password,
      });

      if (response.data.success) {
        const points = response.data.points || 1000; // Setează punctele din răspuns sau 1000 dacă nu există
        navigation.navigate('Home', { username, points }); // Trimitem username-ul și punctele către ecranul Home
      } else {
        console.error('Autentificare eșuată');
      }
      
    } catch (error) {
      console.error('Eroare la autentificare:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nume de utilizator"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="black" // Textul placeholder va fi negru
      />
      <TextInput
        placeholder="Parolă"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="black" // Textul placeholder va fi negru
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>CONECTARE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#bcffab', // Fundal verde deschis
  },
  input: {
    height: 50,
    borderColor: 'black', // Marginea neagră
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8, // Colțuri rotunjite
    backgroundColor: '#ffffff',
    color: 'black', // Textul din câmpuri va fi negru
  },
  button: {
    backgroundColor: '#34a1eb', // Buton albastru
    paddingVertical: 15,
    borderRadius: 10, // Colțuri rotunjite
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // Text alb pe buton
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
