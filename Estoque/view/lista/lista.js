import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ListaProdutos = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://172.17.112.215:3000/product')
      .then(response => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }, []);

  return (
    <View styles={styles.container}>
      
      <FlatList
        data={produtos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { produto: item })}>
            <View  style={styles.flat}>
              <Text>{item.nome}</Text>
              <Text>{item.descricao}</Text>
              <Text>{item.valor}</Text>
            </View>
          </TouchableOpacity>
      )}
      />

      <TouchableOpacity style={styles.newProduct} onPress={() => navigation.navigate('Produto')}>
        <Text style={styles.iconButton}>+</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:20,
    },
    flat: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin:5,
        backgroundColor: '#B1B1B1',
    },

    iconButton: {
      fontSize: 25,
      color: '#ffffff',
      fontWeight: 'bold',
    },

    newProduct: {
      position: 'absolute',
      bottom:30,
      left: 30,
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default ListaProdutos;