import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Modal, Pressable, Keyboard, Image, Alert, } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Footer from '../template/footer';
import Header from '../template/header';

export default function PerfilClienteScreen() {
    const [selectedState, setSelectedState] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState(null);
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [precoEntrega, setPrecoEntrega] = useState(0);
    const route = useRoute();
    const subtotal = route.params?.subtotal || 0; // Valor do subtotal vindo dos parâmetros da rota

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardIsVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardIsVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        handleGetUsuario();
    }, []);

    useEffect(() => {
        if (cep) {
            const preco = atualizarPrecoEntrega(cep);
            setPrecoEntrega(preco);
        }
    }, [cep]);

    const handleGetUsuario = async () => {
        try {
            const response = await fetch("http://10.0.2.2:5035/api/Autenticacao/UsuarioLogado", {
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
            console.log('Resposta completa:', responseText);
    
            if (!responseText) {
                throw new Error('Resposta vazia do servidor.');
            }
    
            let data;
            try {
                data = JSON.parse(responseText);
                console.log('Dados parseados:', data);
            } catch (jsonError) {
                console.error('Erro ao parsear JSON:', jsonError.message);
                throw new Error('Erro ao parsear JSON: ' + jsonError.message);
            }
    
            setUsuario(data);
            setCep(data.cep);
            setCidade(data.cidade);
            setSelectedState(data.estado);
            setRua(data.rua);
            setBairro(data.bairro);
            setNumero(data.numero);
            setComplemento(data.complemento);
    
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível obter os dados do usuário. Por favor, tente novamente mais tarde.');
        }
    };
    
    

    const atualizarPrecoEntrega = (cep) => {
        const precoEntrega = calcularPrecoEntrega(cep);
        return precoEntrega;
    };

    const calcularPrecoEntrega = (cep) => {
        return 10; // Preço fixo de entrega de R$10
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const saveInformation = async () => {
        try {
            const updatedUsuario = {
                usuarioId: usuario.usuarioId,
                senha: usuario.senha,
                nomeCompleto: usuario.nomeCompleto,
                email: usuario.email,
                telefone: usuario.telefone,
                cep: cep,
                estado: selectedState,
                cidade: cidade,
                bairro: bairro,
                rua: rua,
                numero: numero,
                complemento: complemento,                
                tipoUsuario: usuario.tipoUsuario
            };
    
            console.log("Updated Usuario:", JSON.stringify(updatedUsuario, null, 2)); 
    
            const response = await fetch("http://10.0.2.2:5035/api/Cadastro/" + usuario.usuarioId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUsuario)
            });
  
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Erro na requisição: ' + response.status + ' - ' + errorText);
            }
             
            Alert.alert('Dados atualizados', 'O Endereço foi atualizado com sucesso!');
            navigation.navigate('Selecionarpagamento')
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o cadastro. Por favor, tente novamente mais tarde.');
        }
        
  
    };
    

    const estados = [
        'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
    ];

    const total = subtotal + precoEntrega;

    return (


        <View style={styles.container}>
            <Header style={styles.header} />

            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.topo}>
                        <Text style={styles.addresstopoText}>Endereço de entrega</Text>
                    </View>


                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CEP</Text>
                        <TextInput
                            style={[styles.input, { maxWidth: 200 }]}
                            keyboardType="numeric"
                            value={cep}
                            onChangeText={text => setCep(text)}
                        />
                        <View style={styles.addressContainer}>
                            <View style={styles.addressInput}>
                                <Text style={styles.label}>Cidade</Text>
                                <TextInput
                                    style={[styles.input, { maxWidth: 200 }]}
                                    value={cidade}
                                    onChangeText={text => setCidade(text)}
                                />
                            </View>
                            <View style={styles.addressInput}>
                                <Text style={styles.label}>Estado</Text>
                                <TouchableOpacity onPress={openModal}>
                                    <Text style={[styles.input, styles.selectedStateText]}>{selectedState || 'Selecione'}</Text>
                                </TouchableOpacity>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={closeModal}
                                >
                                    <View style={styles.modalContainer}>
                                        <View style={styles.modalContent}>
                                            <ScrollView>
                                                {estados.map((estado) => (
                                                    <Pressable
                                                        key={estado}
                                                        style={[styles.stateOption, selectedState === estado && styles.selectedStateOption]}
                                                        onPress={() => {
                                                            setSelectedState(estado);
                                                            closeModal();
                                                        }}
                                                    >
                                                        <Text style={styles.stateText}>{estado}</Text>
                                                    </Pressable>
                                                ))}
                                            </ScrollView>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </View>
                        <View style={styles.addressContainer}>
                            <View style={styles.addressInput}>
                                <Text style={styles.label}>Rua</Text>
                                <TextInput
                                    style={styles.input}
                                    value={rua}
                                    onChangeText={text => setRua(text)}
                                />
                            </View>
                            <View style={styles.addressInput}>
                                <Text style={styles.label}>Bairro</Text>
                                <TextInput
                                    style={styles.input}
                                    value={bairro}
                                    onChangeText={text => setBairro(text)}
                                />
                            </View>
                        </View>
                        <View style={styles.addressContainer}>
                            <View style={styles.addressInput}>
                                <Text style={styles.label}>Número</Text>
                                <TextInput
                                    style={[styles.input, { flex: 0.2 }]}
                                    keyboardType="numeric"
                                    value={numero}
                                    onChangeText={text => setNumero(text)}
                                />
                            </View>
                            <View style={styles.addressInput}>
                                <Text style={styles.label}>Complemento</Text>
                                <TextInput
                                    style={[styles.input, { flex: 0.8 }]}
                                    value={complemento}
                                    onChangeText={text => setComplemento(text)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.deliveryFeeContainer}>
                        <Text style={styles.deliveryFeeText}>A taxa de entrega para este endereço é:</Text>
                        <Text style={styles.deliveryFeeAmount}>R${precoEntrega.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryText}>Subtotal: R${subtotal.toFixed(2)}</Text>
                        <Text style={styles.summaryText}>Taxa de Entrega: R${precoEntrega.toFixed(2)}</Text>
                        <Text style={styles.summaryTextTotal}>Total: R${total.toFixed(2)}</Text>
                    </View>

                    {!keyboardIsVisible && (
                        <TouchableOpacity style={styles.selecionarPagamento} onPress={saveInformation}>
                            <Text style={styles.pagamentoText}>Selecionar forma de pagamento</Text>
                            <Image source={require('../../assets/iconSeta.png')} style={styles.tabIcon} />
                        </TouchableOpacity>
                    )}
                </ScrollView>
                {!keyboardIsVisible && <Footer />}
            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    content: {
        flex: 1,
        marginTop: 100, // Para dar espaço ao header fixo
    },
    topo: {
        width: '100%',
        backgroundColor: '#F4F4F4',
        padding: 10,
    },

    scrollViewContent: {
        flexGrow: 1,
        padding: 10,
    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 10,
    },

    addresstopoText: {
        color: '#74B0FF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: -28,
        marginBottom: 10
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#EEEEEE',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#898989',
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addressInput: {
        flex: 1,
        marginRight: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        maxHeight: 300,
        width: '60%',
    },
    stateOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 5,
    },
    selectedStateOption: {
        backgroundColor: '#74B0FF',
    },
    stateText: {
        fontSize: 16,
    },
    selectedStateText: {
        marginBottom: 10,
        textAlignVertical: 'center',
    },
    deliveryFeeContainer: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryFeeText: {
        fontSize: 16,
        color: '#898989',
    },
    deliveryFeeAmount: {
        fontSize: 16,
        color: '#74B0FF',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    summaryContainer: {
        marginTop: 20,

        padding: 20,
        alignItems: 'flex-end', 
    },

    summaryText: {
        fontSize: 14,
        color: '#898989',
        marginBottom: 5,
    },

    summaryTextTotal: {
        fontSize: 18,
        color: '#26CE55',
        fontWeight: 'bold', 
    },



    selecionarPagamento: {
        backgroundColor: '#74B0FF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        width: 300,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        alignSelf: 'flex-end', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        position: 'relative', 
    },
    pagamentoText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left', 
    },
    tabIcon: {
        width: 40,
        height: 40,
        position: 'absolute', 
        right: 1, 
        alignSelf: 'center', 
    },
});
