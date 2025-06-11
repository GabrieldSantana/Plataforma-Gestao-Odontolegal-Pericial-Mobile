import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { PieChart as RNPieChart, BarChart as RNBarChart } from 'react-native-chart-kit';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    casesByMonth: [],
    casesByLocation: [],
    victimsByEthnicity: [],
    victimsByGender: [],
    victimsByAge: [],
    casesByExpert: [],
    recentCases: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);

  const API_URL = 'http://192.168.0.102:5000';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let allDataLoaded = true;

      try {
        const casosResponse = await axios.get(`${API_URL}/api/dashboard/casos`, { timeout: 5000 });
        if (casosResponse.data && casosResponse.data.aggregations) {
          const casesByMonth = Object.entries(casosResponse.data.aggregations.data_count || {}).map(
            ([month, count]) => ({ month, count: Number(count) || 0 })
          );
          const casesByLocation = Object.entries(casosResponse.data.aggregations.local_count || {}).map(
            ([location, count]) => ({ location, count: Number(count) || 0 })
          );
          setData(prev => ({ ...prev, casesByMonth, casesByLocation }));
        } else {
          allDataLoaded = false;
        }
      } catch (error) {
        setError('Falha ao carregar casos');
        allDataLoaded = false;
      }

      try {
        const vitimasResponse = await axios.get(`${API_URL}/api/dashboard/vitimas`, { timeout: 5000 });
        if (vitimasResponse.data && vitimasResponse.data.aggregations) {
          const victimsByEthnicity = Object.entries(vitimasResponse.data.aggregations.etnia_count || {}).map(
            ([ethnicity, count]) => ({ ethnicity, count: Number(count) || 0 })
          );
          const victimsByGender = Object.entries(vitimasResponse.data.aggregations.genero_count || {}).map(
            ([gender, count]) => ({ gender, count: Number(count) || 0 })
          );
          const victimsByAge = Object.entries(vitimasResponse.data.aggregations.idade_count || {}).map(
            ([age, count]) => ({ age, count: Number(count) || 0 })
          );
          setData(prev => ({ ...prev, victimsByEthnicity, victimsByGender, victimsByAge }));
        } else {
          allDataLoaded = false;
        }
      } catch (error) {
        setError('Falha ao carregar vítimas');
        allDataLoaded = false;
      }

      try {
        const peritosResponse = await axios.get(`${API_URL}/api/dashboard/peritos`, { timeout: 5000 });
        if (peritosResponse.data && peritosResponse.data.casos_por_perito) {
          const casesByExpert = Object.entries(peritosResponse.data.casos_por_perito || {}).map(
            ([perito, casos]) => ({ perito, casos: Number(casos) || 0 })
          );
          setData(prev => ({ ...prev, casesByExpert }));
        } else {
          allDataLoaded = false;
        }
      } catch (error) {
        setError('Falha ao carregar casos por perito');
        allDataLoaded = false;
      }

      try {
        const evidenciasResponse = await axios.get(`${API_URL}/api/dashboard/evidencias`, { timeout: 5000 });
        if (evidenciasResponse.data && evidenciasResponse.data.aggregations) {
          const recentCases = Object.entries(evidenciasResponse.data.aggregations.evidencias_por_caso || {}).map(
            ([caso, quantidade]) => `${caso} (${quantidade} evidência(s))`
          );
          setData(prev => ({ ...prev, recentCases }));
        } else {
          allDataLoaded = false;
        }
      } catch (error) {
        setError('Falha ao carregar evidências');
        allDataLoaded = false;
      } finally {
        setLoading(false);
        setIsDataReady(allDataLoaded);
      }
    };

    fetchData();
  }, []);

  const BarChart = ({ data, title, labelsKey, dataKey }: { data: any[], title: string, labelsKey: string, dataKey: string }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <Text style={styles.noDataText}>Sem dados disponíveis</Text>;
    }

    const chartData: ChartData = {
      labels: data.map(item => item[labelsKey]),
      datasets: [{ data: data.map(item => item[dataKey]) }],
    };

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{title}</Text>
        <RNBarChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={200}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '0' },
            yAxisSuffix: '',
          }}
          style={{ paddingRight: 10 }}
        />
      </View>
    );
  };

  const PieChart = ({ data, title }: { data: any[], title: string }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <Text style={styles.noDataText}>Sem dados disponíveis</Text>;
    }

    const chartData: ChartData = {
      labels: data.map(item => item.perito),
      datasets: [{ data: data.map(item => item.casos) }],
    };

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{title}</Text>
        <RNPieChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
        <Text style={styles.totalText}>
          Total de Casos: {data.reduce((sum, item) => sum + item.casos, 0)}
        </Text>
      </View>
    );
  };

  const renderRecentCase = ({ item }: { item: string }) => (
    <View style={styles.recentCaseItem}>
      <Text>{item}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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

  // Logs para depuração
  console.log('Estado final data:', {
    casesByMonth: data.casesByMonth,
    casesByLocation: data.casesByLocation,
    victimsByEthnicity: data.victimsByEthnicity,
    victimsByGender: data.victimsByGender,
    victimsByAge: data.victimsByAge,
    casesByExpert: data.casesByExpert,
    recentCases: data.recentCases,
  });

  return (
    <View style={styles.container}>
      <BarChart data={data.casesByMonth} title="Casos por Mês" labelsKey="month" dataKey="count" />
      <BarChart data={data.casesByLocation} title="Casos por Local" labelsKey="location" dataKey="count" />
      <BarChart data={data.victimsByEthnicity} title="Vítimas por Etnia" labelsKey="ethnicity" dataKey="count" />
      <BarChart data={data.victimsByGender} title="Vítimas por Gênero" labelsKey="gender" dataKey="count" />
      <BarChart data={data.victimsByAge} title="Vítimas por Idade" labelsKey="age" dataKey="count" />
      <PieChart data={data.casesByExpert} title="Casos por Perito" />
      <View style={styles.recentCasesContainer}>
        <Text style={styles.title}>Casos Recentes</Text>
        <FlatList
          data={data.recentCases}
          renderItem={renderRecentCase}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.noDataText}>Sem casos recentes</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  chartContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalText: {
    fontSize: 14,
    marginTop: 5,
  },
  recentCasesContainer: {
    marginVertical: 10,
    width: '100%',
  },
  recentCaseItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});