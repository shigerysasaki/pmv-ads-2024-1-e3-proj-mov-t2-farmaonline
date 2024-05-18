import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProdutosCliente = ({ route, navigation }) => {
  const { productId } = route.params;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5035/api/Produto/${productId}`);
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!productDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const { nomeProduto, fabricante, fotoProduto, preco, descricao } = productDetails;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Menu Options')}>
          <Icon name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Image 
        style={styles.productImage} 
        source={{ uri: `data:image/png;base64,${fotoProduto}` }} 
      />
      <View style={styles.productCard}>
        <Text style={styles.productName}>{nomeProduto}</Text>
        <Text style={styles.manufacturer}>{fabricante}</Text>
        <Text style={styles.description}>{descricao}</Text>
        <Text style={styles.price}>{`Preço: R$${preco}`}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#74B0FF',
    marginBottom: 4,
  },
  manufacturer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#26CE55',
  },
});

export default ProdutosCliente;
