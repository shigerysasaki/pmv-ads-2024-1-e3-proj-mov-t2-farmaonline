import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Footer from '../../template/footeradm';

const HomeScreen = ({ navigation }) => {
  const [pedidos, setPedidos] = useState({
    pedidosNesseMes: 0, 
    obitidosNoMes: 0, 
    totalObtido: 0, 
    totalPedidos: 0,

    totalPedidosPix: 0,
    totalPedidosCartaoApp: 0,
    totalPedidosCartaoEntrega: 0,
    totalPedidosBoletoBancario: 0,
    totalPedidosDinheiro: 0,

    valorTotal: 0,
    valorTotalPix: 0,
    valorTotalCartaoApp: 0,
    valorTotalCartaoEntrega: 0,
    valorTotalBoletoBancario: 0,
    valorTotalDinheiro: 0,
    valorMesPix: 0,
    valorMesCartaoApp: 0,
    valorMesCartaoEntrega: 0,
    valorMesBoletoBancario: 0,
    valorMesDinheiro: 0,
    
    totalMespix: 0,
    totalMesCartaoApp: 0,
    totalMesCartaoEntrega: 0,
    totalMesBoletoBancario: 0,
    totalMesDinheiro: 0,

  });
  
  const formatarParaReais = (valor) => {
    if (valor !== undefined) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
      return ''; // ou qualquer outro valor padrão desejado
    }
  };


// Puxar os dados do backend

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes/Dinheiro');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalMesDinheiro: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes/BoletoBancario');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalMesBoletoBancario: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes/CartaoEntrega');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalMesCartaoEntrega: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes/CartaoApp');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalMesCartaoApp: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes/Pix');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalMespix: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Total');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalPedidos: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            pedidosNesseMes: data,
          }));
        } else {
          console.error('Erro ao buscar dados de pedidos no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de pedidos no mês:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Total/Pix');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalPedidosPix: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos Pix:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos Pix:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Vendas/Total/CartaoApp
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Total/CartaoApp');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalPedidosCartaoApp: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos com Cartão App:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos com Cartão App:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Vendas/Mes/CartaoApp
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes/CartaoApp');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            pedidosCartaoAppNesseMes: data,
          }));
        } else {
          console.error('Erro ao buscar dados de pedidos com Cartão App no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de pedidos com Cartão App no mês:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Vendas/Total/CartaoEntrega
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Total/CartaoEntrega');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalPedidosCartaoEntrega: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos com Cartão Entrega:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos com Cartão Entrega:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Vendas/Mes/CartaoEntrega
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes/CartaoEntrega');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            pedidosCartaoEntregaNesseMes: data,
          }));
        } else {
          console.error('Erro ao buscar dados de pedidos com Cartão Entrega no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de pedidos com Cartão Entrega no mês:', error);
      }
    };

    fetchData();
  }, []);
  // GET /api/ControleVendas/Vendas/Total/BoletoBancario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Total/BoletoBancario');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalPedidosBoletoBancario: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos com Boleto Bancário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos com Boleto Bancário:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Vendas/Mes/BoletoBancario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes/BoletoBancario');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            pedidosBoletoBancarioNesseMes: data,
          }));
        } else {
          console.error('Erro ao buscar dados de pedidos com Boleto Bancário no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de pedidos com Boleto Bancário no mês:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Vendas/Total/Dinheiro
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Total/Dinheiro');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            totalPedidosDinheiro: data,
          }));
        } else {
          console.error('Erro ao buscar dados de total de pedidos com Dinheiro:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de total de pedidos com Dinheiro:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Vendas/Mes/Dinheiro
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Vendas/Mes/Dinheiro');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            pedidosDinheiroNesseMes: data,
          }));
        } else {
          console.error('Erro ao buscar dados de pedidos com Dinheiro no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de pedidos com Dinheiro no mês:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Total
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Total');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorTotal: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total:', error);
      }
    };

    fetchData();
  }, []);
  // GET /api/ControleVendas/Valor/Mes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Mes');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorTotalMes: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total do mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total do mês:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Total/Pix
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Total/Pix');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorTotalPix: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total de Pix:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total de Pix:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Mes/Pix
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Mes/Pix');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorMesPix: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total de Pix no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total de Pix no mês:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Total/CartaoApp
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Total/CartaoApp');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorTotalCartaoApp: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total de Cartão App:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total de Cartão App:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Mes/CartaoApp
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Mes/CartaoApp');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorMesCartaoApp: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total de Cartão App no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total de Cartão App no mês:', error);
      }
    };

    fetchData();
  }, []);
  // GET /api/ControleVendas/Valor/Total/CartaoEntrega
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Total/CartaoEntrega');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorTotalCartaoEntrega: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total de Cartão Entrega:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total de Cartão Entrega:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Mes/CartaoEntrega
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Mes/CartaoEntrega');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorMesCartaoEntrega: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total de Cartão Entrega no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total de Cartão Entrega no mês:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Total/BoletoBancario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Total/BoletoBancario');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorTotalBoletoBancario: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total de Boleto Bancário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total de Boleto Bancário:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Mes/BoletoBancario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Mes/BoletoBancario');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorMesBoletoBancario: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total de Boleto Bancário no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total de Boleto Bancário no mês:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Total/Dinheiro
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Total/Dinheiro');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorTotalDinheiro: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total em Dinheiro:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total em Dinheiro:', error);
      }
    };

    fetchData();
  }, []);

  // GET /api/ControleVendas/Valor/Mes/Dinheiro
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/ControleVendas/Valor/Mes/Dinheiro');
        if (response.ok) {
          const data = await response.json();
          setPedidos(prevState => ({
            ...prevState,
            valorMesDinheiro: data,
          }));
        } else {
          console.error('Erro ao buscar o valor total em Dinheiro no mês:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o valor total em Dinheiro no mês:', error);
      }
    };

    fetchData();
  }, []);

