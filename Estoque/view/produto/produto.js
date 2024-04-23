import React, { useState, useEffect } from 'react';
import { Button, Image, TextInput, View, StyleSheet, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';

export default function Produto({route}) {
  const { usuario } = route.params;
  
  const [produto, setProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissões de câmera para fazer isso funcionar!');
        }
      }
    })();
  }, []);

  const escolherFotoDaGaleria = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };
  

  const cadastrarProduto = async () => {
    try {
      const formData = new FormData();
      formData.append('name', produto);
      formData.append('description', descricao);
      formData.append('price', valor);
      formData.append('image', {
        uri: foto,
        type: 'image/jpeg', // ou o tipo correto da imagem
        name: 'image.jpg',
      });
      formData.append('userId', usuario.id);
  
      const response = await axios.post('http://172.17.115.241:3000/registerproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Alert.alert('Produto cadastrado', `Nome do Produto: ${produto}, Descrição: ${descricao}, Valor: ${valor}`);
      setProduto('');
      setDescricao('');
      setValor('');
      setFoto('');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={produto}
        onChangeText={setProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />
      <View style={{ marginBottom: 10 }}>
        <Button title="Escolher Foto" onPress={escolherFotoDaGaleria} color='gray' />
      </View>
      {foto && <Image source={{ uri: foto }} style={styles.image} />}
      <View style={{ marginTop: 10 }}>
        <Button title="Cadastrar Produto" onPress={cadastrarProduto} color='gray' />
      </View>
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