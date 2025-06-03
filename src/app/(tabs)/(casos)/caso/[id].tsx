import { Link } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import {StyleSheet, Text, View} from 'react-native'

export default function Caso(){
    const { id } = useLocalSearchParams()

    return (
        <View>
            <Text>Caso {id}</Text>
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