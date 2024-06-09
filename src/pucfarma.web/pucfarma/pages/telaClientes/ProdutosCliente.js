import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../template/footer';
import Header from '../template/header';

const ProdutosCliente = ({ route, navigation, userId }) => {
  const { productId } = route.params; // Obtenção do productId dos parâmetros da rota
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = async () => {
    const currentCartItems = await AsyncStorage.getItem('cartItems_${userId}');
    const updatedCartItems = [...(currentCartItems ? JSON.parse(currentCartItems) : []), { ...productDetails, quantity }];
    setCartItems(updatedCartItems);
    AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    Alert.alert('Produto Adicionado', 'O produto foi adicionado ao carrinho com sucesso!');
  };

  useEffect(() => {
    const saveCartItems = async () => {
      if (cartItems.length > 0) {
        await AsyncStorage.setItem('cartItems_${userId}', JSON.stringify(cartItems));
      }
    };
    saveCartItems();
  }, [cartItems]);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5035/api/Produto/${productId}`);
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
        }
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

  const { nomeProduto, fabricante, fotoProduto, preco, descricao, avaliacoes, porcentagemDesconto } = productDetails;
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Header navigation={navigation} />
        <Image style={styles.productImage} source={{ uri: `data:image/png;base64,${fotoProduto}` }} />
        <View style={styles.productCard}>
          <Text style={styles.productName}>{nomeProduto}</Text>
          <Text style={styles.manufacturer}>{fabricante}</Text>
          <Text style={styles.rating}>{avaliacoes && avaliacoes.length > 0 ? `${avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length} (${avaliacoes.length} avaliações)` : 'Sem avaliações'}</Text>
          <Text style={styles.lineThrough}>{`R$ ${preco.toFixed(2)}`}</Text>
          <Text style={styles.discountPrice}>{`R$ ${(preco * (1 - porcentagemDesconto / 100)).toFixed(2)}`}</Text>
          <View style={styles.quantitySection}>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              onChangeText={(text) => setQuantity(text)}
              value={String(quantity)}
              placeholder="Qty"
            />
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>Descrição</Text>
          <Text style={styles.descriptionText}>{descricao}</Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Avaliações</Text>
          <Text style={styles.reviewCount}>{avaliacoes ? `${avaliacoes.length} comentários` : '0 comentários'}</Text>
          {avaliacoes && avaliacoes.map((avaliacao, index) => (
            <View key={index} style={styles.reviewCard}>
              <Icon name="person-circle" size={40} color="#000" />
              <View style={styles.reviewContent}>
                <Text style={styles.reviewerName}>{avaliacao.usuarioId} (User ID)</Text>
                <Text style={styles.reviewerReview}>{avaliacao.comentario}</Text>
                <Text style={styles.reviewerRating}>⭐ {avaliacao.nota}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer style={styles.footer} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
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
    justifyContent: 'space-between', // Maintain vertical spacing
    height: 190, // Adjusted to fit content
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#74B0FF', // Darker text color for better readability
    marginBottom: 4, // Tighter spacing
  },
  manufacturer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FFD260',
    marginBottom: 4,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    color: '#666',
    marginBottom: 4,
  },
  discountPrice: {
    fontSize: 18,
    color: '#26CE55', // Orange color for discount price
    fontWeight: 'bold',
    marginBottom: 10, // More space before the quantity section
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure the button is aligned to the right
  },
  quantityInput: {
    width: 46, // As specified
    height: 23, // As specified
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
    paddingHorizontal: 5, // Reduced padding to fit the content in the given size
    fontSize: 12,
  },
  addToCartButton: {
    backgroundColor: '#74B0FF',
    heigh: 35,
    padding: 8, // Slightly reduced padding
    borderRadius: 3, // Rounded corners for the button
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12, // Smaller font for the button text
  },
  descriptionSection: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    color: '#666',
  },
  reviewSection: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewCount: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
  },
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  reviewContent: {
    marginLeft: 10,
  },
  reviewerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewerReview: {
    fontSize: 16,
    color: '#666',
  },
  reviewerRating: {
    fontSize: 16,
    color: '#FFD700', // Gold color for the stars
  },

});


export default ProdutosCliente;