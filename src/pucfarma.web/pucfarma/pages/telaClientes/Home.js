import React, { startTransition, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../template/footer';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';


const categories = [
  { id: 1, name: 'Medicamentos', style: { backgroundColor: '#FF949A' } },
  { id: 2, name: 'Beleza', style: { backgroundColor: '#EBE4FF' } },
  { id: 3, name: 'Maternidade', style: { backgroundColor: '#F9E7FF' } },
  { id: 4, name: 'Suplementos', style: { backgroundColor: '#E5FFFE' } },
  { id: 5, name: 'Higiene', style: { backgroundColor: '#CFFFC8' } },
  { id: 6, name: 'Produtos Infantis', style: { backgroundColor: '#C8EEFF' } },
  { id: 7, name: 'Dermocosmeticos', style: { backgroundColor: '#FFF3C9' } },
];

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/Produto');
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const comprar = () => {
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
      
      <View style={styles.horizontalScrollView}>
        <FlatList
          horizontal
          data={produtos}
          keyExtractor={item => item.produtoId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productItem}>
              <Image source={{ uri: item.fotoProduto }} style={styles.productImage} />
              <View style={styles.textControl}>
                <Text style={styles.productName}>{item.nomeProduto}</Text>
                <Text style={styles.avaliacao}>★: {item.produtoAvaliacao}</Text>
                <Text style={styles.textoPreco}>Preço: R${item.preco}</Text>
              </View>
              <Button title="Comprar" onPress={comprar} buttonStyle={{ width: 140, alignSelf: 'center', height: 40 }} />
            </TouchableOpacity>
          )}
        />
      </View>

      </ScrollView>
          
      {/* Outros Produtos */}
      <Text style={styles.highlightsTitle}>Outros Produtos</Text>
      <ScrollView horizontal style={styles.scrowDestaques}>
      
      <View style={styles.horizontalScrollView}>
        <FlatList
          horizontal
          data={produtos}
          keyExtractor={item => item.produtoId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productItem}>
              <Image source={{ uri: item.fotoProduto }} style={styles.productImage} />
              <View style={styles.textControl}>
                <Text style={styles.productName}>{item.nomeProduto}</Text>
                <Text style={styles.avaliacao}>★: {item.produtoAvaliacao}</Text>
                <Text style={styles.textoPreco}>Preço: R${item.preco}</Text>
              </View>
              <Button title="Comprar" onPress={comprar} buttonStyle={{ width: 140, alignSelf: 'center', height: 40 }} />
            </TouchableOpacity>
          )}
        />
      </View>

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

  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    width: 20,
    height: 20,
  },
inputIconContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    width: 250,
    alignSelf:'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#74B0FF',

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
    width: 160,
    height: 310,
    marginBottom: 50,
    marginLeft: 10,
    
    
  },
  productImage: {
    width: 'auto',
    height: 140,
    margin: 15,
    backgroundColor: '#E9E9E9',
    borderColor:'#E9E9E9',
    resizeMode: 'contain',
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
  tituloCategorias: {
    color: '#74B0FF',
    fontSize: 20,
    margin: 8,
  },
  containerCategorias: {
    height: 60,
    
  },
  textControl: {
    textAlign:'left',
    marginLeft: 10,
    height: 'auto',
    padding: 5,
    
  },
  scrowDestaques:{
    flex:1,
    height: 350,
    flexDirection: 'row',
    overflowX: 'scroll',
  },
  
  nomeProduto:{
    color: '#FFD260',
  },

  avaliacao:{
    color: '#FFD260',
  },
  
  textoPreco:{
    color: '#26CE55'
  },

});

export default HomeScreen;
