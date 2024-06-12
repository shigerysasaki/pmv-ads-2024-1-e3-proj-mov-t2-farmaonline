import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const categories = [
    { id: 1, name: 'Medicamentos', style: styles.med, textStyle: styles.textomed },
    { id: 2, name: 'Beleza', style: styles.bel, textStyle: styles.textobel },
    { id: 3, name: 'Maternidade', style: styles.mat, textStyle: styles.textomat },
    { id: 4, name: 'Suplementos', style: styles.sup, textStyle: styles.textosup },
    { id: 5, name: 'Higiene', style: styles.hig, textStyle: styles.textohig },
    { id: 6, name: 'Produtos infantis', style: styles.inf, textStyle: styles.textoinf },
    { id: 7, name: 'Dermocosméticos', style: styles.derm, textStyle: styles.textoderm },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateToCategory = (category) => {
    setMenuVisible(false);
    navigation.navigate('Home', { selectedCategory: category });
  };

  const handleSearch = () => {
    // Lógica para lidar com a pesquisa
  };

  const handleCart = () => {
    // Lógica para lidar com o carrinho
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/Logo1.png')} style={styles.logo} />
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={toggleMenu} style={styles.toggle}>
          <Image source={require('../../assets/menu.png')} style={styles.tabIcon} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleSearch}>
            <MaterialIcons name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCart}>
            <MaterialIcons name="shopping-cart" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {menuVisible && (
          <View showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id} 
                style={[styles.category, category.style]} 
                onPress={() => navigateToCategory(category.name)}
              >
                <Text style={category.textStyle}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 30, // Aumentando o padding vertical para aumentar a altura
    backgroundColor: '#fff',
    zIndex: 999,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  menuContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  toggle: {
    marginRight: 25,
  },
  tabIcon: {
    width: 25,
    height: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    position: 'absolute',
    top: 60,
    backgroundColor: '#fff',
    zIndex: 999,
    maxHeight: 500,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    padding: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  med: {
    width: 200,
    height: 50,
    margin: 10,
    backgroundColor: '#ffeaeb',
    borderWidth: 1,
    borderColor: '#ff949a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textomed: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ff949a',
  },
  bel: {
    width: 200,
    height: 50,
    margin: 10,
    backgroundColor: '#ebe4ff',
    borderWidth: 1,
    borderColor: '#b094ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textobel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#b094ff',
  },
  mat: {
    width: 200,
    height: 50,
    margin: 10,
    backgroundColor: '#f9e7ff',
    borderWidth: 1,
    borderColor: '#e394ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textomat: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#e394ff',
  },
  sup: {
    width: 200,
    height: 50,
    margin: 10,
    backgroundColor: '#e4fffe',
    borderWidth: 1,
    borderColor: '#82dbd6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textosup: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#82dbd6',
  },
  hig: {
    width: 200,
    height: 50,
    margin: 10,
    backgroundColor: '#cfffc8',
    borderWidth: 1,
    borderColor: '#3aC224',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textohig: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3aC224',
  },
  inf: {
    width: 200,
    height: 50,
    margin: 10,
    backgroundColor: '#E5FFFE',
    borderWidth: 1,
    borderColor: '#74B0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoinf: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#74B0FF',
  },
  derm: {
    width: 200,
    height: 50,
    margin: 10,
    backgroundColor: '#FFF3C9',
    borderWidth: 1,
    borderColor: '#DBAE3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoderm: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#DBAE3D',
  },
});

export default Header;
