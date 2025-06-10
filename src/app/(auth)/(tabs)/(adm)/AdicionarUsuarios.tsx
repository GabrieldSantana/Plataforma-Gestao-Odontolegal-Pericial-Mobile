import { Link } from 'expo-router'
import {View, Text} from 'react-native'

export default function administrarUsuarios(){
    return(
        <View>
            <Text>Tela de adicionar usuários</Text>
            <Link href="./">Voltar para a tela anterior</Link>
        </View>
    )
}