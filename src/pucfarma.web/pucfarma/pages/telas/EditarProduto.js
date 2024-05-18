import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput, Alert, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Footer from '../template/footeradm';

export default function UploadScreen() {
    const [avatar, setAvatar] = useState(null);
    const [base64Image, setBase64Image] = useState("");
    const [productName, setProductName] = useState("");
    const [fabricante, setFabricante] = useState("");
    const [quantidadeEstoque, setQuantidadeEstoque] = useState("");
    const [precoNormal, setPrecoNormal] = useState("");
    const [tipoOferta, setTipoOferta] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState(0);

    const navigation = useNavigation();

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
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
            setBase64Image(base64);
        }
    }

    function handleClearAll() {
        setAvatar(null);
        setProductName("");
        setFabricante("");
        setQuantidadeEstoque("");
        setPrecoNormal("");
        setTipoOferta("");
        setDescricao("");
        setCategoria(0);
    }

    const handleSaveChanges = async () => {
        try {
            const response = await fetch("http://10.0.2.2:5035/api/Produto", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fabricante: fabricante,
                    nomeProduto: productName,
                    nomeFarmacia: "string",
                    preco: precoNormal,
                    descricao: descricao,
                    estoqueDisponivel: quantidadeEstoque,
                    categoria: categoria,
                    porcentagemDesconto: tipoOferta,
                    fotoProduto: base64Image
                })
            });

            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }

            const data = await response.json();
            Alert.alert('Produto Cadastrado', 'O produto foi cadastrado com sucesso!');
            navigation.replace('Produtos');
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar o produto. Por favor, tente novamente mais tarde.');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.whiteBackground}>
                <View style={styles.contentContainer}>
                    <View style={styles.leftColumn}>
                        {avatar ? (
                            <Image source={{ uri: avatar }} style={styles.avatar} />
                        ) : (
                            <View style={styles.placeholder} />
                        )}
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Nome do Produto</Text>
                        </View>
                        <TextInput
                            style={styles.productNameInput}
                            onChangeText={text => setProductName(text)}
                            value={productName}
                        />
                        <TouchableOpacity style={styles.uploadButton} onPress={imagePickerCall}>
                            <Text style={styles.buttonText}>Adicionar Imagem</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={[styles.inputContainer, { width: '60%' }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Fabricante</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setFabricante(text)}
                            value={fabricante}
                        />
                    </View>
                    <View style={[styles.inputContainer, { width: '20%', marginLeft: 5 }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Quant. em estoque</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setQuantidadeEstoque(text)}
                            value={quantidadeEstoque}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={[styles.inputContainer, { width: '40%', marginLeft: 10 }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Preço normal</Text>
                        </View>
                        <TextInput
                            style={styles.smallInput}
                            onChangeText={text => setPrecoNormal(text)}
                            value={precoNormal}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.inputContainer, { width: '40%', marginLeft: -30 }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Tipo de oferta</Text>
                        </View>
                        <TextInput
                            style={styles.smallInput}
                            onChangeText={text => setTipoOferta(text)}
                            value={tipoOferta}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.inputContainer]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Categoria</Text>
                        </View>
                        <Picker
                            selectedValue={categoria}
                            style={styles.categoryInput}
                            onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
                        >
                            <Picker.Item label="Medicamentos" value={0} />
                            <Picker.Item label="Beleza" value={1} />
                            <Picker.Item label="Maternidade" value={2} />
                            <Picker.Item label="Suplementos" value={3} />
                            <Picker.Item label="Higiene" value={4} />
                            <Picker.Item label="Produtos Infantis" value={5} />
                            <Picker.Item label="Dermocosméticos" value={6} />
                        </Picker>
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={[styles.inputContainer, { width: '40%', }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Descrição</Text>
                        </View>
                        <TextInput
                            style={[styles.input, { textAlignVertical: 'top', height: 150 }]}
                            onChangeText={text => setDescricao(text)}
                            value={descricao}
                            multiline={true}
                            numberOfLines={10}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FF7878',
                        flexDirection: 'row',
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                        alignSelf: 'flex-start',
                    }}
                    onPress={() => navigation.navigate('Produtos')}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Ionicons name="checkmark" size={24} color="white" style={styles.buttonIcon} />
                    <Text style={styles.saveButtonText}>Salvar alterações</Text>
                </TouchableOpacity>
            </View>
            <Footer></Footer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    whiteBackground: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '98%',
        marginBottom: 10
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    leftColumn: {
        marginRight: 20
    },
    rightColumn: {
        flex: 1
    },
    titleContainer: {
        marginBottom: 10,
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 14,
        alignSelf: "flex-start",
        marginBottom: -8
        
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 5,
    },
    placeholder: {
        width: 100,
        height: 100,
        backgroundColor: "#ccc",
    },
    productNameInput: {
        width: '100%', // Largura total
        height: 35,
        borderColor: "#000000",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: 'rgba(137, 137, 137, 0.1)',
    },
    uploadButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#74B0FF", // Azul
        width: 135,
        height: 35,
        borderRadius: 5,
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center"
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        width: '100%',
        height: 35,
        borderColor: "#000000",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: 'rgba(137, 137, 137, 0.1)'
    },
    smallInput: {
        width: '70%',
        height: 35,
        borderColor: "#000000",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: 'rgba(137, 137, 137, 0.1)'
    },
    categoryInput: {
        width: 150,
        marginLeft: -20,
        height: 50,
        borderColor: "#000000",
        borderRadius: 5,
        backgroundColor: 'rgba(137, 137, 137, 0.1)',
    },
    clearButton: {
        backgroundColor: '#FF7878',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    saveButton: {
        backgroundColor: '#26CE55',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 1,
    },
    buttonIcon: {
        marginRight: 10,
        width: 18,
        marginTop: -3
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%', // Largura do modal
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#e6f2ff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#007bff',
    },
    closeButton: {
        alignItems: 'center',
    },
});
