import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Produto from './view/produto/produto';
import CadastroUsuario from './view/usuario/usuario';
import ListaProdutos from './view/lista/lista';
import Login from './view/login/login';
import DetalhesDoProduto from './view/detalhe/detalhe';

const Stack = createStackNavigator();

export default function App() {
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={CadastroUsuario} />
      <Stack.Screen name="Lista" component={ListaProdutos} />
      <Stack.Screen name="Produto" component={Produto} />
      <Stack.Screen name="Detalhes" component={DetalhesDoProduto} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}