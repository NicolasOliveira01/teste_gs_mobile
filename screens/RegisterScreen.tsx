import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { showAlert } from '../config/utils';
import { COLORS } from '../config/colors';
import { Picker } from '@react-native-picker/picker';

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
  const [areaInteresse, setAreaInteresse] = useState('');
  const [nivelArea, setNivelArea] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !areaInteresse || !nivelArea) {
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

      const areaColors: { [key: string]: string } = {
        'ia': '#8B5CF6',
        'sustentabilidade': '#059669',
        'softSkills': '#F59E0B',
        'gestao': '#DC2626',
        'analiseDados': '#0369A1',
        'ti': '#2563EB'
      };

      await database().ref(`/users/${userId}`).set({
        nome,
        email,
        criadoEm: new Date().toISOString(),
        Courses: {
          Course1: {
            area: areaInteresse,
            nivel: nivelArea,
            cor: areaColors[areaInteresse] || '#666666',
            concluido: false,
          }
        }
      });

      showAlert('Conta criada com sucesso!', 'success');
      
      // ✅ VAI DIRETO PARA COURSES SEM PARÂMETROS
      navigation.navigate('Courses');
      
    } catch (error: any) {
      console.log('Erro detalhado:', error);
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

      <Text style={[styles.subtitle2, {fontSize: 20}]}>Dados Cadastrais: </Text>

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
        style={[styles.input, { marginBottom: 20 }]}
        placeholder="Confirmar Senha"
        placeholderTextColor={COLORS.GRAY_400}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        editable={!loading}
      />

      <Text style={[styles.subtitle2, {fontSize: 20}]}>Área de Interesse: </Text>

      {/* Picker Área de Interesse */}
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={areaInteresse}
            onValueChange={setAreaInteresse}
            enabled={!loading}
            style={styles.pickerText}
          >
            <Picker.Item label="Selecione sua área de interesse" value="" />
            <Picker.Item label="🤖 IA (Machine Learning, ChatGPT)" value="ia" />
            <Picker.Item label="🌱 Sustentabilidade (ESG, Energia Renovável)" value="sustentabilidade" />
            <Picker.Item label="💬 Soft Skills (Comunicação, Liderança)" value="softSkills" />
            <Picker.Item label="📊 Gestão (Gestão de Projetos, Liderança)" value="gestao" />
            <Picker.Item label="📈 Análise de Dados (Data Science, BI)" value="analiseDados" />
            <Picker.Item label="💻 Tecnologia da Informação" value="ti" />
          </Picker>
        </View>
      </View>

      <Text style={[styles.subtitle2, {fontSize: 20, marginTop: 10}]}>Nível na área escolhida: </Text>

      {/* Picker Nível */}
      <View style={[styles.pickerContainer, {marginBottom: 40}]}>
        <View style={styles.picker}>
          <Picker
            selectedValue={nivelArea}
            onValueChange={setNivelArea}
            enabled={!loading}
            style={styles.pickerText}
          >
            <Picker.Item label="Selecione seu nível" value="" />
            <Picker.Item label="🚀 Iniciante" value="iniciante" />
            <Picker.Item label="📈 Intermediário" value="intermediario" />
            <Picker.Item label="💎 Avançado" value="avancado" />
          </Picker>
        </View>
      </View>

      

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
  subtitle2:{
    fontSize: 18,
    color: COLORS.PRIMARY,
    marginBottom: 15,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: COLORS.SURFACE,
    fontSize: 16,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
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