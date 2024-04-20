import React, { useState, useEffect } from 'react';
import { Button, Image, TextInput, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function App() {
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

    console.log(result);

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };
  

  const cadastrarProduto = () => {
    // Aqui você pode adicionar a lógica para cadastrar o produto
    console.log(`Produto: ${produto}, Descrição: ${descricao}, Valor: ${valor}, Foto: ${foto}`);

    setProduto('')
    setDescricao('')
    setValor('')
    setFoto('')
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
      <Button title="Escolher Foto" onPress={escolherFotoDaGaleria} />
      {foto && <Image source={{ uri: foto }} style={styles.image} />}
      <Button title="Cadastrar Produto" onPress={cadastrarProduto} />
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