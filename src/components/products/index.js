import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, SafeAreaView, ScrollView } from "react-native";
import globalStyles from "../../styles/global";

export default ProductsList = (props) => {
    const { orderId } = props;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductsByOrderId = async () => {
            setLoading(true); 
            try {
                const response = await api.fetch(`/order_products?order=${orderId}`);
                setProducts(response.data['hydra:member'].map(product => ({
                    ...product,
                    price: formatPrice(product.price),
                })));
            } catch (error) {
                console.log("Erro ao realizar no endpoint /products", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProductsByOrderId();
    }, [orderId]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    // handle to click on add product
    const handleDetailProduct = (productId) => {
        console.log('productId: ', productId);
    }

    if (loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#40b8af" />
            </View>
        );
    }

    // Retorno Products View
    return (
        <ScrollView>
            {products.map(product => (
                <TouchableOpacity key={product.id} onPress={() => handleDetailProduct(product.id)} activeOpacity={0.6} style={styles.boxWrap}>
                    <View>
                        <View style={styles.boxHeader}>
                            <Text style={[styles.boxTextColor, styles.boxOrderText]}> #{product.id}</Text>
                            <Text style={[styles.boxTextColor, styles.boxPrice]}>{product.product.product}</Text>
                        </View>
                        <View style={styles.boxContent}>
                            <Text style={[styles.boxDateText, styles.boxTextColor]}>{product.product.description}</Text>
                        </View>
                        <View style={styles.boxContent}>
                            <Text style={[styles.boxDateText, styles.boxTextColor]}>{product.product['@type']}</Text>
                            <Text style={styles.boxStatusText}>{product.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },

    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1B5587',
    },
    boxWrap: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderLeftColor: '#40b8af',
        borderLeftWidth: 7,
        elevation: 3,
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
        color: '#000000',
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
});
