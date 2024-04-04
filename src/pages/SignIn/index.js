import React from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import * as Animatable from 'react-native-animatable';


export default function SignIn() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.View animation="flipInY" style={styles.boxLogomarca}>
                    <Image                        
                        source={require('../../assets/icon-controleoline.png')}                        
                        resizeMode="contain"
                        style={{  width: '100%' }}

                    />
                </Animatable.View>
            </View>

            <Animatable.View animation="fadeInUp" delay={600} style={ styles.containerLogin }>
                <View style={ styles.boxLoginHeader }>
                    <Text style={ styles.boxTextHeader }>Bem-vindo!</Text>
                </View>
                <TextInput
                    style={ styles.textInput }
                    placeholder="Usuário"
                />
                <TextInput
                    style={ styles.textInput }
                    placeholder="Senha"
                />
                <TouchableOpacity style={styles.boxLoginButton}>
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
    containerLogo: {   
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        marginBottom: 15              
    },
    boxLogomarca: {
        height: 200,
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 100,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center', 

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
    boxLoginHeader: {
        alignItems: 'center',
        marginBottom: 30      
    },
    boxTextHeader: {
        fontSize: 22,
        fontWeight: '700',
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
