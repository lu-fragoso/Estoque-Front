import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Produto from './view/produto/produto';
import CadastroUsuario from './view/usuario/usuario';

const Stack = createStackNavigator();

export default function App() {
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Produto" component={Produto} />
      <Stack.Screen name="Cadastro" component={CadastroUsuario} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}