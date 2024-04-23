import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Button, Modal, TextInput, FlatList, Alert } from 'react-native';


const DetalhesDoProduto = ({ navigation,route }) => {
    const { produto, usuario } = route.params;
    const imageUrl = `http://172.17.115.241:3000/${produto.image}`; // Construa o URL completo para a imagem

    const [modalVisible, setModalVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [productQuantity, setProductQuantity] = useState(0);
    const [actionType, setActionType] = useState(null);
    const [logOcorrencias, setLogOcorrencias] = useState([]);
    const [nomeProduto, setNomeProduto] = useState(produto.nome);
    const [descricaoProduto, setDescricaoProduto] = useState(produto.descricao);
    const [precoProduto, setPrecoProduto] = useState(produto.valor);

    const fetchLogOcorrencias = () => {
      fetch(`http://172.17.115.241:3000/products/${produto.id}/logs`)
          .then(response => response.json())
          .then(data => setLogOcorrencias(data))
          .catch(error => console.error(error));
  };

    useEffect(() => {
      fetchLogOcorrencias()
  }, [logOcorrencias]);

    const fetchProductQuantity = () => {
        fetch(`http://172.17.115.241:3000/products/${produto.id}/qtd`)
            .then(response => response.json())
            .then(data => setProductQuantity(data.quantidade))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchProductQuantity();
    }, [quantity]);

    const editarProduto = () => {
      setModalEditVisible(true)
    };

    const confirmarEdicao = () => {
      fetch(`http://172.17.115.241:3000/products/${produto.id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nomeProduto,
          description: descricaoProduto,
          price: parseFloat(precoProduto,2),
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Produto editado com sucesso!');
            setModalEditVisible(false);
          } else {
            alert('Erro ao editar produto');
            console.log(nomeProduto,descricaoProduto,parseFloat(precoProduto,2))
            console.error('Erro ao editar produto:', data.message);
          }
        })
        .catch(error => {
          console.error('Erro ao editar produto:', error);
        });
    };

    const excluirProduto = () => {
      Alert.alert(
        "Excluir Produto",
        "Tem certeza de que deseja excluir este produto?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {
            fetch(`http://172.17.115.241:3000/products/${produto.id}/delete`, {
              method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                alert('Produto excluído com sucesso!');
                navigation.navigate('Lista', usuario)
              } else {
                alert('Erro ao excluir produto');
              }
            })
            .catch(error => {
              console.error('Erro ao excluir produto:', error);
            });
          }}
        ],
        { cancelable: false }
      );
    };

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
    
        fetch(`http://172.17.115.241:3000/products/${produto.id}/editquantidade`, {
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
                alert('Produto atualizado com sucesso');
                setModalVisible(false)
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
        
        <Text style={styles.price}>Valor: R$ {produto.valor}</Text>
        <Text style={{...styles.price, marginBottom:20}}>Quantidade: {productQuantity}</Text>


        <FlatList
            data={logOcorrencias}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.logItem}>
              <Text style={styles.logText}>Usuário: {item.usuario_id}</Text>
              <Text style={styles.logText}>Data: {item.data_hora}</Text>
              <Text style={styles.logText}>Tipo de Movimentação: {item.tipo}</Text>
              <Text style={styles.logText}>Quantidade: {item.quantidade}</Text>
          </View>
            )}
        />
        <View style={{ flexDirection: 'row', justifyContent:'center',marginTop:20 ,marginBottom:20}}> 
          <View style={{ marginRight: 10 }}>
            <Button title="Remover Quantidade" onPress={removerProduto} color='gray'/>
          </View>
          <Button title="Adicionar Quantidade" onPress={adicionarProduto} color='gray'/>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'center'}}> 
          <View style={{ marginRight: 10 }}>
            <Button title="Editar Produto" onPress={editarProduto} color='gray'/>
          </View>
            <Button title="Excluir Produto" onPress={excluirProduto} color='red' />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalEditVisible}
          onRequestClose={() => {
            setModalEditVisible(!modalEditVisible);
          }}
        >
           <View style={styles.centeredView}>
             <View style={styles.modalView}>
               <Text style={styles.modalText}>Editar Produto</Text>
               <TextInput
            style={styles.input}
            onChangeText={setNomeProduto}
            value={nomeProduto}
            placeholder="Nome do Produto"
          />
          <TextInput
            style={styles.input}
            onChangeText={setDescricaoProduto}
            value={descricaoProduto}
            placeholder="Descrição do Produto"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPrecoProduto}
            value={precoProduto.toString()}
            placeholder="Preço do Produto"
            keyboardType="numeric"
          />  
              <View style={{ flexDirection: 'row', justifyContent:'center'}}>
                <View style={{ marginRight: 10 }}>
                  <Button title="Cancelar" onPress={()=> {setModalEditVisible(false)}} color='red'/>
                </View>
                  <Button title="Confirmar" onPress={confirmarEdicao}  color='gray'/>
              </View>
             </View>
           </View>
         </Modal>

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
                color='gray'
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
  logItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#ccc',
    borderRadius: 5,
},
logText: {
    fontSize: 14,
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
    marginBottom: 5,
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
    width: 50, 
    height: 50, 
    backgroundColor: '#ccc',
  }
});

export default DetalhesDoProduto;