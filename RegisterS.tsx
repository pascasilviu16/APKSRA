import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
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
      />
      <TextInput
        placeholder="Parolă"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Înregistrare" onPress={handleRegister} />
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

export default RegisterScreen;
