import { Link, router } from 'expo-router'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import { Appbar,  FAB, Portal, PaperProvider, Menu, Divider, Text } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CardEvidencia from '../../../../components/CardEvidencia'

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

    interface State {
        open: boolean;
    }

    const [state, setState] = useState<State>({ open: false });

    const onStateChange = ({ open }: { open: boolean }) => setState({ open });

    const { open } = state;

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <SafeAreaProvider>
                <PaperProvider>
                    <Appbar.Header mode="small">
                        <Appbar.BackAction onPress={() => router.back()} />
                        <Appbar.Content title={caso?.title} titleMaxFontSizeMultiplier={1} />
                        <Menu
                        style={{top: 20, zIndex: 1000}}
                        visible={visible}
                        elevation={3}
                        onDismiss={closeMenu}
                        anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
                        >
                        <Menu.Item onPress={() => { console.log('CLICOU NO BOTÃO GERAR RELATÓRIO'); closeMenu(); }} title="Gerar relatório" />
                        <Menu.Item onPress={() => { console.log('CLICOU NO BOTÃO DE EDITAR CASO'); closeMenu(); }} title="Editar caso" />
                        <Divider />
                        </Menu>
                    </Appbar.Header>
                </PaperProvider>
                <View style={styles.casoInfoContainer}>
                    <Text style={styles.title} variant='headlineSmall'>{caso?.title}</Text>
                    {/* <Text style={styles.label}>Id:</Text>
                    <Text style={styles.value}>{caso?.id}</Text> */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
                        <View>
                            <Text style={styles.label}>Data de Registro:</Text>
                            <Text style={styles.value}>{caso?.dataDeRegistro}</Text>
                            <Text style={styles.label}>Responsável:</Text>
                            <Text style={styles.value}>{caso?.responsavel}</Text>
                            <Text style={styles.label}>Vítima(s):</Text>
                            <Text style={styles.value}>{caso?.vitima}</Text>
                        </View>
                        <View style={{backgroundColor: '#20639B', height: 30, paddingHorizontal: 20, paddingVertical: 5, borderRadius: 10}}>
                            <Text style={styles.value && {color: 'white', fontWeight: 'bold'}}>Em andamento</Text>
                        </View>
                    </View>
                    <Text style={styles.label}>Descrição:</Text>
                    <Text style={styles.description}>{caso?.descricao}</Text>
                    <View style={{marginTop: 16}}>
                        <Text variant='titleLarge'>Evidências</Text>
                        <View style={{paddingTop: 10}}>
                            <CardEvidencia />
                            <CardEvidencia />
                            <CardEvidencia />
                        </View>
                    </View>
                </View>
                <PaperProvider>
                    <Portal>
                        <FAB.Group
                        open={open}
                        visible
                        color='white'
                        fabStyle={{ backgroundColor: '#1A4D77' }}
                        style={styles.fab}
                        backdropColor='transparent'
                        icon={open ? 'note' : 'plus'}
                        actions={[
                            {
                            icon: 'pencil',
                            label: 'Adicionar vítima',
                            onPress: () => console.log('Botão adicionar vítima ativado'),
                            style: { backgroundColor: '#1A4D77', },
                            color: 'white',
                            size: 'medium'
                            },
                            {
                            icon: 'pen',
                            label: 'Adicionar evidência',
                            onPress: () => router.navigate('../AdicionarEvidencia'),
                            style: { backgroundColor: '#1A4D77' },
                            color: 'white',
                            size: 'medium'
                            },
                
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                            // do something if the speed dial is open
                            }
                        }}
                        />
                    </Portal>
                </PaperProvider>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },
    fab: {
        position: 'absolute',
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#0000000',
    },

    casoInfoContainer: {
        position: 'absolute',
        top: 90,
        paddingLeft: 35,
        width: 345,
        zIndex: -1,
    },
    title: {
        fontWeight: 'bold',
        color: '#111E5F',
        marginBottom: 12,
        textAlign: 'left',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 6,
    },
    value: {
        fontSize: 16,
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'justify',
    },
})