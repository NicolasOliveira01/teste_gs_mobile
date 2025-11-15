import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView,
  Modal,
  StyleSheet
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { showAlert } from '../config/utils';
import { COLORS } from '../config/colors';

type CoursesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Courses'
>;

type Props = {
  navigation: CoursesScreenNavigationProp;
};

type CourseType = {
  area: string;
  nivel: string;
  cor: string;
  concluido: boolean;
};

export default function CoursesScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cursos, setCursos] = useState<{[key: string]: CourseType}>({});
  const [areaSelecionada, setAreaSelecionada] = useState('');
  const [nivelSelecionado, setNivelSelecionado] = useState('');
  const [adicionandoCurso, setAdicionandoCurso] = useState(false);

  const areaColors: { [key: string]: string } = {
    'ia': '#8B5CF6',
    'sustentabilidade': '#059669',
    'softSkills': '#F59E0B',
    'gestao': '#DC2626',
    'analiseDados': '#0369A1',
    'ti': '#2563EB'
  };

  const areaNomes: { [key: string]: string } = {
    'ia': '🤖 IA',
    'sustentabilidade': '🌱 Sustentabilidade',
    'softSkills': '💬 Soft Skills',
    'gestao': '📊 Gestão',
    'analiseDados': '📈 Análise de Dados',
    'ti': '💻 Tecnologia'
  };

  const nivelNomes: { [key: string]: string } = {
    'iniciante': '🚀 Iniciante',
    'intermediario': '📈 Intermediário',
    'avancado': '💎 Avançado'
  };

  const TOTAL_CURSOS = 15; 

  const cursosConcluidos = Object.values(cursos).filter(
    curso => curso.concluido === true
  ).length;

  const porcentagemConcluida = (cursosConcluidos / TOTAL_CURSOS) * 100;

  const navegarParaConteudoCurso = (courseId: string, curso: CourseType) => {
    navigation.navigate('CourseContent', {
      courseId: courseId,
      area: curso.area,
      nivel: curso.nivel
    });
  };

  useEffect(() => {
    const userId = auth().currentUser?.uid;
    if (userId) {
      const userRef = database().ref(`/users/${userId}/Courses`);
      userRef.on('value', (snapshot) => {
        const cursosData = snapshot.val() || {};
        setCursos(cursosData);
      });
    }
  }, []);

  const adicionarNovoCurso = async () => {
    if (!areaSelecionada || !nivelSelecionado) {
      showAlert('Selecione uma área e nível!', 'error');
      return;
    }

    const cursoExistente = Object.values(cursos).find(
      curso => curso.area === areaSelecionada && curso.nivel === nivelSelecionado
    );

    if (cursoExistente) {
      showAlert('Este curso já foi adicionado!', 'error');
      return;
    }

    setAdicionandoCurso(true);
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) return;

      const novoCourseId = `Course${Object.keys(cursos).length + 1}`;

      await database().ref(`/users/${userId}/Courses/${novoCourseId}`).set({
        area: areaSelecionada,
        nivel: nivelSelecionado,
        cor: areaColors[areaSelecionada] || '#666666',
        concluido: false
      });

      showAlert('Curso adicionado com sucesso!', 'success');
      setModalVisible(false);
      setAreaSelecionada('');
      setNivelSelecionado('');
    } catch (error) {
      showAlert('Erro ao adicionar curso', 'error');
    } finally {
      setAdicionandoCurso(false);
    }
  };

  const areas = ['ia', 'sustentabilidade', 'softSkills', 'gestao', 'analiseDados', 'ti'];
  const niveis = ['iniciante', 'intermediario', 'avancado'];

  const combinaçõesEscolhidas = Object.values(cursos).map(
    (curso: CourseType) => `${curso.area}_${curso.nivel}`
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Minhas Trilhas
        </Text>

        {/* Barra de Progresso */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>📊 Progresso Geral</Text>
            <Text style={styles.progressText}>
              {cursosConcluidos} de {TOTAL_CURSOS} cursos concluídos
            </Text>
          </View>
          
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${porcentagemConcluida}%` }
              ]} 
            />
          </View>
          
          <Text style={styles.progressPercentage}>
            {Math.round(porcentagemConcluida)}% completo
          </Text>
        </View>

        {/* Cursos do usuário - AGORA CLICÁVEIS */}
        {Object.keys(cursos).length === 0 ? (
          <Text style={{ textAlign: 'center', marginVertical: 20, color: COLORS.GRAY_400 }}>
            Nenhum curso adicionado ainda
          </Text>
        ) : (
          Object.entries(cursos).map(([courseId, curso]) => (
            <TouchableOpacity
              key={courseId}
              style={[
                styles.cursoCard,
                { backgroundColor: curso.cor + '20', borderLeftColor: curso.cor }
              ]}
              onPress={() => navegarParaConteudoCurso(courseId, curso)}
              activeOpacity={0.7}
            >
              <Text style={styles.cursoArea}>{areaNomes[curso.area]}</Text>
              <Text style={styles.cursoNivel}>{nivelNomes[curso.nivel]}</Text>
              <Text style={[
                styles.cursoStatus,
                curso.concluido && styles.cursoStatusConcluido
              ]}>
                {curso.concluido ? '✅ Concluído' : '🔄 Em andamento'}
              </Text>
            </TouchableOpacity>
          ))
        )}

      </ScrollView>

      {/* Botão Flutuante para Adicionar Curso */}
      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.botaoFlutuanteTexto}>+</Text>
      </TouchableOpacity>

      {/* Modal de Adicionar Curso */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Adicionar Novo Curso</Text>

            <ScrollView style={styles.modalScroll}>
              {areas.map(area => (
                <View key={area} style={styles.areaContainer}>
                  <Text style={styles.areaTitulo}>{areaNomes[area]}</Text>
                  
                  {niveis.map(nivel => {
                    const combinacao = `${area}_${nivel}`;
                    const jaEscolhido = combinaçõesEscolhidas.includes(combinacao);
                    const selecionado = areaSelecionada === area && nivelSelecionado === nivel;

                    return (
                      <TouchableOpacity
                        key={nivel}
                        style={[
                          styles.nivelOption,
                          selecionado && { backgroundColor: areaColors[area] + '30' },
                          jaEscolhido && styles.nivelIndisponivel
                        ]}
                        onPress={() => {
                          if (!jaEscolhido) {
                            setAreaSelecionada(area);
                            setNivelSelecionado(nivel);
                          }
                        }}
                        disabled={jaEscolhido}
                      >
                        <Text style={[
                          styles.nivelTexto,
                          selecionado && { color: areaColors[area], fontWeight: 'bold' },
                          jaEscolhido && styles.nivelTextoIndisponivel
                        ]}>
                          {nivelNomes[nivel]}
                          {jaEscolhido && ' ❌ Já adicionado'}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </ScrollView>

            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.botaoAdicionar,
                  (!areaSelecionada || !nivelSelecionado) && { opacity: 0.5 }
                ]}
                onPress={adicionarNovoCurso}
                disabled={!areaSelecionada || !nivelSelecionado || adicionandoCurso}
              >
                {adicionandoCurso ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.botaoAdicionarTexto}>Adicionar Curso</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    fontWeight: '500',
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.GRAY_200,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 6,
  },
  progressPercentage: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    textAlign: 'center',
    fontWeight: '500',
  },
  cursoStatusConcluido: {
    color: '#059669',
    fontWeight: 'bold',
  },
  cursoCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  cursoArea: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cursoNivel: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    marginBottom: 5,
  },
  cursoStatus: {
    fontSize: 12,
    color: COLORS.GRAY_500,
  },
  botaoFlutuante: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  botaoFlutuanteTexto: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  modalScroll: {
    maxHeight: 400,
    padding: 20,
  },
  areaContainer: {
    marginBottom: 20,
  },
  areaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.TEXT_PRIMARY,
  },
  nivelOption: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  nivelIndisponivel: {
    backgroundColor: COLORS.GRAY_100,
    opacity: 0.6,
  },
  nivelTexto: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  nivelTextoIndisponivel: {
    color: COLORS.GRAY_500,
  },
  modalBotoes: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },
  botaoCancelar: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    marginRight: 10,
    alignItems: 'center',
  },
  botaoCancelarTexto: {
    color: COLORS.TEXT_PRIMARY,
    fontWeight: 'bold',
  },
  botaoAdicionar: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  botaoAdicionarTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});