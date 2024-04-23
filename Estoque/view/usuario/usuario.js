import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = () => {
    axios.post('http://172.17.115.241:3000/register', { name: nome, email: email, password: senha })
    .then(response => {
      Alert.alert('Usuário cadastrado', `Nome: ${nome}, Email: ${email}`);
      setNome('');
      setEmail('');
      setSenha('');
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
  };

  return (
    <View style={styles.container} >
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Cadastrar" onPress={cadastrar} color='gray'/>
    </View>
  );
}

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

export default CadastroUsuario;