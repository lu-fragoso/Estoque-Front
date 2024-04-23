import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Button, Modal, TextInput } from 'react-native';

const DetalhesDoProduto = ({ route }) => {
    const { produto, usuario } = route.params;
    const imageUrl = `http://192.168.1.106:3000/${produto.image}`; // Construa o URL completo para a imagem
  
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [productQuantity, setProductQuantity] = useState(0);
    const [actionType, setActionType] = useState(null);

    const fetchProductQuantity = () => {
        fetch(`http://192.168.1.106:3000/products/${produto.id}/qtd`)
            .then(response => response.json())
            .then(data => setProductQuantity(data.quantidade))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchProductQuantity();
    }, [quantity]);

    const adicionarProduto = () => {
        setActionType('adição');
        setModalVisible(true);
    };

    const removerProduto = () => {
        setActionType('remoção');
        setModalVisible(true);
    };

    const confirmarAlteracao = () => {
        const quantidadeAtual = parseInt(productQuantity, 10);
        const quantidadeAtualizada = parseInt(quantity,10);

        console.log(quantidadeAtual, quantidadeAtualizada )
    
        if (quantidadeAtual - quantidadeAtualizada < 0 && actionType === 'remoção') {
            console.error('Erro: A quantidade de produtos não pode ser negativa');
            return;
        }
    
        fetch(`http://192.168.1.106:3000/products/${produto.id}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: quantidadeAtualizada,
                userId: parseInt(usuario.id,10),
                tipo: String(actionType),
            }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Produto atualizado com sucesso');
                fetchProductQuantity()
            } else {
                console.error('Erro na atualização do produto');
            }
        })
        .catch((error) => {
            console.log(produto.id, quantity,usuario.id, actionType,)
            console.error('Erro:', error);
        });
    };


    



    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }} // Use o URL completo para a imagem
        />
        <Text style={styles.title}>{produto.nome}</Text>
        <Text style={styles.description}>{produto.descricao}</Text>
        <Text style={styles.price}>{produto.valor}</Text>
        <Text style={styles.quantity}>Quantidade: {productQuantity}</Text>

        <Button title="Remover" onPress={removerProduto} />
        <Button title="Adicionar" onPress={adicionarProduto} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Selecione a quantidade:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setQuantity}
                value={String(quantity)}
                keyboardType="numeric"
              />
              <Button
                title="Confirmar"
                onPress={confirmarAlteracao}
              />
            </View>
          </View>
        </Modal>

      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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