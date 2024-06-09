import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Footer from '../template/footer';
import Header2 from '../template/header2';

const InformacoesLoja = () => {
    const [farmacias, setFarmacias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFarmacias = async () => {
            try {
                const response = await fetch('http://10.0.2.2:5035/api/Farmacia/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFarmacias(data);
            } catch (error) {
                console.error('Erro ao buscar dados da farmácia:', error);
                setError(error.toString());
                Alert.alert('Erro', error.toString());
            }
        };

        fetchFarmacias();
    }, []);

    return (
        <View style={styles.container}>
            <Header2 />
            {error ? (
                <Text>Erro: {error}</Text>
            ) : (
                farmacias.map(farmacia => (
                    <View key={farmacia.nomeFarmacia} style={styles.info}>
                        <Text style={styles.title}>Horário Funcionamento</Text>
                        <Text style={styles.desc}>{farmacia.horarioFuncionamento}  </Text>
                        <Text style={styles.title}>Localização</Text>
                        <Text style={styles.desc}>{farmacia.enderecoFarmacia?.rua} , {farmacia.enderecoFarmacia?.numero}  </Text>
                        <Text style={styles.desc}>Bairro {farmacia.enderecoFarmacia?.bairro}  </Text>
                        <Text style={styles.desc}>{farmacia.enderecoFarmacia?.cidade} / {farmacia.enderecoFarmacia?.estado}</Text>

                        <Text style={styles.title}>Contato</Text>
                        <Text style={styles.desc}>Telefone: {farmacia.telefone}</Text>
                    </View>
                ))
            )}
            <Footer />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE',
        flex: 1,
        alignItems: 'center'
    },
    info: {
        width: '95%',
        height: 350,
        marginTop: 130,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 242
    },
    title: {
        color: '#898989',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 50
    },
    desc: {
        color: '#898989',
        fontSize: 15,
        margin: 5,
        marginLeft: 50
    },
    pic: {
        width: 200,
        height: 100,
        margin: 40,
        borderRadius: 5
    }
});

export default InformacoesLoja;