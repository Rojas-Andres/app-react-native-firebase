import React ,{useState} from 'react'
//import { Component } from 'react';
import {View,Button,TextInput,ScrollView,StyleSheet,Text} from 'react-native'
//import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import RNPickerSelect from 'react-native-picker-select';

import firebase from '../database/firebase'

//https://www.npmjs.com/package/react-native-picker-select
const UserList = (props)=>{
    
    const Dropdown = () => {
        return (
            <RNPickerSelect
                onValueChange={(value) => handleChangeText('name',value)}
                items={[
                    { label: 'Devolver producto', value: 'Devolver' },
                    { label: 'Cambiar el producto', value: 'Cambiar' },
                ]}
                placeholder={{
                    label: 'Escoja un item',
                  }}
                value={state.name}
            />
        );
    };

    const [state,setState] = useState({
        name:"",
        referencia:"",
        cambio:"",
        devolver:"",
        comentarios:"",
    });
    
    const handleChangeText=(name,value) =>{
        setState({ ...state,[name]:value});
    };

    const SaveNewUser= async () =>{
        if (state.name ==='' || state.referencia ==='' || state.cambio ==='' || state.devolver ===''  ){
            alert("Algun campo que no es comentario esta vacio")
        }
        else{
            console.log(state)
            await firebase.db.collection('users').add({
                name: state.name,
                referencia: state.referencia,
                devolver: state.devolver,
                cambio: state.cambio,
                comentarios: state.comentarios,
                correo:state.correo,
            })
            //Cuando termina lo que hace es redirreccionar a CreateUserScreen.js
            props.navigation.navigate('CreateUserScreen');
        }
    };
    

    
    const Referencia = () => {
        return (
            <RNPickerSelect
                onValueChange={(value) => handleChangeText('referencia',value)}
                items={[
                    { label: 'HWEDAS', value: 'HWEDAS' },
                    { label: 'PQEQPWEQWE', value: 'DASDASD' },
                ]}
                placeholder={{
                    label: 'Escoja un item',
                  }}
                //Actualizamos el estado
                  value={state.referencia}
            />
        );
    };
    
    
    //Los componenetes siempre van en mayuscula la primera
    
    const itemsTest = [
        { label: "Entregar", value: 'entregar' },
        { label: "Mensajero", value: 'mensajero'},

        
    ]
    

    //Probando
    //const productos = [];
    const ConexionDb = () => {
    //function ConexionDb(){         
        const productos = [];
        firebase.db.collection('productos').onSnapshot((querySnapshot) => {

            querySnapshot.docs.forEach( (doc) => {
                //console.log(doc.data())
                //Insertamos los documentos en el arreglo
                
                const { nombre,referencia } = doc.data();
                
                //console.log(doc.data())
                console.log("coma sheet")
                const val={label:nombre,value:referencia}
                //console.log(val)
                productos.push(val);
                
                console.log(productos)
                //return(productos)

            });
            //console.log(productos)
        },[{}]);
        //console.log(productos)
        //return([{1:"2"}])
        //console.log(productos)
        return(productos)
    }


    //const val=[]
    //val.push({label:"asdas",value:1222})
    //console.log(val)
    //const productos = ConexionDb()
    //const valores = ConexionDb()
    //console.log("entonces que es")
    //console.log(productos)
    //productos.push({label:"sdasd",value:"callese"})
    //onsole.log("Que se calle")
  
    //console.log(valores)
    ///valores.pop()
    const Devolver_producto = () => {
        
        console.log("ejjejejeje")
        //console.log(productos)
        //console.log(itemsTest)
        
        const valores =  ConexionDb()
        console.log(valores)

        return (
            <RNPickerSelect
            //onChangeText={(value) => handleChangeText('comentarios',value)}
            //onValueChange={(value) => handleChangeText('devolver',value)}
                //onValueChange={(value) => console.log(value)}
                
                onValueChange={(value) => handleChangeText('devolver',value) }
                items={itemsTest}
                /*
                items={[
                    { label: 'Entregar', value: 'Entregar' },
                    { label: 'mensajero', value: 'mensajero' },
                ]}
                */
                placeholder={{
                    label: 'Escoja un item',
                  }}
                  //Actualizamos el estado
                value={state.devolver}
            />
        );
    };
    
    const Cambio = () => {
        return (
            <RNPickerSelect
                onValueChange={(value) => handleChangeText('cambio',value)}
                items={[
                    { label: 'Acer', value: 'Acer' },
                    { label: 'Lenovo', value: 'Lenovo' },
                    { label: 'Asus', value: 'Asus' },
                    
                ]}
                placeholder={{
                    label: 'Escoja un item',
                  }}
                //Actualizamos el estado
                value={state.cambio}
            />
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <p>¿Que Quieres hacer?</p>
                
                <Dropdown onValueChange={(value) => handleChangeText('name',value)} />
                
            </View>
            <View style={styles.inputGroup}>
                <p>Seleccciona la Referenciade de tu pedido</p>
                <Referencia onValueChange={(value) => handleChangeText('referencia',value)}/>
            </View>

            <View style={styles.inputGroup}>
                <p>Seleccciona el producto al cambio o devolucion</p>
                <Cambio />
            </View>

            <View style={styles.inputGroup}>
                <p>Como quiere devolver el producto</p>
                <Devolver_producto />
            </View>



            <View style={styles.inputGroup}>
                <TextInput placeholder="Correo Electronico" onChangeText={(value) => handleChangeText('correo',value)}/>
            </View>

            <View style={styles.inputGroup}>
                <TextInput placeholder="Comentarios y observaciones" onChangeText={(value) => handleChangeText('comentarios',value)}/>
            </View>
            
            <View>
                <Button title="Enviar" onPress={()=>SaveNewUser()}/>
            </View>

        </ScrollView>
    )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:50,
        borderBottomWidth:1,
        borderBottomColor:"#ccccc"
    }
})

export default UserList