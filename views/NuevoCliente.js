import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, TextInput, Headline, Portal, Dialog, Paragraph } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ( { navigation, route } ) => {   
    //console.log(route.params)
    //Recibimos la funcion guardarConsultarAPI desde el componente de Inicio        
    const { guardarConsultarAPI } = route.params;

    //Definimos el state de los campos de formulario
    const [ nombre, guardarNombre ] = useState('');
    const [ telefono, guardarTelefono ] = useState('');
    const [ correo, guardarCorreo ] = useState('');
    const [ empresa, guardarEmpresa ] = useState('');
    //Definimos el state de la alerta
    const [ alerta, guardarAlerta ] = useState(false);

    //Monitoreamos si se trata de un nuevo cliente o de la edicion de uno ya existente
    useEffect(() => {        
        if(route.params.cliente) {
            //console.log('Estamos editando un cliente')
            //Extraemos los datos del cliente
            const { nombre, telefono, correo, empresa, id } = route.params.cliente;

            //Actualizamos el state para autocompletar todo los campos del formulario
            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo);
            guardarEmpresa(empresa);            
        }
        //else {
        //    console.log('Estamos creando un cliente')
        //}
    }, [])

    //Creamos un nuevo cliente y lo guardamos en la base de datos
    const guardarCliente = async () => {
        //Validamos los datos introducidos por el usuario
        if (nombre.trim() === '' || telefono.trim() === '' ||
           correo.trim() === '' || empresa.trim() === '')
        {
            //Mostramos una alerta con Portal(React Native Paper) para el caso de que falle la validacion
            guardarAlerta(true);
            return;
        }              
        //console.log('guardamos el cliente');  

        //Creamos el objeto con los datos del cliente
        const cliente = { nombre, telefono, correo, empresa }
        //console.log(cliente);

        //Editamos un cliente exitente en la base de datos de la API
        if(route.params.cliente) {
            //console.log('Estamos editando un cliente')
            //Extraemos el dato del id del cliente
            const { id } = route.params.cliente
            //Al objeto cliente le agregamos el id antes extraido
            cliente.id = id;

            //Editamos un cliente existente en la base de datos de la API
            try {
                if (Platform.OS === 'ios'){
                    //Para IOS
                    await axios.put(`http://localhost:3000/clientes/${id}`, cliente);            
    
                }
                else{
                    //Para Android
                    //console.log('Android')
                    await axios.put(`http://10.0.2.2:3000/clientes/${id}`, cliente);
                }
            }
            catch(error) {
                console.log(error);
            }
         
        }
        else {
            //Insertamos el cliente en la base de datos de la API
            try {
                if (Platform.OS === 'ios'){
                    //Para IOS
                    await axios.post('http://localhost:3000/clientes', cliente);            

                }
                else{
                    //Para Android
                    //console.log('Android')
                    await axios.post('http://10.0.2.2:3000/clientes', cliente);
                }
            }
            catch(error) {
                console.log(error);
            }

        }

        //Redireccionamos hacia el componente de Inicio
        navigation.navigate('Inicio');
        
        //Reseteamos el state de todos los campos del formulario
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

        //Seteamos la variable para actualizar el renderizado de la lista de 
        //clientes con el que recien se ha insertado
        guardarConsultarAPI(true);

    }

    return (

        <View style={globalStyles.contenedor}>

            <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
        
            <TextInput style={styles.input}
                label='Nombre'
                placeholder='Cesar'
                onChangeText={ texto => guardarNombre(texto) }
                value={nombre}
            />

            <TextInput style={styles.input}
                label='Telefono'
                placeholder='Cesar'
                onChangeText={ texto => guardarTelefono(texto) }
                value={telefono}
            />       

            <TextInput style={styles.input}
                label='Correo'
                placeholder='sarazaguzman@gmail.com'
                onChangeText={ texto => guardarCorreo(texto) }
                value={correo}
            />

            <TextInput style={styles.input}
                label='Empresa'
                placeholder='Apple'
                onChangeText={ texto => guardarEmpresa(texto) }
                value={empresa}
            />

            <Button icon='pencil-circle' mode='contained' 
                onPress={ () => guardarCliente() }>Guardar Cliente
            </Button> 
          
            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={ () => guardarAlerta(false) }
                >                
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={ () => guardarAlerta(false) }>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>             

        </View>          
 
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
});
 
export default NuevoCliente;
