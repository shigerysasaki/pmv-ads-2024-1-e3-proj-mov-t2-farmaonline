import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Footer from '../template/footeradm';

const Andamento = () => {
  
  const navigation = useNavigation();

  const [botaoTexto, setBotaoTexto] = useState("Recebi meu pedido");
  const [botaoTextoAnterior, setBotaoTextoAnterior] = useState("");


  const [pedido, setPedido] = useState({
    id: '000000',
    dataCompra: '00/00/0000',
    prevEntrega: '00/00/0000',
    metodoPagamento: 'Via App - Cartão de crédito',
    produtos: [
      { nome: 'Produto_001', imagem: require('../../assets/quadrado.png'), quantidade: 1, preco: 10.0 },
      { nome: 'Produto_002', imagem: require('../../assets/quadrado.png'), quantidade: 2, preco: 15.0 },
      { nome: 'Produto_003', imagem: require('../../assets/quadrado.png'), quantidade: 3, preco: 20.0 },
    ],
  });

  // Simulação de busca de dados do pedido ao montar o componente
  useEffect(() => {
    // Aqui você poderia chamar uma API ou banco de dados para buscar os dados do pedido
    // Exemplo de atualização do estado com os dados recebidos:
    // setPedido({ ...pedido, id: '123456', dataCompra: '01/01/2023', prevEntrega: '10/01/2023' });
  }, []);

  return (
    <View style={styles.container}>

      <View style={{ marginTop: 10 }} />
      <ScrollView style={styles.tabsContainer}>
        <View style={styles.tab}>
          {pedido.produtos.map((produto, index) => (
            <TouchableOpacity key={index} style={styles.itemContainer}>
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
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginBottom: 10 }} />
    

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
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home');}}>
          <Image source={require('../../assets/atencao.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Relatar problema</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
           if (botaoTexto === "Recebi meu pedido") {
              setBotaoTextoAnterior(botaoTexto);
              setBotaoTexto("Pedido recebido");
           } else {
             setBotaoTexto(botaoTextoAnterior);
           }
         }}>
  <Image source={require('../../assets/check.png')} style={styles.buttonIcon} />
  <Text style={styles.buttonText}>{botaoTexto}</Text>
</TouchableOpacity>



      </View> 

      </ScrollView>
      
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  tabsContainer: {
    backgroundColor: 'white',
    height: '65%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tab: {
    backgroundColor: 'white',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    marginLeft: 80, 
    marginTop: 50,
    textAlign: 'right', 
  },
  infosContainer: {
    marginVertical: 10,
    marginLeft: 20,
  },
  infosContainer2: {
    marginVertical: 10,
    marginLeft: 20,
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
    width: 150,
    justifyContent: 'center',
  },
  button2: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#26CE55',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,  
    width: 150,
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
});

export default Andamento;
