import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, StyleSheet, Image, Animated, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logoScale] = useState(new Animated.Value(1));
  const navigation = useNavigation();


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    

    const animateOnMount = Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]);

    animateOnMount.start();

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerlogo}>
        <Animated.Image
          style={{
            transform: [{ scale: logoScale }],
          }}
          source={require('../../../assets/Logo1.png')}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [
              { translateY: offset.y }
            ]
          }
        ]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TouchableOpacity>
          <Text style={styles.txtRecuperarSenha}>Esqueceu sua senha? Clique aqui</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Fazer Login</Text>
        </TouchableOpacity>

        <Text style={styles.textoConta}>Ainda não possui conta?</Text>

        <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('EditarProduto')}>
          <Text style={styles.submitText}>Criar Conta</Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  containerlogo: {
    marginTop:50,
    marginBottom:30,
    alignItems: 'center',
    justifyContent: 'center',


  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input: {
    backgroundColor: '#EEEEEE',
    width: '90%',
    height: 40,
    padding: 10,
    marginBottom: 15,
    color: '#222',
    fontSize: 13,
    borderRadius: 7,
  },
  btnSubmit: {
    backgroundColor: '#74B0FF',
    width: '40%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 10
  },
  submitText: {
    color: '#fff',
    fontSize: 12,
  },
  textoConta: {
    color: '#898989',
    marginTop: '15%',
  },
  txtRecuperarSenha: {
    color: '#50DD78',
    marginBottom: '5%'
  },
});
