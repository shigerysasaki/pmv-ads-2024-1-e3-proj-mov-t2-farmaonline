import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Footer from '../template/footer';

const HistoricoPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        handleGetPedidosUsuario();
    }, []);

    const handleGetPedidosUsuario = async () => {
        try {
            const response = await fetch("http://10.0.2.2:5035/api/Pedido/PedidosUsuarioLogado", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Erro na requisição: ' + response.status + ' - ' + errorText);
            }

            const data = await response.json();
            console.log(data);
            setPedidos(data);
            data.forEach(pedido => {
                handleGetPedidoProduto(pedido.pedidoId);
            });
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível obter os dados do usuário. Por favor, tente novamente mais tarde.');
        }
    };

    const handleGetPedidoProduto = async (pedidoId) => {
        try {
            const response = await fetch(`http://10.0.2.2:5035/api/PedidoProduto/${pedidoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Erro na requisição: ' + response.status + ' - ' + errorText);
            }

            const data = await response.json();
            console.log(data);
            setPedidos(prevPedidos => prevPedidos.map(pedido => 
                pedido.pedidoId === pedidoId ? { ...pedido, produtos: data } : pedido
            ));
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível obter os dados do usuário. Por favor, tente novamente mais tarde.');
        }
    };

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); 
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const formatarMetodoPagamento = (metodo) => {
        switch (metodo) {
            case 0:
                return "Pix";
            case 1:
                return "Dinheiro";
            case 2:
                return "Boleto bancário";
            case 3:
                return "Cartão de Crédito (via app)";
            case 4:
                return "Cartão de Crédito (na entrega)";
            default:
                return "";
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.pedidoContainer}>
                {pedidos.map(pedido => (
                    <View key={pedido.pedidoId} style={styles.pedidoItem}>
                        <Text style={{ color: '#898989' }}>Id do pedido: {pedido.pedidoId}</Text>
                        <Text style={{ color: '#898989' }}>Data da compra: {formatarData(pedido.dataPedido)}</Text>
                        <Text style={{ color: '#898989' }}>Previsão de entrega: {formatarData(pedido.previsaoEntrega)}</Text>
                        <Text style={{ color: '#898989' }}>Método de pagamento: {formatarMetodoPagamento(pedido.metodoPagamento)}</Text>
                        {pedido.produtos && pedido.produtos.map(produto => (
                            <View key={produto.pedidoProdutoId} style={styles.produtoItem}>
                                <Image source={{ uri: produto.produto.fotoProduto }} style={styles.avatar} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.nome}>{produto.produto.nomeProduto}</Text>
                                    <Text style={styles.preco}>Preço individual: {produto.produto.preco}</Text>
                                    <Text style={styles.quantidade}>Quantidade: {produto.quantidade}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    pedidoContainer: {
        width: '90%',
        backgroundColor: '#ffffff',
        marginBottom: 100, // separa o container do footer
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    pedidoItem: {
        marginBottom: 15,
    },
    produtoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderWidth: 1,
    },
    infoContainer: {
        flex: 1,
    },
    nome: {
        color: '#74B0FF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    preco: {
        color: '#898989',
        fontSize: 12,
    },
    quantidade: {
        fontSize: 12,
        color: '#898989',
        marginRight: 15,
    },
});

export default HistoricoPedidos;
