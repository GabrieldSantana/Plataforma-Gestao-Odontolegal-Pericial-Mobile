import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PieChart as RNPieChart,
  BarChart as RNBarChart,
  LineChart as RNLineChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
  const [data, setData] = useState({
    casesByMonth: [],
    casesByLocation: [],
    victimsByEthnicity: [],
    victimsByGender: [],
    victimsByAge: [],
    casesByExpert: [],
    recentCases: [],
  });
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);

  const API_URL = 'https://gop-analise-api.onrender.com';

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const json = await AsyncStorage.getItem('usuario');
        if (json) setUsuario(JSON.parse(json));
      } catch (e) {
        console.error('Erro ao carregar o usuário', e);
      }
    };
    carregarUsuario();
  }, []);

  useEffect(() => {
    if (!usuario) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setIsDataReady(false);

      try {
        const [casos, vitimas, peritos, evidencias] = await Promise.all([
          axios.get(`${API_URL}/api/dashboard/casos`),
          axios.get(`${API_URL}/api/dashboard/vitimas`),
          axios.get(`${API_URL}/api/dashboard/peritos`),
          axios.get(`${API_URL}/api/dashboard/evidencias`),
        ]);

        const casesByMonth = Object.entries(casos.data.aggregations?.data_count || {})
          .map(([month, count]) => ({ month, count: Number(count) || 0 }));

        const casesByLocation = Object.entries(casos.data.aggregations?.local_count || {})
          .map(([location, count]) => ({
            location: location.split(' ')[0],
            count: Number(count) || 0,
          }));

        const victimsByEthnicity = Object.entries(vitimas.data.aggregations?.etnia_count || {})
          .map(([ethnicity, count]) => ({ ethnicity, count: Number(count) || 0 }));

        const victimsByGender = Object.entries(vitimas.data.aggregations?.genero_count || {})
          .map(([gender, count]) => ({ gender, count: Number(count) || 0 }));

        const victimsByAge = Object.entries(vitimas.data.aggregations?.idade_count || {})
          .map(([age, count]) => ({ age, count: Number(count) || 0 }));

        const casesByExpert = Object.entries(peritos.data.casos_por_perito || {})
          .map(([perito, casos]) => ({
            perito: perito.split(' ')[0],
            casos: Number(casos) || 0,
          }));

        const recentCases = Object.entries(evidencias.data.aggregations?.evidencias_por_caso || {})
          .map(([caso, quantidade]) => ({
            caso: caso.split(' ')[0],
            quantidade: Number(quantidade) || 0,
          }));

        setData({
          casesByMonth,
          casesByLocation,
          victimsByEthnicity,
          victimsByGender,
          victimsByAge,
          casesByExpert,
          recentCases,
        });

        setIsDataReady(true);
      } catch (err) {
        console.error(err);
        setError('Falha ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [usuario]);

  if (!usuario || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  if (error || !isDataReady) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error || 'Dados não carregados completamente'}</Text>
      </View>
    );
  }

  const BarChart = ({ data, title, labelsKey, dataKey }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <Text style={styles.noDataText}>Sem dados disponíveis</Text>;
    }

    const chartData = {
      labels: data.map(item => item[labelsKey]),
      datasets: [{ data: data.map(item => item[dataKey]) }],
    };

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{title}</Text>
        <RNBarChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero
          showValuesOnTopOfBars={true}
          withInnerLines={true}
          barPercentage={0.7}
          spacingInner={0.3}
          style={{ borderRadius: 8 }}
        />
      </View>
    );
  };

  const LineChartCustom = ({ data, title, labelsKey, dataKey }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <Text style={styles.noDataText}>Sem dados disponíveis</Text>;
    }

    const chartData = {
      labels: data.map(item => item[labelsKey]),
      datasets: [{ data: data.map(item => item[dataKey]) }],
    };

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{title}</Text>
        <RNLineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          bezier
          fromZero
          style={{ borderRadius: 8 }}
        />
      </View>
    );
  };

  const PieChartCustom = ({ data, title, labelsKey, dataKey }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <Text style={styles.noDataText}>Sem dados disponíveis</Text>;
    }

    const vibrantColors = [
      '#FF6384', '#36A2EB', '#FFCE56',
      '#4BC0C0', '#9966FF', '#FF9F40',
      '#66FF66', '#FF6666', '#6699FF',
      '#CC66FF', '#FFCC66',
    ];

    const chartData = data.map((item, index) => ({
      name: item[labelsKey],
      population: item[dataKey],
      color: vibrantColors[index % vibrantColors.length],
      legendFontColor: '#444',
      legendFontSize: 13,
    }));

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{title}</Text>
        <RNPieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    );
  };

  const renderRecentCase = ({ item }) => (
    <View style={styles.recentCaseItem}>
      <Text style={styles.recentCaseText}>{item.caso} ({item.quantidade} evidência(s))</Text>
    </View>
  );

  const chartConfig = {
    backgroundGradientFrom: '#f5f8ff',
    backgroundGradientTo: '#dbe9ff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(30, 30, 30, ${opacity})`,
    style: { borderRadius: 8 },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#e3e9ff',
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#4a90e2',
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LineChartCustom data={data.casesByMonth} title="Casos por Mês" labelsKey="month" dataKey="count" />
      
      {/* Aqui o gráfico "Casos por Local" virou pizza */}
      <PieChartCustom data={data.casesByLocation} title="Casos por Local" labelsKey="location" dataKey="count" />
      
      <PieChartCustom data={data.victimsByEthnicity} title="Vítimas por Etnia" labelsKey="ethnicity" dataKey="count" />
      <PieChartCustom data={data.victimsByGender} title="Vítimas por Gênero" labelsKey="gender" dataKey="count" />
      <BarChart data={data.victimsByAge} title="Vítimas por Idade" labelsKey="age" dataKey="count" />
      <BarChart data={data.casesByExpert} title="Casos por Perito" labelsKey="perito" dataKey="casos" />
      <LineChartCustom data={data.recentCases} title="Evidências por Caso" labelsKey="caso" dataKey="quantidade" />
      <View style={styles.recentCasesContainer}>
        <Text style={styles.title}>Casos Recentes</Text>
        <FlatList
          data={data.recentCases}
          renderItem={renderRecentCase}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.noDataText}>Sem casos recentes</Text>}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f9fbff',
    padding: 10,
    paddingBottom: 30,
  },
  chartContainer: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
  },
  recentCasesContainer: {
    marginVertical: 10,
    width: '100%',
  },
  recentCaseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recentCaseText: {
    fontSize: 14,
    color: '#333',
    flexWrap: 'wrap',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fbff',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
});
