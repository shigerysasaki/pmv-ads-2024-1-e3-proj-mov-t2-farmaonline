import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Cadastro from './pages/autenticacao/cadastro/Cadastro';
import Login from './pages/autenticacao/cadastro/Login';
import Dados from './pages/autenticacao/cadastro/Dados';
import EditarProduto from './pages/telas/EditarProduto';
import Produtos from './pages/telas/Produtos';

import Historico from './pages/telas/Historico';
import Mais from './pages/telas/Mais';
import Home from './pages/telaClientes/Home';
import ProdutosCliente from './pages/telaClientes/ProdutosCliente';
import DetalhesDaConta from './pages/telaClientes/DetalhesDaConta';
import EnderecoDeEntrega from './pages/telaClientes/EnderecoDeEntrega';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
     
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dados" component={Dados} />
        <Stack.Screen name="Produtos" component={Produtos} />
        <Stack.Screen name="EditarProduto" component={EditarProduto} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="ProdutosCliente" component={ProdutosCliente} />
         <Stack.Screen name="DetalhesDaConta" component={DetalhesDaConta} />
        <Stack.Screen name="EnderecoDeEntrega" component={EnderecoDeEntrega} />

        
        <Stack.Screen name="Mais" component={Mais} options={{
          headerShown: false,
          headerTransparent: true,
          title: '',
        }} />
        <Stack.Screen name="Home" component={Home} />
       

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
