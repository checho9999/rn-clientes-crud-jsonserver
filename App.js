
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import BarraSuperior from './components/ui/BarraSuperior';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//React Native Paper
import { DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

//aqui tendremos todos los metodos para la navegacion tipo Stack
const Stack = createStackNavigator(); 

//Definimos el tema...DefaultTheme.colors tomamos toda la copia de colors y reescribimos con primary el objeto colors
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF' 
  }
}

//console.log(theme);
//console.log(theme.colors);

//Cada hijo de Stack.Navigator equivaldria a una pagina o componente
//initialRouteName es para especificar la pagina inicial de la aplicacion por defecto
//el screenOptions(Stack.Navigator) es para darte estilo global al header...
//el options(Stack.Screen) es para darle estilo personalizado a cada componente
const App = () => {
  return (
    <>
    <PaperProvider>

      <NavigationContainer>

        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center'
          }}        
        >       

          <Stack.Screen
            name='Inicio'
            component={Inicio}
            options={ ( { navigation, route } ) => ({/*
              headerLeft: ( props ) => <BarraSuperior {...props}
                                                      navigation={navigation}
                                                      route={route}
                                       />*/
            })}
          />

          <Stack.Screen
            name='NuevoCliente'
            component={NuevoCliente}
            options={{
              title: 'Nuevo Cliente'
            }}
          />

          <Stack.Screen
            name='DetallesCliente'
            component={DetallesCliente}
            options={{
              title: 'Detalles Cliente'
            }}

          />                    

        </Stack.Navigator>

      </NavigationContainer>

    </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;