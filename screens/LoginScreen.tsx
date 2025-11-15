import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { showAlert } from '../config/utils';
import { COLORS } from '../config/colors';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      showAlert('Preencha todos os campos!', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Email inválido!', 'error');
      return;
    }

    if (senha.length < 6) {
      showAlert('A senha deve ter no mínimo 6 caracteres!', 'error');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, senha);
      const userId = userCredential.user.uid;
      
      console.log('Usuário logado:', userId);
      
      const userSnapshot = await database().ref(`/users/${userId}`).once('value');
      const userData = userSnapshot.val();
      
      console.log('Dados do usuário:', userData);
      
      showAlert('Login realizado com sucesso!', 'success');
      
      navigation.navigate('Courses');
      
    } catch (error: any) {
      console.log(error);
      showAlert('Email/senha incorretos!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao SkillUpPlus</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.GRAY_400}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={COLORS.GRAY_400}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonSecondary, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonSecondaryText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: COLORS.SURFACE,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonSecondary: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.SECONDARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondaryText: {
    color: COLORS.SECONDARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
});