import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import Footer from '../template/footer';

const HistoricoPedidos = () => {

    const [pedidos, setPedidos] = useState([]);
    const pedidosMock = [
        {
            id: 1,
            nome: 'Produto 1',
            preco: 'R$ 50,00',
            quantidade: 2,
            total: 'R$ 100,00',
            imagem: 'https://via.placeholder.com/150',
            dataCompra: '01/06/2024',
            previsaoEntrega: '10/06/2024',
            dataEntrega: '10/06/2024',
            metodoPagamento: 'Cartão de crédito'
        },
        {
            id: 2,
            nome: 'Produto 2',
            preco: 'R$ 30,00',
            quantidade: 3,
            total: 'R$ 90,00',
            imagem: 'https://via.placeholder.com/150',
            dataCompra: '02/06/2024',
            previsaoEntrega: '11/06/2024',
            dataEntrega: '11/06/2024',
            metodoPagamento: 'Cartão de crédito'
        },
        {
            id: 3,
            nome: 'Produto 3',
            preco: 'R$ 30,00',
            quantidade: 1,
            total: 'R$ 30,00',
            imagem: 'https://via.placeholder.com/150',
            dataCompra: '03/06/2024',
            previsaoEntrega: '12/06/2024',
            dataEntrega: '12/06/2024',
            metodoPagamento: 'Cartão de crédito'
        },
    ];

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

            const responseText = await response.text();

            if (!responseText) {
                throw new Error('Resposta vazia do servidor.');
            }

            const data = JSON.parse(responseText);
            console.log(data);
            setPedidos(data);
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
                {pedidos.map(produto => (
                    <View key={produto.produtoId} style={styles.pedidoItem}>
                        <Image source={{ uri: produto.fotoProduto }} style={styles.avatar} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.nome}>{produto.nomeProduto}</Text>
                            <Text style={styles.preco}>Preço individual: {produto.preco}</Text>
                            <Text style={styles.total}>Valor total: <Text style={styles.greenText}>{produto.total}</Text></Text>
                        </View>
                        <Text style={styles.quantidade}>Quantidade: {produto.quantidade}</Text>
                    </View>
                ))}

                {pedidos.map(pedido => (
                    <><View style={styles.additionalInfo}>
                        <Text style={{ color: '#898989' }}>Id do pedido: {pedido.pedidoId}</Text>
                        <Text style={{ color: '#898989' }}>Data da compra: {formatarData(pedido.dataPedido)}</Text>
                        <Text style={{ color: '#898989' }}>Previsão de entrega: {formatarData(pedido.previsaoEntrega)}</Text>
                        <Text style={{ color: '#898989' }}>Método de pagamento: {formatarMetodoPagamento(pedido.metodoPagamento)}</Text>
                    </View><View>
                            <Text style={styles.totalCompra}>
                                Valor total da compra: <Text style={styles.greenText}></Text>
                            </Text>

                            <Text style={{ color: '#898989', textAlign: 'center', fontSize: 16, marginTop: 20, marginBottom: 20 }}>
                                Pedido entregue em: <Text style={{ color: '#0061E1' }}>{formatarData(pedido.previsaoEntrega)}</Text>
                            </Text>
                        </View></>
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
        marginRight: 15,
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


});

export default HistoricoPedidos;
