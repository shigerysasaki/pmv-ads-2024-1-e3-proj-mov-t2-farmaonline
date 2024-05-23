import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Footer from '../template/footeradm';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    handleGetProdutos();
  }, []);

  const handleGetProdutos = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5035/api/Produto", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }

      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Não foi possível buscar os produtos. Por favor, tente novamente mais tarde.');
    }
  };

  const handleEditProduct = (id) => {
    navigation.navigate('EditarProduto', { productId: id }); // Certifique-se de que 'EditarProduto' é o nome da tela no App.js
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.stockInfo}>Estoque: {item.estoqueDisponivel}</Text>
      <View style={styles.productContent}>
        <View style={styles.imagePlaceholder}></View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.nomeProduto}</Text>
          <Text style={styles.productDetails}>Preço individual: {item.preco}</Text>
          <Text style={styles.productDetails}>ID do produto: {item.produtoId}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => handleEditProduct(item.produtoId)}>
        <Text style={styles.editButtonText}>Editar Produto</Text>
      </TouchableOpacity>
    </View>
  );

  
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Produtos</Text>
      <View style={styles.searchContainer}>
        <View style={styles.inputIconContainer}>
          <Image
            source={require('../../assets/lupa.png')}
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditarProduto')}>
        <Text style={styles.addButtonText}>+ Adicionar produto</Text>
      </TouchableOpacity>
      <FlatList
        data={produtos.filter(produto => produto.nomeProduto.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.produtoId.toString()}
        
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
    color: '#898989',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputIconContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    width: 20,
    height: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 10,
  },
  addButton: {
    backgroundColor: "#74B0FF", // Nova cor azul claro para o botão de adicionar
    borderRadius: 2, // Bordas com curvatura menor
    paddingVertical: 10, // Preenchimento vertical ao redor do texto
    paddingHorizontal: 10, // Preenchimento horizontal ao redor do texto
    marginHorizontal: 20, // Margem do lado esquerdo para afastar das bordas da tela
    marginBottom: 20, // Margem inferior
    alignSelf: 'flex-start', // Alinha o botão à esquerda da tela
  },
  addButtonText: {
    color: '#ffffff', // Cor do texto do botão de adicionar
    fontWeight: 'bold', // Negrito para o texto do botão
    fontSize: 16, // Tamanho da fonte do texto do botão
  },
  productItem: {
    flexDirection: 'column',
    justifyContent: 'space-between', // Distribuir o conteúdo verticalmente
    backgroundColor: '#fff',
    borderColor: '#E3E3E3',
    height: 130,
    borderWidth: 1,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  stockInfo: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 10,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productDetails: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#74B0FF',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 110,
    height: 30,
    alignSelf: 'flex-end',
    marginBottom: 200,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
