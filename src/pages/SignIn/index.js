import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import * as Animatable from 'react-native-animatable';
import api from "../../utils/axiosInstance";

export default function SignIn( { navigation } ) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        const payload = {
            username: username,
            password: password
        };

        api.post('/token', payload)
        .then(response => {
            if(response.status === 200 && response.data){
                // localStorage.setItem('userData', JSON.stringify(response.data));
                navigation.navigate('Orders');

            }else{
                console.log('Erro ao realizar login');
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
 
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.wrapHeaderLogin}>        
                <Text style={ styles.headerLoginTitle }>Bem-vindo(a)</Text>
            </Animatable.View>
  

            <Animatable.View animation="fadeInUp" delay={600} style={ styles.containerLogin }>

                <TextInput
                    style={ styles.textInput }
                    placeholder="Usuário"
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={ styles.textInput }
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.boxLoginButton} onPress={handleSignIn}>
                    <Text style={ styles.boxLoginButtonText }>
                        Acessar
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B5587',
        justifyContent: 'center',
    },
    wrapHeaderLogin: {   
        paddingStart: '5%',
        marginTop:'14%',
        marginBottom: '8%',            
    },
    headerLoginTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
    },
    containerLogin: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%', 
        paddingHorizontal: 15,
        paddingBottom: 30,
        paddingTop: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    textInput: {
        backgroundColor: '#f4f4f4',
        marginBottom: 10,
        padding: 15,
        borderRadius: 7
    },
    boxLoginButton: {
        alignItems: 'center',
        backgroundColor: '#1B5587',
        padding: 15,
        borderRadius: 7
    },
    boxLoginButtonText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff'
    }
});
