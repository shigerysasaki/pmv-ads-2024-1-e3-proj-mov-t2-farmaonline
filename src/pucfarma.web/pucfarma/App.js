import 'react-native-gesture-handler';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Cadastro from './pages/autenticacao/cadastro/Cadastro';
import Login from './pages/autenticacao/cadastro/Login';
import Home from './pages/autenticacao/cadastro/Home';
import EditarProduto from './pages/telas/EditarProduto';
import Mais from './pages/telas/mais';
import Andamento from './pages/telas/Andamento';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{title: ''}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{
          headerShown: false,
          headerTransparent: true,
          title: '',
        }} />
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false,
          headerTransparent: true,
          title: '',
        }} />
        <Stack.Screen name="Mais" component={Mais} options={{
          headerShown: false,
          headerTransparent: true,
          title: '',
        }} />
        <Stack.Screen name="Andamento" component={Andamento} options={{
          headerShown: false,
        }} />
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