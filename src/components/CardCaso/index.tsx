import {StyleSheet, TouchableOpacity, View} from 'react-native'
import { Text, Card } from 'react-native-paper';
import { router } from 'expo-router';

interface CardProps {
    title: string,
    dateRegister: string,
    responsavel: string,
    vitima: string,
    casoRota: string,
}

export function CardCaso({title, dateRegister, responsavel, vitima, casoRota}: CardProps){

    function entrarCaso(id: String){
        console.log(`Entrou na rota ${id}`);
        router.navigate(`/caso/${id}`)
    }

    return (
        <TouchableOpacity style={styles.cardTocavel} onPress={() => entrarCaso(casoRota)}>
            <Card>
                <Card.Content>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle} variant="titleMedium">{title}</Text>
                        <View style={styles.status}><Text style={styles.statusText}>Em andamento</Text></View>
                    </View>
                    <View style={styles.cardMain}>
                        <Text variant="bodyMedium"><Text style={styles.textContentBold}>Data de registro:</Text> {dateRegister}</Text>
                        <Text variant="bodyMedium"><Text style={styles.textContentBold}>Responsável:</Text> {responsavel}</Text>
                        <Text variant="bodyMedium"><Text style={styles.textContentBold}>Vítima:</Text> {vitima}</Text>
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
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    cardTitle: {
        fontWeight: 'bold',
        maxWidth: 220,
    },

    cardMain: {
        paddingTop: 15,
    },

    status: {
        backgroundColor: '#20639B',
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