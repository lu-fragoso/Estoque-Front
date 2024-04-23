import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ListaProdutos = ({ navigation, route }) => {
  const [produtos, setProdutos] = useState([]);
  const {usuario}  = route.params;

  useEffect(() => {
    axios.get('http://172.17.115.241:3000/product')
      .then(response => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
        <FlatList
            data={produtos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { produto: item , usuario})}>
                    <View style={styles.flat}>
                        <Text>{item.nome}</Text>
                        <Text>R$ {item.valor}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />

        <TouchableOpacity style={{...styles.newProduct,left: 30,}} onPress={() => navigation.navigate('Produto',{usuario})}>
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
        backgroundColor: '#c1c1c1',
        borderRadius:15
    },

    iconButton: {
      fontSize: 25,
      color: '#ffffff',
      fontWeight: 'bold',
    },

    newProduct: {
      position: 'absolute',
      bottom:30,
      
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default ListaProdutos;