// Fim



  // Função para lidar com o logout
  const handleLogout = () => {
    navigation.navigate('Login');
  };

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
          <Text style={styles.textoPadraoBox}>Obtido no mês: {formatarParaReais(pedidos.valorTotalMes)}</Text>
          <Text style={styles.textoPadraoBox}>Total obtido: {formatarParaReais(pedidos.valorTotal)}</Text>
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
              <Text style={styles.textoPadraoBoxPagamento}>Vendas neste mês:{pedidos.totalMespix}</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Total de vendas:{pedidos.totalPedidosPix}</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Vendas nesse mês(R$): {formatarParaReais(pedidos.valorMesPix)}</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Total de vendas(R$): {formatarParaReais(pedidos.valorTotalPix)}</Text>
            </View>
            <View style={styles.boxPagamento}>
              <View style={styles.imagemPagamento}>
                <View style={styles.icon}>
                  <Image source={require('../../../assets/cartao.png')} />
                </View>
                <Text style={styles.pixImagem}>Cartão de Crédito</Text>
              </View>  
              <Text style={styles.textoPadraoBoxPagamento}>Quantidade de vendas (mês): {pedidos.totalMesCartaoApp}</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Quantidade total de vendas: {pedidos.totalPedidosCartaoApp}</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Vendas nesse mês(R$): {formatarParaReais(pedidos.valorMesCartaoApp)}</Text>
              <Text style={styles.textoPadraoBoxPagamento}>Total de vendas(R$): {formatarParaReais(pedidos.valorTotalCartaoApp)}</Text>
            </View>
            <View style={styles.boxPagamento}>
          <View style={styles.imagemPagamento}>
            <View style={styles.icon}>
              <Image source={require('../../../assets/boleto.png')} />
            </View>
            <Text style={styles.pixImagem}>Boleto Bancário</Text>
          </View>  
          <Text style={styles.textoPadraoBoxPagamento}>Quantidade de vendas (mês): {pedidos.totalMesBoletoBancario}</Text>
          <Text style={styles.textoPadraoBoxPagamento}>Total de vendas: {pedidos.totalPedidosBoletoBancario}</Text>
          <Text style={styles.textoPadraoBoxPagamento}>Vendas nesse mês(R$): {formatarParaReais(pedidos.valorMesBoletoBancario)}</Text>
          <Text style={styles.textoPadraoBoxPagamento}>Total de vendas(R$): {formatarParaReais(pedidos.valorTotalBoletoBancario)}</Text>
        </View>
        <View style={styles.boxPagamento}>
          <View style={styles.imagemPagamento}>
            <View style={styles.icon}>
              <Image source={require('../../../assets/moto.png')} />
            </View>
            <Text style={styles.pixImagem}>Cartão de Entrega</Text>
          </View>  
          <Text style={styles.textoPadraoBoxPagamento}>Quantidade de vendas (mês): {pedidos.totalMesCartaoEntrega}</Text>
          <Text style={styles.textoPadraoBoxPagamento}>Total de vendas: {pedidos.totalPedidosCartaoEntrega}</Text>
          <Text style={styles.textoPadraoBoxPagamento}>Vendas nesse mês(R$): {formatarParaReais(pedidos.valorMesCartaoEntrega)}</Text>
          <Text style={styles.textoPadraoBoxPagamento}>Total de vendas(R$): {formatarParaReais(pedidos.valorTotalCartaoEntrega)}</Text>
        </View>
        <View style={styles.boxPagamento}>
          <View style={styles.imagemPagamento}>
            <View style={styles.icon}>
              <Image source={require('../../../assets/dinheiro.png')} />
            </View>
            <Text style={styles.pixImagem}>Dinheiro</Text>
          </View>  
          <Text style={styles.textoPadraoBoxPagamento}>Quantidade de vendas (mês): {pedidos.totalMesDinheiro}</Text>
          <Text style={styles.textoPadraoBoxPagamento}>Total de vendas: {pedidos.totalPedidosDinheiro}</Text>
          <Text style={styles.textoPadraoBoxPagamento}>Vendas nesse mês(R$): {formatarParaReais(pedidos.valorMesDinheiro)}</Text>
        <Text style={styles.textoPadraoBoxPagamento}>Total de vendas: {formatarParaReais(pedidos.valorTotalDinheiro)}</Text>
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
  },
  logo: {
    marginBottom: 20,
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
  ContainerScrollView: {
    height: 260
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
    width: 60,
    height: 60,
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
