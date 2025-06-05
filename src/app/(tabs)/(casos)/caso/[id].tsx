import { Link } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import {StyleSheet, Text, View} from 'react-native'
import { DATA } from '../index'


export default function Caso(){
    const { id } = useLocalSearchParams()
    const caso = DATA.find(item => item.id === id);

    return (
        <View>
            <Text>Caso {caso?.id}</Text>
            <Text>Título: {caso?.title}</Text>
            <Text>Data de Registro: {caso?.dataDeRegistro}</Text>
            <Text>Responsável: {caso?.responsavel}</Text>
            <Text>Vítima: {caso?.vitima}</Text>
            <Text>Descricao: {caso?.descricao}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
})