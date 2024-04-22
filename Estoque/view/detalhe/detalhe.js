import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DetalhesDoProduto = ({ route }) => {
    const { produto } = route.params;
    const imageUrl = `http://172.17.112.215:3000/${produto.image}`; // Construa o URL completo para a imagem
  
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }} // Use o URL completo para a imagem
        />
        <Text style={styles.title}>{produto.nome}</Text>
        <Text style={styles.description}>{produto.descricao}</Text>
        <Text style={styles.price}>{produto.valor}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200, // Defina a largura da imagem
    height: 200, // Defina a altura da imagem
  },
});

export default DetalhesDoProduto;