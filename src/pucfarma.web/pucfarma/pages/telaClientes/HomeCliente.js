import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const categories = [
  { id: 1, name: 'Categoria 1', style: { backgroundColor: '#f0f0f0' } },
  { id: 2, name: 'Categoria 2', style: { backgroundColor: 'lightblue' } },
  { id: 3, name: 'Categoria 3', style: { backgroundColor: 'lightgreen' } },
  { id: 4, name: 'Categoria 4', style: { backgroundColor: 'lightpink' } },
  { id: 5, name: 'Categoria 5', style: { backgroundColor: 'lightsalmon' } },
  { id: 6, name: 'Categoria 6', style: { backgroundColor: 'lightyellow' } },
  { id: 7, name: 'Categoria 7', style: { backgroundColor: 'lightcyan' } },
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

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar produtos..."
        onChangeText={setSearchText}
        value={searchText}
      />

      {/* Categorias */}
      
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

      {/* Destaques */}
      <Text style={styles.highlightsTitle}>Destaques</Text>
      <FlatList
        data={filteredProducts}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />

      {/* Outros Produtos */}
      <Text style={styles.otherProductsTitle}>Outros Produtos</Text>
      <FlatList
        contentContainerStyle={styles.otherProductsContainer} // Adicionando o estilo ao contêiner
        data={filteredOtherProducts}
        numColumns={2} // Definindo para duas colunas
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
    
  },
  categoryItem: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 16,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  highlightsTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  productItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: 150, // Ajuste o tamanho conforme necessário
    height: 200, // Ajuste o tamanho conforme necessário
    marginBottom: 10,
    marginLeft: 10, // Adiciona um espaçamento à esquerda
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain', // Ajusta o modo de redimensionamento da imagem
  },
  productName: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  otherProductsTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  otherProductsContainer: {
    padding: 10, // Adiciona um espaçamento horizontal
    alignItems: 'center',
    justifyContent: 'space-around'
  },
});

export default HomeScreen;
