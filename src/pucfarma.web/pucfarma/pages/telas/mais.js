import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, Tab, handleTabPress } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';




import Footer from '../template/footer';
import Header2 from '../template/header2';

const Mais = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View style={styles.container}>
      <Header2 />

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('DetalhesConta')}>
          <Image source={require('../../assets/perfil-de-usuario.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Detalhes da conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('PedidosAndamento')} >
          <Image source={require('../../assets/caixa.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Pedidos em andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('AvaliacoesPendentes')}>
          <Image source={require('../../assets/estrela.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Avaliações pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('HistoricoCompra')}>
          <Image source={require('../../assets/relogio.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Histórico de compra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('InformaçõesLoja')}>
          <Image source={require('../../assets/cuidado.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Informações da loja</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Image source={require('../../assets/sair.png')} style={styles.tabIcon} />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    alignItems: 'center'
  },
  chooseImageText: {
    marginTop: 10,
    color: '#74b0ff',
  },
  tabsContainer: {
    marginTop: 80,
    backgroundColor: 'white',
    width: '95%',
    height: '50%',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  tab: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 24,
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
  tabText: {
    fontSize: 18,
    color: '#898989',
    marginLeft: 30
  },
  logoutButtonContainer: {
    backgroundColor: 'white',
    marginTop: 5,
    height: '10%',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '25%'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#FF949A'
  },
  img:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90
  },
  perfil:{
    color: '#74b0ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  }
});

export default Mais;