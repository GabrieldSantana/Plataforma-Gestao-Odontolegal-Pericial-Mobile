import { Link, router } from 'expo-router'
import {StyleSheet, Text, View} from 'react-native'

export default function Casos(){
    return (
        <View>
            <Text>Home</Text>
            <Link href={{pathname: '/caso/7'}}>Abrir caso</Link>
            <Link href={{pathname: '/caso/9'}}>Abrir caso</Link>
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