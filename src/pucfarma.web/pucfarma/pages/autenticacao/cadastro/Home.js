import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Footer from '../../template/footeradm';



const HomeScreen = ({ navigation }) => {
  const [pedidos, setPedidos] = useState({
     pedidosNesseMes: 0,
     totalPedidos: 0
  });
      
  // Função para lidar com o logout
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/Pedido/Total');
        if (response.ok) {
          const data = await response.json();
          setPedidos({ totalPedidos: data });
        } else {
          console.error('Erro ao buscar dados de pedidos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  // Atenção! Essa parte faz arequisição GET na API e buscao total de pedidos /\

  return (
    <View style={styles.container}>

      <View style={styles.logo}>
        <Image source={require('../../../assets/Logo1.png')} />
      </View>
      
      <View style={styles.containerVendas}>
        <View style={styles.boxVendas}>
        <Text style={styles.tituloVendas}>Pedidos</Text>
            <Text style={styles.textoPadraoBox}>Pedidos nesse mês: {pedidos.pedidosNesseMes} </Text>
            <Text style={styles.textoPadraoBox}>Total de pedidos: {pedidos.totalPedidos} </Text>

        </View>
        <View style={styles.boxVendas}>
          <Text style={styles.tituloVendas}>Dinheiro Movimentado</Text>
          <Text style={styles.textoPadraoBox}>Obtido no mês:</Text>
          <Text style={styles.textoPadraoBox}>Total obtido:</Text>
        </View>
      </View>

      <View style={styles.ContainerScrollView}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.scrollView}>
          <View style={styles.containerPagamento}>
            <View style={styles.boxPagamento}>
              <View style={styles.imagemPagamento}>
                <View style={styles.icon}>
                  <Image source={require('../../../assets/pix.png')} />
                </View>
                <Text style={styles.pixImagem}>PIX</Text>
              </View>    
              <Text style={styles.textoPadraoBoxPagamento}>Quantidade de vendas (mês):</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Qauntidade total de vendas:</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Vendas nesse mês:</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Total de vendas:</Text>
            </View>
            <View style={styles.boxPagamento}>
              <View style={styles.imagemPagamento}>
                <View style={styles.icon}>
                  <Image source={require('../../../assets/cartao.png')} />
                </View>
                <Text style={styles.pixImagem}>Cartão de Crédito</Text>
              </View>  
              <Text style={styles.textoPadraoBoxPagamento}>Quantidade de vendas (mês):</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Qauntidade total de vendas:</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Vendas nesse mês:</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Total de vendas:</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
        <View style={styles.botaoSairConteudo}>
          <Image source={require('../../../assets/leave.png')} style={styles.buttonSair}/>
          <Text style={styles.buttonText}>Sair da Conta</Text>
        </View>
      </TouchableOpacity>
      <Footer/>
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20
    ,
  },
  logo: {
    marginBottom:20,
  
  },
  containerVendas: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    width: '100%',
    height: 140,
  },
  boxVendas: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 5,
    padding: 2,
    height: 120,
  },


  ContainerScrollView:{
    height:260
  },
  
  scrollView: {
    flex: 1,
  },

  tituloVendas: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#74B0FF',
    color: 'white',
    borderRadius: 4,
    height: '30%',
  },
  textoPadraoBox: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#FFFFFF',
    height: '30%',
  },
  containerPagamento: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    width: '100%',
  },
  boxPagamento: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 5,
    height: 260,
    width: 350,
    borderRadius: 10,
    flexDirection: 'column',
  },
  imagemPagamento: {
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#74B0FF',
    backgroundColor: '#FFFFFF',
    color: '#74B0FF',
    borderRadius: 4,
    height: '40%',
    marginBottom: 15,
  },
  textoPadraoBoxPagamento: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    marginLeft: 45,
    fontSize: 15,
    
  },

  icon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  pixImagem: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#74B0FF',
  },
  botaoSair: {
    height: 50,
    width: 300,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: 'red',
    padding: 10,
  },
  buttonSair: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  botaoSairConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default HomeScreen;
