import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Header2 = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="arrow-back" size={30} color="#898989" />
      </TouchableOpacity>
      <Text style={styles.texto}>{route.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 90,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  texto: {
    marginTop:10,
    color: '#898989',
    fontSize : 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent:'center',
    
  },
  back: {
    position: 'absolute',
    left: 10,
  }
});

export default Header2;
