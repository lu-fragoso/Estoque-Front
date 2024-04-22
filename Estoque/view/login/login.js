import React, { useState } from 'react';
import { Button, TextInput, View, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    axios.post('http://192.168.1.106:3000/login', { email: email, password: senha })
      .then(response => {
        Alert.alert('Login bem-sucedido', `Bem-vindo, ${response.data.nome}`);
        navigation.navigate('Lista');
      })
      .catch((error) => {
        console.error('Erro:', error);
        Alert.alert('Erro de login', 'Email ou senha incorretos');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '80%',
      marginBottom: 10,
      padding: 10,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 10,
    },
  });

export default Login;