import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, Tab, } from 'react-native';
import Footeradm from '../template/footer';
import Header2 from '../template/header2';
import { useNavigation } from '@react-navigation/native';
import Header2 from '../template/header2';
import Footer from '../template/footer';

const Mais = () => {
  const navigation = useNavigation();

  // Função para lidar com o logout
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header2/>
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('DetalhesConta')}>
          <Image source={require('../../assets/perfil-de-usuario.png')} style={styles.tabIcon} />
          <Text style={styles.tabText}>Detalhes da conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('PedidosAndamento')}>
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
    flex: 1,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    margin: 50,
    width: 350,
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
    marginLeft: 30,
  },
  logoutButtonContainer: {
    marginBottom: 'auto',
    backgroundColor: 'white',
    marginTop: 'auto',
    height: '10%',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#FF949A',
  },
});

export default Mais;
