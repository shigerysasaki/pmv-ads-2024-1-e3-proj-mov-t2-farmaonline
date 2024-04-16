import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInputMask } from 'react-native-masked-text';
import { Ionicons } from '@expo/vector-icons';


export default function UploadScreen() {
    const [avatar, setAvatar] = useState(null);
    const [productName, setProductName] = useState("");
    const [fabricante, setFabricante] = useState("");
    const [quantidadeEstoque, setQuantidadeEstoque] = useState("");
    const [precoNormal, setPrecoNormal] = useState("");
    const [tipoOferta, setTipoOferta] = useState("");
    const [descricao, setDescricao] = useState("");

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

    function handleClearAll() {
        setAvatar(null);
        setProductName("");
        setFabricante("");
        setQuantidadeEstoque("");
        setPrecoNormal("");
        setTipoOferta("");
        setDescricao("");
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
                    <View style={[styles.inputContainer, { width: '70%' }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Fabricante</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setFabricante(text)}
                            value={fabricante}
                        />
                    </View>
                    <View style={[styles.inputContainer, { marginLeft: 5 }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Quant. em estoque</Text>
                        </View>
                        <TextInput
                            style={[styles.input, { marginLeft: 5 }]}
                            onChangeText={text => setQuantidadeEstoque(text)}
                            value={quantidadeEstoque}
                            keyboardType="numeric" // Define o teclado como numérico
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={[styles.inputContainer, { width: '70%' }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Preço normal</Text>
                        </View>
                        <TextInputMask
                            style={styles.input}
                            type={'money'}
                            options={{
                                precision: 2, // Número de casas decimais
                                separator: ',', // Separador decimal
                                delimiter: '.', // Separador de milhares
                                unit: 'R$', // Símbolo da moeda
                                suffixUnit: '' // Sufixo do símbolo da moeda (opcional)
                            }}
                            onChangeText={text => setPrecoNormal(text)}
                            value={precoNormal}
                            keyboardType="numeric" // Define o teclado como numérico
                        />
                    </View>

                    <View style={[styles.inputContainer, { marginLeft: 5 }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Tipo de oferta</Text>
                        </View>
                        <TextInput
                            style={[styles.input, { marginLeft: 5 }]}
                            onChangeText={text => setTipoOferta(text)}
                            value={tipoOferta}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={[styles.inputContainer, { width: '100%' }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Descrição</Text>
                        </View>
                        <TextInput
                            style={[styles.input, { textAlignVertical: 'top', height: 150 }]} // Ajuste da altura para 150
                            onChangeText={text => setDescricao(text)}
                            value={descricao}
                            multiline={true}
                            numberOfLines={10}
                        />

                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
                <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginVertical: 10
    },
    whiteBackground: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '95%',
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
        alignItems: 'flex-end' // Alinha o título à direita
    },
    title: {
        fontSize: 14, // Reduzindo o tamanho da fonte para 14
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
        backgroundColor: 'rgba(137, 137, 137, 0.1)', // Cor de fundo da caixa de entrada de texto
    },
    uploadButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007bff", // Azul
        width: 135,
        height: 35,
        borderRadius: 5,
    },
    buttonText: {
        color: "#ffffff", // Branco
        fontWeight: "bold",
        textAlign: "center"
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainer: {
        flex: 1
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
    clearButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 15,
        alignSelf: 'flex-start', // Alinhamento à esquerda
    }
    
    
});
