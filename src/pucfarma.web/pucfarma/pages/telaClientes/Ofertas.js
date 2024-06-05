import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Alert } from 'react-native';

import Footer from '../template/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = [
  { id: 0, name: 'Medicamentos', style: { backgroundColor: '#FF949A' } },
  { id: 1, name: 'Beleza', style: { backgroundColor: '#EBE4FF' } },
  { id: 2, name: 'Maternidade', style: { backgroundColor: '#F9E7FF' } },
  { id: 3, name: 'Suplementos', style: { backgroundColor: '#E5FFFE' } },
  { id: 4, name: 'Higiene', style: { backgroundColor: '#CFFFC8' } },
  { id: 5, name: 'Produtos Infantis', style: { backgroundColor: '#C8EEFF' } },
  { id: 6, name: 'Dermocosmeticos', style: { backgroundColor: '#FFF3C9' } },
];

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const formatarParaReais = (valor) => {
    return valor !== undefined ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/Produto/Oferta');
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  useEffect(() => {
    const filteredProducts = produtos.filter(produto =>
      produto.nomeProduto.toLowerCase().includes(searchText.toLowerCase()) &&
      (categoriaSelecionada === null || produto.categoria === categoriaSelecionada.id)
    );
    setProdutosFiltrados(filteredProducts);
  }, [searchText, produtos, categoriaSelecionada]);

  const handleCategoryPress = (category) => {
    if (category.id === categoriaSelecionada?.id) {
      setCategoriaSelecionada(null);
    } else {
      setCategoriaSelecionada(category);
    }
  };

  const handleAddToCart = async (produto) => {
    try {
      // Adiciona o produto ao carrinho
      const updatedCartItems = [...cartItems, { ...produto, quantity: 1 }];
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      // Exibe a mensagem informando que o produto foi adicionado ao carrinho
      Alert.alert('Produto Adicionado', 'O produto foi adicionado ao carrinho.');

    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      // Exibe uma mensagem de erro, se necessário
      // alert('Erro ao adicionar produto ao carrinho!');
    }
  };

  return (
    <View style={styles.container}>
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
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.categoryItem, item.style]}
              onPress={() => handleCategoryPress(item)}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Produtos com Desconto */}
      <Text style={styles.highlightsTitle}>Ofertas</Text>
      <FlatList
        horizontal
        data={produtosFiltrados}
        keyExtractor={item => item.produtoId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProdutosCliente', { productId: item.produtoId })}>
            <Image source={{ uri: `data:image/png;base64,${item.fotoProduto}` }} style={styles.productImage} />
            <View style={styles.textControl}>
              <Text style={styles.productName}>{item.nomeProduto}</Text>
              <Text style={styles.avaliacao}>★: {item.produtoAvaliacao}</Text>
              <Text style={styles.textoPreco}>Preço: {formatarParaReais(item.preco)}</Text>
              <Text style={styles.textoPreco}>{item.categoria}</Text>
            </View>
            <TouchableOpacity style={styles.botaoComprar} onPress={() => handleAddToCart(item)}>
              <Text style={styles.textoBotao}>Comprar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 50,
    alignItems: 'center',
    width: 250,
    alignSelf: 'center',
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
    borderColor: '#E9E9E9',
    width: 160,
    height: 290,
    marginBottom: 50,
    marginLeft: 10,
  },
  productImage: {
    width: 'auto',
    height: 100,
    backgroundColor: '#E9E9E9',
    borderColor: '#E9E9E9',
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
    color: '#26CE55',
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
    textAlign: 'left',
    marginLeft: 10,
    height: 'auto',
    padding: 5,
  },
  scrowDestaques: {
    flex: 1,
    height: 350,
    flexDirection: 'row',
    overflowX: 'scroll',
  },
  nomeProduto: {
    color: '#FFD260',
  },
  avaliacao: {
    color: '#FFD260',
  },
  textoPreco: {
    color: '#26CE55',
  },
  botaoComprar: {
    backgroundColor: '#74B0FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 8,
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
