import { Link } from 'expo-router'
import {View, Text} from 'react-native'

export default function administrarUsuarios(){
    return(
        <View>
            <Text>Tela de administração de usuários</Text>
            <Link href="./AdicionarUsuarios">Adicionar usuários</Link>
        </View>
    )
}