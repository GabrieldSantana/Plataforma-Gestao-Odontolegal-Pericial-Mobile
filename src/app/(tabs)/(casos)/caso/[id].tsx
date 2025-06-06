import { Link, router } from 'expo-router'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { Appbar, FAB } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function Caso(){
    interface Caso {
      id: string;
      title: string;
      dataDeRegistro: string;
      responsavel: string;
      vitima: string;
      descricao?: string; // Opcional, já que nem todos os objetos têm essa propriedade
    }

    const { id } = useLocalSearchParams()
    const [caso, setCaso] = useState<Caso>()
    

    async function fetchCaso(){
        try{
            const response = await axios.get(`http://192.168.1.62:3000/casos/${id}`);
            setCaso(response.data)
        } catch (erro){
            console.log(erro)
        }
    }

    useEffect(() => {
        fetchCaso()
    }, [])

    return (
        <SafeAreaProvider>
            <Appbar.Header mode='small'>
                <Appbar.BackAction onPress={() => {router.back()}} />
                <Appbar.Content title={caso?.title} titleMaxFontSizeMultiplier={1}/>
            </Appbar.Header>

            <Text>Caso {caso?.id}</Text>
            <Text>Título: {caso?.title}</Text>
            <Text>Data de Registro: {caso?.dataDeRegistro}</Text>
            <Text>Responsável: {caso?.responsavel}</Text>
            <Text>Vítima: {caso?.vitima}</Text>
            <Text>Descricao: {caso?.descricao}</Text>

            <FAB
                icon="plus"
                label='Adicionar evidência'
                color='white'
                style={styles.fab}
                onPress={() => router.navigate('../AdicionarEvidencia')}
                accessibilityLabel='Adicionar evidência'
            />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 10,
        backgroundColor: '#1A4D77',
    },
})