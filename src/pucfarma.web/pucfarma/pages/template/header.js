import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      {menuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => {}}>
            <Text>Medicamento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text>Beleza</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text>Higiene</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '9%',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: 70,
    height: 70,
    marginLeft: 20,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 0,
    backgroundColor: '#fff',
    width: 200,
    borderRadius: 10,
    padding: 10,
  },
  toggle:{
    marginRight: 20,
    marginTop: 20,
  }
});

export default Header;