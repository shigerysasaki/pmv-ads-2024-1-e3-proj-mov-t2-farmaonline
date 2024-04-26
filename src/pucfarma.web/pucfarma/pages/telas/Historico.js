import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Footer from '../template/footeradm';

export default function Historico() {
    const navigation = useNavigation();
    const [historicoPedidos, setHistoricoPedidos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Simulação de dados de histórico de pedidos
    useEffect(() => {
        // Aqui você faria uma chamada à sua API para buscar os dados do histórico de pedidos
        // Por enquanto, estou simulando dados fictícios
        const dadosFicticios = [
            { id: 1, numeroPedido: "123", data: "2024-04-23", status: "Entregue" },
            { id: 2, numeroPedido: "124", data: "2024-04-22", status: "Em andamento" },
            { id: 3, numeroPedido: "125", data: "2024-04-21", status: "Entregue" }
        ];
        setHistoricoPedidos(dadosFicticios);
    }, []);

    const filteredPedidos = historicoPedidos.filter(pedido =>
        pedido.numeroPedido.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar pedido..."
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
            />
            <FlatList
                data={filteredPedidos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.numeroPedido}>Pedido #{item.numeroPedido}</Text>
                        <Text style={styles.data}>Data: {item.data}</Text>
                        <Text style={styles.status}>Status: {item.status}</Text>
                    </View>
                )}
            />
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    itemContainer: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5
    },
    numeroPedido: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    data: {
        fontSize: 14,
        marginBottom: 5
    },
    status: {
        fontSize: 14,
    }
});
