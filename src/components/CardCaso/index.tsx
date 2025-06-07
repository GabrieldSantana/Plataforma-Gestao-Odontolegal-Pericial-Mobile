import {StyleSheet, TouchableOpacity, View} from 'react-native'
import { Text, Card } from 'react-native-paper';
import { router } from 'expo-router';

interface CardProps {
    title: string,
    dateRegister: string,
    responsavel: string,
    vitima: string,
    casoRota: string,
    status: string,
}

export function CardCaso({title, dateRegister, responsavel, status, casoRota}: CardProps){

    function entrarCaso(id: String){
        router.navigate(`/caso/${id}`)
    }

    // Mapeamento de cores para cada status
    const statusColors: { [key: string]: string } = {
        'Em andamento': '#20639B', // Azul escuro
        'Finalizado': '#1A7730',   // Verde
        'Arquivado': '#B22222',    // Vermelho
        'default': '#757575',      // Cinza para status desconhecidos
    };

    // Seleciona a cor com base no status, com fallback para 'default'
    const statusBackgroundColor = statusColors[status] || statusColors['default'];

    return (
        <TouchableOpacity style={styles.cardTocavel} onPress={() => entrarCaso(casoRota)}>
            <Card mode='outlined'>
                <Card.Content style={{backgroundColor: '#fff'}}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle} variant="titleMedium">{title}</Text>
                        <View style={[styles.status, { backgroundColor: statusBackgroundColor }]}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                    </View>
                    <View style={styles.cardMain}>
                        <Text variant="bodyMedium"><Text style={styles.textContentBold}>Data de registro:</Text> {dateRegister}</Text>
                        <Text variant="bodyMedium"><Text style={styles.textContentBold}>Responsável:</Text> {responsavel}</Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    cardTocavel: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        width: 355,
        margin: 'auto',
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },

    cardTitle: {
        fontWeight: 'bold',
        maxWidth: 200,
    },

    cardMain: {
        paddingTop: 15,
    },

    status: {
        padding: 10,
        borderRadius: 5,
    },

    statusText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },

    textContentBold: {
        fontWeight: 'bold',
    }
})