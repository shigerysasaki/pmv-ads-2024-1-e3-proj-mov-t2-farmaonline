import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const Header2 = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
      <Image source={require('../../assets/back.png')} style={styles.tabIcon} />
      </TouchableOpacity>
      <Text style={styles.texto}>{route.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    width: '100%',
    height: '9%',
    height: 90,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  texto: {
    color: '#898989',
    fontSize : 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent:'center',
    
  },
  back: {
    position: 'absolute',
    left: 25,
  },
  tabIcon: {
    width: 30,
    height: 30,

},
});

export default Header2;
