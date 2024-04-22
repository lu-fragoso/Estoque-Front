import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.106:3000/product')
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
          <View  style={styles.flat}>
            <Text>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>{item.valor}</Text>
          </View>
        )}
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
    flat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
  });
  

export default ListaProdutos;