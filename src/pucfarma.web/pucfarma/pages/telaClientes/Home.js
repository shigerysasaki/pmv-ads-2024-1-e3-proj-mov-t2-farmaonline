import React, { startTransition, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../template/footer';
import Header from '../template/header'
/*
import { color } from 'react-native-elements/dist/helpers';
import { Button } from 'react-native-elements';
*/



const categories = [
  { id: 1, name: 'Medicamentos ', style: { backgroundColor: '#FF949A' } },
  { id: 2, name: 'Beleza', style: { backgroundColor: '#EBE4FF' } },
  { id: 3, name: 'Maternidade', style: { backgroundColor: '#F9E7FF' } },
  { id: 4, name: 'Suplementos', style: { backgroundColor: '#E5FFFE' } },
  { id: 5, name: 'Higiene', style: { backgroundColor: '#CFFFC8' } },
  { id: 6, name: 'Produtos Infantis', style: { backgroundColor: '#C8EEFF' } },
  { id: 7, name: 'Dermocosmeticos', style: { backgroundColor: '#FFF3C9' } },
];

const products = [
  { id: 1, name: 'Produto 1', image: require('../../assets/oferactive.png'), price: 9.99, category: 1 },
  { id: 2, name: 'Produto 2', image: require('../../assets/oferactive.png'), price: 19.99, category: 2 },
  { id: 3, name: 'Produto 3', image: require('../../assets/oferactive.png'), price: 14.99, category: 3 },
  { id: 4, name: 'Produto 4', image: require('../../assets/oferactive.png'), price: 24.99, category: 1 },
  { id: 5, name: 'Produto 5', image: require('../../assets/oferactive.png'), price: 29.99, category: 2 },
  { id: 6, name: 'Produto 6', image: require('../../assets/oferactive.png'), price: 39.99, category: 3 },
  { id: 7, name: 'Produto 7', image: require('../../assets/oferactive.png'), price: 49.99, category: 1 },
  // Adicione mais produtos conforme necessário
];



const HomeScreen = () => {
  // Estado para armazenar o texto da barra de pesquisa
  const [searchText, setSearchText] = useState('');

  // Função para filtrar os produtos com base no texto de pesquisa
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Filtrando produtos para a seção "Outros Produtos"
  const otherProducts = products.filter(product => product.category !== 1);

  // Filtrando produtos de "Outros Produtos" com base no texto de pesquisa
  const filteredOtherProducts = otherProducts.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );


    const comprar = () => {
      // Lógica a ser executada quando o botão é pressionado
      console.log('Botão pressionado');
    };
 
  return (
    
    
    <ScrollView style={styles.container}>
      

      {/* Barra de Pesquisa */}
      <View style={styles.inputIconContainer}>
          <Image
            source={require('../../assets/lupa.png')}
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Pesquisar produto..."
            placeholderTextColor="#74B0FF"
            onChangeText={setSearchText}
            value={searchText}
          />
      </View>   

            {/* Categorias */}

        
        <Text style={styles.tituloCategorias}>Categorias</Text>
        <View style={styles.containerCategorias}>
        <ScrollView horizontal style={styles.header}>
          {categories.map(category => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryItem, category.style]}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>  
          
        {/* Destaques */}
        <Text style={styles.highlightsTitle}>Destaques</Text>
        <ScrollView horizontal style={styles.scrowDestaques}>
          <FlatList
            data={filteredProducts}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productItem}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.textControl}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.avaliacao}>★ 5.0 </Text>
                  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <Button title="Comprar" onPress={comprar} buttonStyle={{ width: 140, alignSelf: 'center', height: 40 }}>Comprar</Button>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>

        {/* Outros Produtos */}
        <Text style={styles.highlightsTitle}>Outros Produtos</Text>
        <ScrollView horizontal style={styles.scrowDestaques}>
          <FlatList
            data={filteredProducts}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productItem}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.textControl}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.avaliacao}>★ 5.0 </Text>
                  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <Button title="Comprar" onPress={comprar} buttonStyle={{ width: 140, alignSelf: 'center', height:40  }}>Comprar</Button>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
      <Footer/>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  

  container: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    

    
  },
  header: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 5,
    padding: 8,
    
  },
  categoryItem: {
    height: 40,
    padding: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    
  },
  searchBar: {
    alignSelf: 'center',

    
  },
  highlightsTitle: {
    marginTop: 20,
    fontSize: 20,
    marginLeft: 10,
    margin: 10,
    color: '#74B0FF',
    },
  productItem: {
    justifyContent: 'center',
    alignItems: 'start',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor:'#E9E9E9',
    width: 160, // Ajuste o tamanho conforme necessário
    height: 310,
    marginBottom: 50,
    marginLeft: 10, // Adiciona um espaçamento à esquerda
  },
  productImage: {
    
    width: 'auto',
    height: 140,
    margin: 15,
    backgroundColor: '#E9E9E9',
    borderColor:'#E9E9E9',
    resizeMode: 'contain', // Ajusta o modo de redimensionamento da imagem
  },
  productName: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: '#74B0FF',
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    color:'#26CE55',
    textAlign: 'left',
  },
  otherProductsTitle: {
    marginTop: 20,
    fontSize: 20,
    color: '#74B0FF',
    marginLeft: 10,
  },
  otherProductsContainer: {
    flex: 1, // Use flexbox para permitir que o contêiner cresça dinamicamente
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  
  searchIcon:{
    height: 10,
    width: 10,
  },
  tituloCategorias:{
    color: '#74B0FF',
    fontSize: 20,
    margin: 8,


  },
  containerCategorias:{
    height: 60,
  },

  scrowDestaques:{
    height: 'auto',
    
  },

  avaliacao:{
    color: '#FFD260',
    fontSize: 14,

  },

  textControl:{
    textAlign:'left',
    marginLeft: 10,
    height: 'auto',
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    width: 20,
    height: 20,
    
  },
  inputIconContainer: {
    margin:10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    borderColor: '#74B0FF',
    borderWidth: 1,
    width:300,
    height: 30,
    justifyContent:'center',
    alignSelf:'center',

  },


});

export default HomeScreen;
