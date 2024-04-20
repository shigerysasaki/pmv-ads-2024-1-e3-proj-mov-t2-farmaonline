import 'react-native-gesture-handler';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Cadastro from './pages/autenticacao/cadastro/Cadastro';
import Login from './pages/autenticacao/cadastro/Login';
import EditarProduto from './pages/EditarProduto';
import Mais from './pages/telas/mais';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="EditarProduto" component={EditarProduto} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Mais" component={Mais} options={{
          headerShown: false,
          headerTransparent: true,
          title: '',
        }}/>
        
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