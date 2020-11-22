import React,{useEffect,useState} from 'react'
import {View,Text,ScrollView,Button,TextInput,StyleSheet,ActivityIndicator,Alert} from 'react-native'
import firebase from '../database/firebase';

import RNPickerSelect from 'react-native-picker-select';
//import { ActivityIndicator } from 'react-native-paper';

const CreateDetailScreen = (props)=>{

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
                  value={user.referencia}
            />
        );
    };
    
    
    //Los componenetes siempre van en mayuscula la primera

    const Devolver_producto = () => {
        return (
            <RNPickerSelect
            //onChangeText={(value) => handleChangeText('comentarios',value)}
            //onValueChange={(value) => handleChangeText('devolver',value)}
                //onValueChange={(value) => console.log(value)}

                onValueChange={(value) => handleChangeText('devolver',value) }
                items={[
                    { label: 'Entregar', value: 'Entregar' },
                    { label: 'mensajero', value: 'mensajero' },
                ]}
                placeholder={{
                    label: 'Escoja un item',
                  }}
                value={user.devolver}
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
                  value={user.cambio}
            />
        );
    };
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
                value={user.name}
            />
        );
    };

    //Inicializamos los valores
    const initialState={
        id:"",
        name:"",
        referencia:"",
        cambio:"",
        devolver:"",
        comentarios:"",    
    }
    //Creamos un estado para cada una de las variables del form
    const [user,setUser]=useState(initialState);

    const [loading ,setLoading]=useState(true)
    
    //console.log(props.route.params.userId)
    const getUserId =async (id)=>{
        const dbRef =firebase.db.collection('users').doc(id);
        const doc =await dbRef.get();
        // Para entender los datos
        const user=doc.data();
        console.log(user)
        
        setUser({
            //Actualizamos useState con los datos de la bd y le pasamos el id
            ...user,
            id:doc.id
        });
        setLoading(false)        
    };
    

    //La lista es para actualizar el estado sin la lista no deja tipear
    useEffect(()=>{
        getUserId(props.route.params.userId)
    },[])


        
    const handleChangeText=(name,value) =>{
        setUser({ ...user,[name]:value});
    };


    const deleteUser = async ()=>{
        //Filtramos por el id y eliminamos ese documento
        const dbRef =firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        //Navegamos a la principal
        props.navigation.navigate('CreateUserScreen')
    }


    const openConfirmationAlert =()=>{
        Alert.alert('Eliminar la peticion','¿Estas seguro?',[
            {text:'Si', onPress : () => deleteUser()},
            {text:'No', onPress : () => console.log(false)},
            
        ])
    }

    const updateUser = async ()=>{
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
        await dbRef.set({
            name: user.name,
            referencia: user.referencia,
            devolver: user.devolver,
            cambio: user.cambio,
            comentarios: user.comentarios,
            correo:user.correo,
        })
        //Devolvemos al usuario a su estado inicial
        setUser(initialState)
        props.navigation.navigate('CreateUserScreen')
    }

    if(loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }

    return (
    
        <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <p>¿Que Quieres hacer?</p>
            
            <Dropdown />
            
        </View>
        <View style={styles.inputGroup}>
            <p>Seleccciona la Referenciade de tu pedido</p>
            <Referencia />
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
            <TextInput value={user.correo}  placeholder="Correo Electronico" onChangeText={(value) => handleChangeText('correo',value)}/>
        </View>

        <View style={styles.inputGroup}>
            <TextInput value={user.comentarios} placeholder="Comentarios y observaciones" onChangeText={(value) => handleChangeText('comentarios',value)}/>
        </View>
        
        <View style={styles.inputGroup}>

            <Button  color="#19AC52" title="Actualizar" onPress={()=>updateUser()}/>

        </View>

        <View>
            <Button  color="#E37399" title="Borrar" onPress={ () => deleteUser() }/>

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
export default CreateDetailScreen