import React,{ useEffect,useState } from 'react'
import {View,Text,ScrollView,Button} from 'react-native'
//import { ScrollView } from 'react-native-gesture-handler'
//import { Button } from 'react-native-paper'
import firebase from '../database/firebase'
import {ListItem,Avatar} from 'react-native-elements'
//import { List } from 'react-native-paper'

//https://reactnativeelements.com/docs
const CreateUserScreen = (props)=>{
    
    const [users , setUsers] = useState([]);

    //Llamamos a la coleccion y leemos cada documento
    useEffect(() => {
        //Creamos un arreglo en donde le vamos a insertar cada uno de los documentos
        
        firebase.db.collection('users').onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.docs.forEach( (doc) => {
                //console.log(doc.data())
                //Insertamos los documentos en el arreglo
                
                const { cambio,comentarios,devolver,name,referencia,correo } = doc.data();
                
                //console.log(doc.data())
                
                users.push({
                    id: doc.id, //El id es unico en cada documento 
                    cambio,comentarios,devolver,name,referencia,correo
                });
            });
            console.log(users)

            setUsers(users)
        });
    },[]);
        

    return (
        <ScrollView>
    
            <Button title="Crear Peticion" onPress={() => props.navigation.navigate('CreatePeticion')}/>
            {
                users.map(user=>{
                    return (
                        <ListItem key={user.id} bottomDivider onPress={()=>
                        props.navigation.navigate('CreateDetailScreen',{
                            userId:user.id
                        })}>
                            <ListItem.Chevron/>
                            <Avatar 
                            source={{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',}}
                            rounded
                            />
                            <ListItem.Content>
                                <ListItem.Title>{user.correo}</ListItem.Title>
                                <ListItem.Subtitle>{user.referencia}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
            
        </ScrollView>
    );

}

export default CreateUserScreen