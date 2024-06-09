import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, handleTabPress, localStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from '../template/footer';
import Header from '../template/header';

const Carrinho = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Home');

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        navigation.navigate(tab);
    };

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const storedCartItems = await AsyncStorage.getItem('cartItems_${userId}');
                if (storedCartItems) {
                    setCartItems(JSON.parse(storedCartItems));
                }
            } catch (error) {
                console.error('Erro ao recuperar itens do carrinho:', error);
            }
        };
        getCartItems();
    }, []);

    const handleRemoveItem = (itemId) => {
        const itemIndex = cartItems.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems.splice(itemIndex, 1);
            setCartItems(updatedCartItems);
            AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
            console.warn(`Item with ID ${itemId} not found in cart`);
        }
    };

    const handleIncreaseQuantity = async (itemId) => {
        const itemIndex = cartItems.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
            const updatedCartItems = cartItems.slice(); // Cria uma cópia do array cartItems
    
            updatedCartItems[itemIndex] = {
                ...updatedCartItems[itemIndex],
                quantity: updatedCartItems[itemIndex].quantity + 1,
            };
    
            setCartItems(updatedCartItems);
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
            console.warn(`Item with ID ${itemId} not found in cart`);
        }
    };
    


    const handleDecreaseQuantity = async (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === itemId) {
                const newQuantity = item.quantity - 1;
                return {
                    ...item,
                    quantity: newQuantity > 0 ? newQuantity : 1,
                };
            }
            return item;
        });

        setCartItems(updatedCartItems);
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };



    const getTotalPrice = () => {
        return cartItems.reduce((acc, item) => acc + (item.preco * item.quantity), 0);
    };

    return (
        <View style={styles.container}>
          <Header navigation={navigation} />
            <View style={styles.productList}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {cartItems.length === 0 ? (
                        <View style={styles.emptyCart}>
                            <Image source={require('../../assets/sacola.png')} style={styles.imagempty} />
                            <Text style={styles.emptyCartText}>Seu carrinho está vazio !</Text>
                            <TouchableOpacity style={styles.entrega} onPress={() => handleTabPress('Home')}>
                                <Text style={styles.entregatext}>Conferir produtos</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.title}>Seu Carrinho</Text>
                            {cartItems.map((item) => (
                                <View key={item.id} style={styles.itemContainer}>
                                    <Image source={require('../../assets/imageicon.png')} style={styles.image} />
                                    <View style={styles.productInfo}>
                                        <Text style={styles.cartItemName}>{item.nomeProduto}</Text>
                                        <Text style={styles.cartItemPrice}>{`R$ ${(item.preco * item.quantity).toFixed(2)}`}</Text>
                                    </View>
                                    <View style={styles.buttonsContainer}>
                                        <Text style={styles.quantidade}>{item.quantity}</Text>
                                        <TouchableOpacity style={styles.logoutButton} onPress={() => handleIncreaseQuantity(item.id)}>
                                            <Image source={require('../../assets/mais.png')} style={styles.tabIcon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.logoutButton} onPress={() => handleDecreaseQuantity(item.id)}>
                                            <Image source={require('../../assets/menos1.png')} style={styles.tabIcon} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.logoutButton} onPress={() => handleRemoveItem(item.id)}>
                                        <Image source={require('../../assets/lixeira.png')} style={styles.tabIcon} />
                                    </TouchableOpacity>
                                </View>

                            ))}
                        </>
                    )}
                </ScrollView>
            </View>

            <View style={styles.final}>
                <Text style={styles.total}>Subtotal: R${getTotalPrice().toFixed(2)}</Text>
                <TouchableOpacity style={styles.entrega} onPress={() => navigation.navigate('EnderecoDeEntrega', { subtotal: getTotalPrice() })}>
                    <Text style={styles.entregatext}>Informar endereço de entrega</Text>
                    <Image source={require('../../assets/seta.png')} style={styles.tabIcon} />
                </TouchableOpacity>
            </View>

            <Footer />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    ScrollView: {
        height: '80%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: '10%',
        color: '#74b0ff'
    },
    itemContainer: {
        marginBottom: 20,
        backgroundColor: 'white',
        height: 120,
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#50dd78'
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
        margin: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    removeButton: {
        marginTop: 10,
    },
    nome: {
        color: '#74b0ff',
        fontSize: 20,
        margin: 5
    },
    valor: {
        color: '#898989',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 5
    },
    valor1: {
        color: '#50dd78',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5
    },
    tabIcon: {
        width: 22,
        height: 22
    },
    final: {
        marginLeft: '10%',
        alignItems: 'flex-end',
        marginBottom: '20%',
        height: '9%'
    },
    logoutButton: {
        margin: 2
    },
    quantidade: {
        margin: 5,
        color: '#898989'
    },
    entrega: {
        backgroundColor: '#74b0ff',
        width: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    entregatext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 10
    },
    productList: {
        flex: 1,
        width: '100%',
        marginTop: '20%'
    },
    scrollContent: {
        alignItems: 'center',
    },
    emptyCart: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: '50%',
    },
    emptyCartText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#888',
        margin: 10
    },
    imagempty: {
        width: 150,
        height: 150
    }
});

export default Carrinho;
