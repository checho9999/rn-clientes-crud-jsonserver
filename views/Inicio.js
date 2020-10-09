import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, FlatList } from 'react-native';
import { List, Headline, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const Inicio = ( { navigation } ) => {

    //Definimos el state para guardar la lista de clientes obtenidas desde la base de datos
    const [ clientes, guardarClientes ] = useState([])
    //Definimos el state para para habilitar o no el nuevo renderizado de la lista actualizada de clientes
    const [ consultarAPI, guardarConsultarAPI ] = useState(true)

    useEffect(() => {
        const obtenerClientesAPI = async () => {

            try{
                if (Platform.OS === 'ios'){
                    //Para IOS
                    const resultado = await axios.get('http://localhost:3000/clientes');            
                    //Acualizamos el state con la lista de clientes obtenida
                    guardarClientes(resultado.data);  
                    //Actualizamos el state para que no se vuelva a renderizar la lista de clientes                  
                    guardarConsultarAPI(false);
                }
                else{
                    //Para Android
                    //console.log('Android')
                    const resultado = await axios.get('http://10.0.2.2:3000/clientes');
                    //console.log(resultado.data);
                    //Acualizamos el state con la lista de clientes obtenida
                    guardarClientes(resultado.data);
                    //Actualizamos el state para que no se vuelva a renderizar la lista de clientes                  
                    guardarConsultarAPI(false);
                }
                    
            }
            catch(error) {
                console.log(error);
            }

        }

        if (consultarAPI) {
            obtenerClientesAPI();
        }        

    }, [ consultarAPI ])

    //Este boton de redireccion lo reemplazamos con FAB
    /*<Button icon='plus-circle' 
        onPress={ () => navigation.navigate('NuevoCliente', { guardarConsultarAPI} )}
        >Nuevo Cliente
    </Button>*/

    return (
        <View style={globalStyles.contenedor}>

            <Headline style={globalStyles.titulo}> 
                { clientes.length > 0 ? 'Clientes' : 'Aun no hay clientes' }
            </Headline>

            <FlatList
                data={clientes}
                keyExtractor={ cliente => (cliente.id).toString() }
                renderItem={ ( { item } ) => (
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                        onPress={ () => navigation.navigate('DetallesCliente', { item, guardarConsultarAPI } ) }
                    />
                )}
            />

            <FAB
                icon='plus'
                style={globalStyles.fab}
                onPress={ () => navigation.navigate('NuevoCliente', { guardarConsultarAPI } ) }
            />
            
        </View>  
    );
}

const styles = StyleSheet.create({
});
 
export default Inicio;