import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-animatable";

export default function HomePage({ navigation }) {

    const handleOrders = () => {
        navigation.navigate('SalesOrdersPage');
    }
    const handleDisplays = () => {
        navigation.navigate('DisplayPage');
    }
    const handleNewDisplay = () => {
        navigation.navigate('DisplayForm');
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.wrapButton} onPress={handleOrders}>
                <Text style={styles.textButton}>Pedidos de Venda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapButton} onPress={handleDisplays}>
                <Text style={styles.textButton}>Displays</Text>
            </TouchableOpacity>
            { <TouchableOpacity style={styles.wrapButton} onPress={handleNewDisplay}>
                <Text style={styles.textButton}>Cadastrar Display</Text>
            </TouchableOpacity>}
        </View>

    );
}


const styles = StyleSheet.create({
    conatainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 30,
    },
    wrapButton: {
        backgroundColor: '#88b04b',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});