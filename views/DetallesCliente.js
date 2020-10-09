import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Headline, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesCliente = ( { route, navigation } ) => {
    //console.log(route.params)
    //Extraemos los datos del cliente
    const { nombre, telefono, correo, empresa, id } = route.params.item;
    //Recibimos la funcion guardarConsultarAPI desde el componente de Inicio        
    const { guardarConsultarAPI } = route.params;

    const mostrarConfirmacion = () => {
        //console.log('Confirmacion')
        Alert.alert(
            '¿Deseas eliminar este cliente?',
            'Un contacto eliminado no se puede recuperar',
            [
                { text: 'Si, eliminar', onPress: () => eliminarContacto() },
                { text: 'Cancelar', style: 'cancel' }                 
            ]
        )
    }

    //Eliminamos un cliente existente de la base de datos en la API
    const eliminarContacto = async () => {
        //console.log('Eliminando contacto')
        try{
            if (Platform.OS === 'ios'){
                //Para IOS
                const url = `http://localhost:3000/clientes/${id}`;
                await axios.delete(url);            
            }
            else{
                //Para Android
                //console.log('Android')
                const url = `http://10.0.2.2:3000/clientes/${id}`;
                await axios.delete(url);    
            }
                
        }
        catch(error) {
            console.log(error);
        }    
        
        //Redireccionamos hacia el componente Inicio
        navigation.navigate('Inicio');

        //Seteamos la variable para actualizar el renderizado de la lista de 
        //clientes con el que recien se ha eliminado
        guardarConsultarAPI(true);        

    }

    return (
        <View style={globalStyles.contenedor}>

            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
            <Text style={styles.texto}>Telefono: <Subheading>{telefono}</Subheading></Text>

            <Button style={styles.boton}
                mode='contained'
                icon='cancel'
                onPress={ () => { mostrarConfirmacion() } }
            >Eliminar Cliente</Button>

            <FAB
                icon='pencil'
                style={globalStyles.fab}
                onPress={ () => navigation.navigate('NuevoCliente', { cliente: route.params.item, guardarConsultarAPI } )}
            />            

        </View>  
        

    );
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red'
    }
});
 
export default DetallesCliente;