import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack'

// Es un contenedor de multiples pantallas
// En react native son pantallas no paginas como lo es en una app web
// 
/* 
React Navigation npm install @react-navigation/native  -> multiples pantallas
Documentacion
https://reactnavigation.org/docs/getting-started/
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

*/
const Stack = createStackNavigator() // Este contiene toda nuestra navegacion
//Stack.Screen = Una pantalla nueva


// Importamos los componentes -> las navegaciones

import CreatePeticion from './screens/CreatePeticion'
import CreateUserScreen from './screens/CreateUserScreen'
import CreateDetailScreen from './screens/CreateDetailScreen'

function MyStack(){
  return( 
  <Stack.Navigator>
    <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{title:'Peticiones realizadas'}} /> 
    <Stack.Screen name="CreatePeticion" component={CreatePeticion} options={{title:'Crear Peticion'}}/> 
    <Stack.Screen name="CreateDetailScreen" component={CreateDetailScreen} options={{title:'Actualizar o Eliminar peticion'}}/> 
  </Stack.Navigator>
  )
}

export default function App() {
  // MyStack es el componente creado con anterioridad para las navegaciones 
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
