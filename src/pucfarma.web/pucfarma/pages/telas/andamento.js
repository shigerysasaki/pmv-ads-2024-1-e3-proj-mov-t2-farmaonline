import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Footer from '../template/footer';
import Header2 from '../template/header2';

const Andamento = () => {
  return (
    <View style={styles.container}>
      <Header2 />
      <View style={{ marginTop: 10 }} />
      <ScrollView style={styles.tabsContainer}>
        <View style={styles.tab}>
          {[...Array(3)].map((_, index) => (
            <TouchableOpacity key={index} style={styles.itemContainer}>
              <TouchableOpacity onPress={() => console.log('Imagem pressionada')} activeOpacity={1}>
                <Image source={require('../../assets/quadrado.png')} style={styles.tabIcon} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.text1} onPress={() => console.log('Produto pressionado')}>Produto_00{index + 1}</Text>
                <Text style={styles.text2}>Preço Individual: <Text>R$ 00.00</Text></Text>
                <Text style={styles.text2}>Valor total: <Text style={styles.money}>R$ 00.00</Text></Text>
              </View>
              <View style={styles.quantityContainer}>
                <Text style={styles.text3}>Quantidade: <Text>1</Text></Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginBottom: 10 }} />
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  tabsContainer: {
    backgroundColor: 'white',
    marginTop: 110,
    height: '65%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '30%',
  },
  tab: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tabIcon: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    color: '#74B0FF',
    fontSize: 14,
    marginBottom: 5, 
    textAlign: 'left', 
  },
  text2: {
    fontSize: 12,
    color: '#898989',
    marginTop: 10, 
    textAlign: 'left', 
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'flex-end', 
  },
  text3: {
    color: '#898989',
    fontSize: 12,
    marginLeft: 50, 
    marginTop: 50,
    textAlign: 'right', 
  },
  money: {
    color: '#26CE55',
    fontSize: 13,
  },
});

export default Andamento;
