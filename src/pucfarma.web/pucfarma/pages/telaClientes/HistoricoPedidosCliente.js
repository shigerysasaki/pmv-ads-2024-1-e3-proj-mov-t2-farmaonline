import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
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

            // Após obter os pedidos,busca os produtos de cada pedido
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

            // Atualizar os pedidos com os produtos correspondentes
            setPedidos(prevPedidos => prevPedidos.map(pedido =>
                pedido.pedidoId === pedidoId ? { ...pedido, produtos: data } : pedido
            ));
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível obter os dados dos. Por favor, tente novamente mais tarde.');
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
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {pedidos.map(pedido => (
                    <View key={pedido.pedidoId} style={styles.pedidoContainer}>
                        <View style={styles.pedidoItem}>
                            <Image source={{ uri: pedido.imagem }} style={styles.avatar} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.nome}>{pedido.nome}</Text>
                                <Text style={styles.preco}>Preço individual: {pedido.preco}</Text>
                                <Text style={styles.total}>Valor total: <Text style={styles.greenText}>{pedido.total}</Text></Text>
                            </View>
                            <Text style={styles.quantidade}>Quantidade: {pedido.quantidade}</Text>
                        </View>

                        <View style={styles.additionalInfo}>
                            <Text style={{ color: '#898989' }}>Id do pedido: {pedido.pedidoId}</Text>
                            <Text style={{ color: '#898989' }}>Data da compra: {formatarData(pedido.dataPedido)}</Text>
                            <Text style={{ color: '#898989' }}>Previsão de entrega: {formatarData(pedido.previsaoEntrega)}</Text>
                            <Text style={{ color: '#898989' }}>Método de pagamento: {formatarMetodoPagamento(pedido.metodoPagamento)}</Text>
                        </View>

                        <View>
                            <Text style={styles.totalCompra}>
                                Valor total da compra: <Text style={styles.greenText}></Text>
                            </Text>
                            <Text style={{ color: '#898989', textAlign: 'center', fontSize: 16, marginTop: 20, marginBottom: 20 }}>
                                Pedido entregue em: <Text style={{ color: '#0061E1' }}>{formatarData(pedido.previsaoEntrega)}</Text>
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Footer style={styles.footer} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pedidoContainer: {
        width: '90%',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 20,
    },
    pedidoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
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
    total: {
        color: '#898989',
        fontSize: 12,
    },
    quantidade: {
        fontSize: 12,
        color: '#898989',
        marginRight: 25,
    },
    additionalInfo: {
        marginTop: 20,
    },
    greenText: {
        color: '#26CE55',
    },
    totalCompra: {
        color: '#898989',
        marginTop: 20,
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },
});

export default HistoricoPedidos;
