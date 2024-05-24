import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, Tab, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


import Footer from '../template/footer';
import Header2 from '../template/header2';

const InformaçõesLoja = () => {

  return (
    <View style={styles.container}>
      <Header2 />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/farmaciainfo.jpg')} style={styles.pic} />
      </View>

        <View style={styles.info}>
        <Text style={styles.title}>Localização</Text>
        <Text style={styles.desc}>Endereço:</Text>

        <Text style={styles.title}>Contato</Text>
        <Text style={styles.desc}>Telefone 1:</Text>
        <Text style={styles.desc}>Telefone 2:</Text>
        <Text style={styles.desc}>E-mail:</Text>

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
  info: {
    width: '95%',
    height: 250,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 242
  },
  title: {
    color: '#898989',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 50
  },
  desc:{
    color: '#898989',
    fontSize: 15,
    margin: 5,
    marginLeft: 50
  },
  pic:{
    width: 350,
    height: 150,
    margin: 40,
    borderRadius: 5
  }
});

export default InformaçõesLoja;