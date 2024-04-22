import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import globalStyles from "../../../styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductsList from '../../../components/products/index';

export default OrderDetails = ({ route, navigation }) => {
    const [orderId, setOrderId] = useState(route.params.orderId);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRefreshKey(prevKey => prevKey + 1);
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        setOrderId(route.params.orderId);
    }, [route.params.orderId]);

    const handleAddProduct = async () => {
        navigation.navigate('AddProductToOrder', { orderId });
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.boxHeader}>
                <Text style={styles.boxTitleText}>Lista de Produtos</Text>
                <Icon.Button
                    style={globalStyles.button}
                    name="add"
                    backgroundColor="#40b8af"
                    onPress={handleAddProduct}
                >
                    Adicionar
                </Icon.Button>
            </View>
            <ProductsList key={refreshKey} orderId={route.params.orderId} />
        </View>
    );
}

const styles = StyleSheet.create({
    boxHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    boxTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonAdd: {
        backgroundColor: '#FF0000',
        padding: 10,
        alignItems: 'center',
    }
});
