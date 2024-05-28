import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from './footer';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Inverte o estado do menu
  };


  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/Logo1.png')} style={styles.logo} />
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={toggleMenu} style={styles.toggle}>
          <MaterialIcons name="menu" size={30} color="#74b0ff" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={menuOpen}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
          <TouchableOpacity onPress={() => setMenuOpen(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.med}>
              <Text style={styles.textomed}>Medicamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bel}>
              <Text style={styles.textobel}>Beleza</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mat}>
              <Text style={styles.textomat}>Maternidade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sup}>
              <Text style={styles.textosup}>Suplementos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hig}>
              <Text style={styles.textohig}>Higiene</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inf}>
              <Text style={styles.textoinf}>Produtos infantis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.derm}>
              <Text style={styles.textoderm}>Dermocosméticos</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: 70,
    height: 70,
  },
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  toggle: {
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  menu: {
    width: 400,
    marginTop: 40,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#74b0ff',
  },
  med: {
    width: 350,
    height: 70,
    margin: 10,
    backgroundColor: '#ffeaeb',
    borderWidth: 1,
    borderColor: '#ff949a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textomed: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff949a'
  },
  bel: {
    width: 350,
    height: 70,
    margin: 10,
    backgroundColor: '#ebe4ff',
    borderWidth: 1,
    borderColor: '#b094ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textobel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b094ff'
  },
  mat: {
    width: 350,
    height: 70,
    margin: 10,
    backgroundColor: '#f9e7ff',
    borderWidth: 1,
    borderColor: '#e394ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textomat: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e394ff'
  },
  sup: {
    width: 350,
    height: 70,
    margin: 10,
    backgroundColor: '#e4fffe',
    borderWidth: 1,
    borderColor: '#82dbd6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textosup: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#82dbd6'
  },
  hig: {
    width: 350,
    height: 70,
    margin: 10,
    backgroundColor: '#cfffc8',
    borderWidth: 1,
    borderColor: '#3aC224',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textohig: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3aC224'
  },
  inf: {
    width: 350,
    height: 70,
    margin: 10,
    backgroundColor: '#E5FFFE',
    borderWidth: 1,
    borderColor: '#74B0FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoinf: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#74B0FF'
  },
  derm: {
    width: 350,
    height: 70,
    margin: 10,
    backgroundColor: '#FFF3C9',
    borderWidth: 1,
    borderColor: '#DBAE3D',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoderm: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DBAE3D'
  },
});

export default Header;
