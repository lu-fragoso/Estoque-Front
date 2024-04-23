import React, { useState } from 'react';
import { Button, TextInput, View, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    axios.post('http://172.17.115.241:3000/login', { email: email, password: senha })
      .then(response => {
       // console.log('Login:', response.data.user.nome);
        Alert.alert('Login bem-sucedido', `Bem-vindo, ${response.data.user.nome}`);
        if(response.data.user.email === "admin@admin.br"){
          navigation.navigate('ListaAdm',{usuario: response.data.user});
        }else{
        navigation.navigate('Lista',{usuario: response.data.user});
      }
      })
      .catch((error) => {
        console.error('Erro:', error);
        Alert.alert('Erro de login', 'Email ou senha incorretos');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Estoque</Text>
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
        color='gray'
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
    logo: {
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom: 100,
    },
  });

export default Login;