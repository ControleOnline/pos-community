import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import * as Animatable from 'react-native-animatable';
import globalStyles from "../../styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default AddProductToOrder = ({route, navigation}) => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({}); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.fetch('/products');
                setProducts(response.data['hydra:member'].map(product => ({
                    ...product,
                })));
            } catch (error) {
                console.log('Error: erro ao realizar consulta de produtos', error);
            }
        }
        fetchProducts();
    }, []);

    const handleIncrement = (productId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 1) + 1 
        }));
    }

    const handleDecrement = (productId) => {
        if (quantities[productId] && quantities[productId] > 1) {
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [productId]: prevQuantities[productId] - 1
            }));
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const addProductToOrder = async (productId, productPrice) => {
        const payload = {
            order: `orders/${route.params.orderId}`,
            product: `products/${productId}`,
            quantity: quantities[productId] || 1, 
            price: productPrice, 
            total: productPrice * (quantities[productId] || 1) 
        }
    
        try {
            const response = await api.post('/order_products', payload);
            console.log(response.data);
            if (response.data) {
                navigation.navigate('OrderDetails', { orderId: route.params.orderId });
            } else {
                console.log('Erro ao adicionar produto');
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <Animatable.View style={globalStyles.container} animation="fadeInUp">
            <ScrollView>
                {products.map(product => (
                    <View key={product.id} style={styles.itemWrap}>
                        <View style={styles.boxHeader}>
                            <Text style={[styles.boxTextColor, styles.boxOrderText]}> {product.product}</Text>
                            <Text style={[styles.boxTextColor, styles.boxPrice]}>{ formatPrice(product.price) }</Text>
                        </View>
                        <View style={styles.boxContent}>
                            <Text style={[styles.boxTextColor]}>{product.description}</Text>
                        </View>
                        <View style={styles.actionsContainer}>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => handleDecrement(product.id)}>
                                    <Icon name="remove" size={13} color="#fff" />
                                </TouchableOpacity>
                                <Text>{quantities[product.id] || 1}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => handleIncrement(product.id)}>
                                    <Icon name="add" size={13} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.addedContainer}>
                                <Icon.Button
                                    style={globalStyles.button}
                                    name="add"
                                    backgroundColor="#40b8af"
                                    onPress={() => addProductToOrder(product.id, product.price)}
                                >
                                    Adicionar
                                </Icon.Button>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    itemWrap: {
        flex: 1,
        backgroundColor: '#ffff',
        marginBottom: 15,
        elevation: 3,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1B5587',
    },
    boxHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopEndRadius: 7,
        borderTopLeftRadius: 7,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    boxContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopEndRadius: 7,
        borderTopLeftRadius: 7,
    },
    boxOrderText: {
        fontWeight: '700',
    },
    boxTextColor: {
        color: '#000000',
    },
    boxDateText: {
        color: '#000000',
        fontSize: 13,
        fontWeight: '700',
    },
    boxPrice: {
        color: '#5bbf4b',
        fontSize: 14,
        fontWeight: '700'
    },
    boxStatusText: {
        padding: 7,
        borderRadius: 20,
        fontSize: 13,
        color: '#5bbf4b',
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
