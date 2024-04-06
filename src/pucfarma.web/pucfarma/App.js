import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Cadastro from './pages/autenticacao/cadastro/Cadastro';

const Stack = createStackNavigator();

export default function App() {
return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name=" " component={Cadastro} />
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