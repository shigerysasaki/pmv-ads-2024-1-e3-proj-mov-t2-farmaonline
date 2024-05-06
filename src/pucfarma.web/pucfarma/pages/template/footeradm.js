import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footeradm = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('Dados');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Dados' && styles.active]}
        onPress={() => handleTabPress('Dados')}>
        {activeTab === 'Dados' ? (
          <Image source={require('../../assets/analise.png')} style={styles.icon} />
        ) : (
          <Image source={require('../../assets/analiseactive.png')} style={styles.icon} />
        )}
        <Text style={[styles.tabLabel, activeTab === 'Dados' && styles.activeTabLabel]}>Dados</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'EditarProduto' && styles.active]}
        onPress={() => handleTabPress('EditarProduto')}>
        {activeTab === 'EditarProduto' ? (
          <Image source={require('../../assets/camadaactive.png')} style={styles.icon} />
        ) : (
          <Image source={require('../../assets/camada.png')} style={styles.icon} />
        )}
        <Text style={[styles.tabLabel, activeTab === 'EditarProduto' && styles.activeTabLabel]}>Produtos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'andamento' && styles.active]}
        onPress={() => handleTabPress('andamento')}>
        {activeTab === 'andamento' ? (
          <Image source={require('../../assets/caixaactive.png')} style={styles.icon} />
        ) : (
          <Image source={require('../../assets/caixa.png')} style={styles.icon} />
        )}
        <Text style={[styles.tabLabel, activeTab === 'andamento' && styles.activeTabLabel]}>Pedidos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Historico' && styles.active]}
        onPress={() => handleTabPress('Historico')}>
        {activeTab === 'Historico' ? (
          <Image source={require('../../assets/relogioactive.png')} style={styles.icon} />
        ) : (
          <Image source={require('../../assets/relogio.png')} style={styles.icon} />
        )}
        <Text style={[styles.tabLabel, activeTab === 'Historico' && styles.activeTabLabel]}>Historico</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '10%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#FFFFFF',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#898989',
  },
  activeTabLabel: {
    color: '#74b0ff'
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Footeradm;