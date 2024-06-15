import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
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
            console.log("Pedidos recebidos:", data);
            setPedidos(data);

            // Após obter os pedidos, buscar os detalhes dos produtos para cada pedido
            for (const pedido of data) {
                await handleGetPedidoProduto(pedido.pedidoId);
            }
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível obter os dados do usuário. Por favor, tente novamente mais tarde.');
        }
    };

    const handleGetPedidoProduto = async (pedidoId) => {
        try {
            const response = await fetch(`http://10.0.2.2:5035/api/Produto/PedidoProdutoByPedido?pedidoId=${pedidoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Erro na requisição: ' + response.status + ' - ' + errorText);
            }

            const pedidoProdutos = await response.json();
            console.log(`Pedido ${pedidoId} - Produtos recebidos:`, pedidoProdutos);

            const produtosId = pedidoProdutos.map(pp => pp.produtoId);

            const produtosResponse = await fetch(`http://10.0.2.2:5035/api/Produto/ProdutobyPedidoProduto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produtosId)
            });

            if (!produtosResponse.ok) {
                const errorText = await produtosResponse.text();
                throw new Error('Erro na requisição: ' + produtosResponse.status + ' - ' + errorText);
            }

            const produtos = await produtosResponse.json();
            console.log(`Pedido ${pedidoId} - Detalhes dos produtos:`, produtos);

            const produtosDetalhados = pedidoProdutos.map(pp => ({
                ...pp,
                detalhes: produtos.find(p => p.produtoId === pp.produtoId)
            }));

            setPedidos(prevPedidos => prevPedidos.map(pedido =>
                pedido.pedidoId === pedidoId ? { ...pedido, produtos: produtosDetalhados } : pedido
            ));
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível obter os dados dos produtos. Por favor, tente novamente mais tarde.');
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

    const calcularTotalPedido = (produtos) => {
        let total = 0;
    
        produtos.forEach(produto => {
            total += (produto.detalhes.preco * produto.quantidade);
        });
    
        // Adicionando 10 ao total final
        total += 10;
    
        return total;
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {pedidos.map((pedido) => (
                    <View key={pedido.pedidoId} style={styles.pedidoContainer}>
                        <Text style={styles.nome}>Pedido ID: {pedido.pedidoId}</Text>
                        <Text>Data: {formatarData(pedido.dataPedido)}</Text>
                        <Text>Entrega em: {formatarData(pedido.previsaoEntrega)}</Text>
                        <Text>Método de Pagamento: {formatarMetodoPagamento(pedido.metodoPagamento)}</Text>
                        <View style={styles.additionalInfo}>
                            {pedido.produtos && pedido.produtos.map((produto) => (
                                <View key={produto.produtoId} style={styles.produtoContainer}>
                                    <Image
                                        style={styles.produtoImagem}
                                        source={{ uri: `data:image/png;base64,${produto.detalhes.fotoProduto}` }}
                                    />
                                    <View style={styles.produtoInfo}>
                                        <Text style={styles.produtoNome}>{produto.detalhes.nomeProduto}</Text>
                                        <Text style={styles.produtoPreco}>Preço: R$ {produto.detalhes.preco}</Text>
                                        <Text style={styles.quantidade}>Quantidade: {produto.quantidade}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <Text style={styles.totalCompra}>Total do pedido: R$ {pedido.produtos ? calcularTotalPedido(pedido.produtos) : '-'}</Text>

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
    produtoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    produtoImagem: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    produtoInfo: {
        flex: 1,
    },
    produtoNome: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    produtoPreco: {
        color: '#898989',
        fontSize: 12,
    },
});

export default HistoricoPedidos;
