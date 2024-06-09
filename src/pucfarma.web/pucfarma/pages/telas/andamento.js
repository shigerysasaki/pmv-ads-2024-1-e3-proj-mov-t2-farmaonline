import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Footer from '../template/footeradm';

const Andamento = () => {
  const navigation = useNavigation();

  const [botaoTexto, setBotaoTexto] = useState("Recebi meu pedido");
  const [modalVisible, setModalVisible] = useState(false);
  const [descricaoProblema, setDescricaoProblema] = useState("");

  const [pedido, setPedido] = useState({
    id: '000000',
    dataCompra: '00/00/0000',
    prevEntrega: '00/00/0000',
    metodoPagamento: 'Via App - Cartão de crédito',
    produtos: [
      { nome: 'Paracetamol', imagem: require('../../assets/paracetamol.png'), quantidade: 1, preco: 10.0 },
      { nome: 'Gel Massageador', imagem: require('../../assets/creme.png'), quantidade: 2, preco: 15.0 },
      { nome: 'Dipirona', imagem: require('../../assets/dipirona.png'), quantidade: 3, preco: 20.0 },
    ],
  });

  useEffect(() => {
    setPedido({ ...pedido, id: '123456', dataCompra: '01/01/2023', prevEntrega: '10/01/2023' });
  }, []);

  const handleButtonClick = () => {
    if (botaoTexto === "Recebi meu pedido") {
      setBotaoTexto("Pedido recebido");
    } else {
      setBotaoTexto("Recebi meu pedido");
    }
  };

  const handleRelatarProblema = () => {
    setModalVisible(true);
  };

  const handleEnviarProblema = () => {
    console.log('Descrição do problema:', descricaoProblema);
    setModalVisible(false);
    setDescricaoProblema("");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView style={styles.tabsContainer} contentContainerStyle={styles.tabsContent}>
          <View style={styles.tab}>
            {pedido.produtos.map((produto, index) => (
              <View key={index} style={styles.itemContainer}>
                <TouchableOpacity onPress={() => console.log('Imagem pressionada')} activeOpacity={1}>
                  <Image source={produto.imagem} style={styles.tabIcon} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.text1} onPress={() => console.log('Produto pressionado')}>{produto.nome}</Text>
                  <Text style={styles.text2}>Preço Individual: <Text>R$ {produto.preco.toFixed(2)}</Text></Text>
                  <Text style={styles.text2}>Valor total: <Text style={styles.money}>R$ {(produto.quantidade * produto.preco).toFixed(2)}</Text></Text>
                </View>
                <View>
                  <Text style={styles.text3}>Quantidade: <Text>{produto.quantidade}</Text></Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.infosContainer}>
            <Text style={styles.infoText}>ID do pedido: {pedido.id}</Text>
            <Text style={styles.infoText}>Data da compra: {pedido.dataCompra}</Text>
            <Text style={styles.infoText}>Previsão de entrega: {pedido.prevEntrega}</Text>
            <Text style={styles.infoText}>Método de pagamento: {pedido.metodoPagamento}</Text>
          </View>
          <View style={styles.infosContainer}>
            <Text style={styles.infoText2}>Valor total da compra: <Text style={styles.money}> R$ {pedido.produtos.reduce((acc, curr) => acc + curr.quantidade * curr.preco, 0).toFixed(2)}</Text></Text>
            <Text style={styles.infoText2}>Status do pedido: <Text style={styles.pedidoStatus}>Aguardando pagamento</Text></Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRelatarProblema}>
              <Image source={require('../../assets/atencao.png')} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Relatar problema</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={handleButtonClick}>
              <Image source={require('../../assets/check.png')} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>{botaoTexto}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Descreva o problema</Text>
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                onChangeText={setDescricaoProblema}
                value={descricaoProblema}
                placeholder="Digite a descrição do problema aqui"
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={[styles.button2, styles.modalButton]} onPress={handleEnviarProblema}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.modalButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  tabsContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  tabsContent: {
    paddingVertical: 10,
    paddingHorizontal: 20, 
  },
  tab: {
    backgroundColor: 'white',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap', 
  },
  tabIcon: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    color: '#74B0FF',
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'left',
  },
  text2: {
    fontSize: 13,
    color: '#898989',
    marginTop: 10,
    textAlign: 'left',
  },
  text3: {
    color: '#898989',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'right',
  },
  infosContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  infosContainer2: {
    marginVertical: 10,
    marginHorizontal: 20,
    paddingTop: 25,
  },
  pedidoStatus: {
    color: '#74B0FF',
  },
  money: {
    color: '#26CE55',
    fontSize: 14,
  },
  infoText2: {
    color: '#898989',
    margin: 5,
    paddingTop: 12,
    fontSize: 16,
  },
  infoText: {
    color: '#898989',
    margin: 4,
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 25,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7878',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '45%',
    justifyContent: 'center',
  },
  button2: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#26CE55',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    margin: 4,
    marginLeft: 6,
  },
  buttonIcon: {
    width: 18,
    height: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default Andamento;
