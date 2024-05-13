import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput, ScrollView, Modal, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone de avatar
import Footer from '../template/footer';

export default function PerfilClienteScreen() {
    const [avatar, setAvatar] = useState(null);
    const [selectedState, setSelectedState] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const estados = [
        'Acre',
        'Alagoas',
        'Amapá',
        'Amazonas',
        'Bahia',
        'Ceará',
        'Distrito Federal',
        'Espírito Santo',
        'Goiás',
        'Maranhão',
        'Mato Grosso',
        'Mato Grosso do Sul',
        'Minas Gerais',
        'Pará',
        'Paraíba',
        'Paraná',
        'Pernambuco',
        'Piauí',
        'Rio de Janeiro',
        'Rio Grande do Norte',
        'Rio Grande do Sul',
        'Rondônia',
        'Roraima',
        'Santa Catarina',
        'São Paulo',
        'Sergipe',
        'Tocantins'
    ];

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Nós precisamos dessa permissão.');
            }
        })();
    }, []);

    async function imagePickerCall() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(result.assets[0].uri);
        }
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const saveInformation = () => {
        // Adicione sua lógica para salvar as informações aqui
        // Por exemplo, enviar para um servidor, salvar no AsyncStorage, etc.
        alert('Informações salvas com sucesso!');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                    <View style={styles.whiteBackground}>
                        <TouchableOpacity onPress={imagePickerCall}>
                            <View style={styles.imagePicker}>
                                {avatar ? (
                                    <Image source={{ uri: avatar }} style={styles.avatar} />
                                ) : (
                                    <Ionicons name="person" size={80} color="#fff" />
                                )}
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.fullNameText}>Nome completo</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome Completo</Text>
                        <TextInput
                            style={styles.input}
                        />
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                        />
                        <Text style={styles.label}>Celular</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric" // Definindo o teclado como numérico
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CEP</Text>
                        <TextInput
                            style={[styles.input, { maxWidth: 200 }]} // Defina o tamanho máximo desejado
                            keyboardType="numeric" // Definindo o teclado como numérico
                        />
                        <View style={styles.addressContainer}>
                            <View style={styles.addressInput}>
                                <Text style={styles.label}>Cidade</Text>
                                <TextInput
                                    style={[styles.input, { maxWidth: 200 }]}
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
                        <Text style={styles.label}>Rua</Text>
                        <TextInput
                            style={styles.input}
                        />
                        <View style={styles.addressContainer}>
                            <View style={styles.addressInput}>
                                <Text style={styles.label}>Número</Text>
                                <TextInput
                                    style={[styles.input, { flex: 0.2 }]} // Ocupa 20% da largura
                                    keyboardType="numeric" // Definindo o teclado como numérico
                                />
                            </View>
                            <View style={styles.addressInput}>
                                <Text style={styles.label}>Complemento</Text>
                                <TextInput
                                    style={[styles.input, { flex: 0.8 }]} // Ocupa 80% da largura
                                />
                            </View>
                        </View>
                    </View>

                    {/* Botão de salvar */}
                    <TouchableOpacity onPress={saveInformation} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 60, // Altura do Footer
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 5,
        backgroundColor: '#EEEEEE',
    },
    whiteBackground: {
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 10,
        width: '95%',
        marginBottom: 10
    },
    imagePicker: {
        width: 100,
        height: 100,
        backgroundColor: '#74B0FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 75, // Torna a imagem circular
        alignSelf: 'center', // Centraliza horizontalmente
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 75, // Torna a imagem circular
    },
    fullNameText: {
        fontSize: 18,
        color: '#74B0FF',
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginTop: 10, // Adicionando margem ao topo
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#74B0FF',
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
        width:150,
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
