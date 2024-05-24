import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Home' && styles.active]}
        onPress={() => handleTabPress('Home')}>
        {activeTab === 'home' ? (
          <Image source={require('../../assets/homeactive.png')} style={styles.icon} />
        ) : (
          <Image source={require('../../assets/home.png')} style={styles.icon} />
        )}
        <Text style={[styles.tabLabel, activeTab === 'Home' && styles.activeTabLabel]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Ofertas' && styles.active]}
        onPress={() => handleTabPress('Ofertas')}>
        {activeTab === 'Ofertas' ? (
          <Image source={require('../../assets/oferactive.png')} style={styles.icon} />
        ) : (
          <Image source={require('../../assets/ofer.png')} style={styles.icon} />
        )}
        <Text style={[styles.tabLabel, activeTab === 'Ofertas' && styles.activeTabLabel]}>Ofertas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Carrinho' && styles.active]}
        onPress={() => handleTabPress('Carrinho')}>
        {activeTab === 'Carrinho' ? (
          <Image source={require('../../assets/cartactive.png')} style={styles.icon} />
        ) : (
          <Image source={require('../../assets/cart.png')} style={styles.icon} />
        )}
        <Text style={[styles.tabLabel, activeTab === 'Carrinho' && styles.activeTabLabel]}>Carrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Mais' && styles.active]}
        onPress={() => handleTabPress('Mais')}>
        {activeTab === 'Mais' ? (
          <Image source={require('../../assets/moreactive.png')} style={styles.icon} />
        ) : (
          <Image source={require('../../assets/more.png')} style={styles.icon} />
        )}
        <Text style={[styles.tabLabel, activeTab === 'Mais' && styles.activeTabLabel]}>Mais</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    width: '100%',
    height: '9%',
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

export default Footer;