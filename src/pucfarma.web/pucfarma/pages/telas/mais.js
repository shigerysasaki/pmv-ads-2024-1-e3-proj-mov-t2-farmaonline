import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

  // Função para lidar com o logout
  const handleLogout = () => {
    try {
      // Realiza as operações de logout, como limpar tokens de autenticação, etc.
      // Exemplo: navigation.navigate('Login');
      console.log("Fazendo logout...");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header2 />

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('DetalhesDaConta')}>
          <Image source={require('../../assets/perfil-de-usuario.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Detalhes da conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('Andamento')} >
          <Image source={require('../../assets/caixa.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Pedidos em andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('AvaliacoesPendentes')}>
          <Image source={require('../../assets/estrela.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Avaliações pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('HistoricoPedidosCliente')}>
          <Image source={require('../../assets/relogio.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Histórico de compra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('InformacoesLoja')}>
          <Image source={require('../../assets/cuidado.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Informações da loja</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
});

export default Mais;
