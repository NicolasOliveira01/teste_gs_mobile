import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { showAlert } from '../config/utils';
import { COLORS } from '../config/colors';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha ) {
      showAlert('Preencha todos os campos obrigatórios!', 'error');
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

    if (senha !== confirmarSenha) {
      showAlert('As senhas não coincidem!', 'error');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, senha);
      const userId = userCredential.user.uid;

      await database().ref(`/users/${userId}`).set({
        nome,
        email,
        criadoEm: new Date().toISOString(),
      });

      showAlert('Conta criada com sucesso!', 'success');
      navigation.navigate('Login');
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        showAlert('Este email já está em uso!', 'error');
      } else {
        showAlert('Erro ao criar conta. Tente novamente.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Junte-se ao SkillUpPlus 2030+</Text>

      {/* Dados Pessoais */}
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor={COLORS.GRAY_400}
        value={nome}
        onChangeText={setNome}
        editable={!loading}
      />

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
        placeholder="Senha (mín. 6 caracteres)"
        placeholderTextColor={COLORS.GRAY_400}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor={COLORS.GRAY_400}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        editable={!loading}
      />

      {/* Botão Cadastrar */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.WHITE} />
        ) : (
          <Text style={styles.buttonText}>Criar Conta</Text>
        )}
      </TouchableOpacity>

      {/* Botão Voltar */}
      <TouchableOpacity
        style={[styles.buttonSecondary, loading && { opacity: 0.7 }]}
        onPress={() => navigation.navigate('Login')}
        disabled={loading}
      >
        <Text style={styles.buttonSecondaryText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 30,
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
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 8,
    marginLeft: 4,
  },
  picker: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 10,
    backgroundColor: COLORS.SURFACE,
    overflow: 'hidden',
  },
  pickerText: {
    color: COLORS.TEXT_PRIMARY,
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