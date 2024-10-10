import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
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
      />
      <TextInput
        placeholder="Parolă"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Conectare" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
