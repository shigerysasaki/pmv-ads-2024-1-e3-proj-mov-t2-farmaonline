import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Modal, Pressable, Keyboard, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Footer from '../template/footer';

export default function PerfilClienteScreen() {
    const [selectedState, setSelectedState] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState(null);
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');

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

    const handleGetUsuario = async () => {
        try {
            const response = await fetch("http://10.0.2.2:5035/api/Cadastro/4", {
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

            // Converte a resposta para JSON
            const data = JSON.parse(responseText);
            setUsuario(data);
            setNomeCompleto(data.nomeCompleto);
            setEmail(data.email);
            setTelefone(data.telefone);
            if (data.enderecoEntrega) {
                setCep(data.enderecoEntrega.cep);
                setCidade(data.enderecoEntrega.cidade);
                setSelectedState(data.enderecoEntrega.estado);
                setRua(data.enderecoEntrega.rua);
                setBairro(data.enderecoEntrega.bairro);                
                setNumero(data.enderecoEntrega.numero);
                setComplemento(data.enderecoEntrega.complemento);
            }
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível obter os dados do usuário. Por favor, tente novamente mais tarde.');
        }
    };

    const estados = [
        'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
    ];

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
                nomeCompleto,
                email,
                telefone,
                senha: usuario.senha,
                enderecoEntrega: {
                    cep,
                    estado: selectedState,
                    cidade,
                    bairro,
                    rua,
                    numero,
                    complemento
                },
                tipoUsuario: usuario.tipoUsuario,
                usuarioPedido: null,
                usuarioAvaliacao: null
            };

            console.log(updatedUsuario)
            const response = await fetch("http://10.0.2.2:5035/api/Cadastro/4", {
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

            const data = await response.json();
            Alert.alert('Dados atualizados', 'O cadastro foi atualizado com sucesso!');
            navigation.replace('Produtos');
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o cadastro. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>               
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
                {!keyboardIsVisible && (
                    <TouchableOpacity onPress={saveInformation} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
            {!keyboardIsVisible && <Footer />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    saveButton: {
        backgroundColor: '#74B0FF',
        paddingVertical: 10,
        borderRadius: 5,
        width: 150,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        alignSelf: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
