import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductsList from '../../../components/products/index'
import api from "../../../utils/axiosInstance";

export default OrderDetails = ({ route, props }) => {

    const handleAddProduct = async () => {
        const payload = {
            order: '/orders/63730',
            product: "/products/1",
            quantity: 1,
            price: 0,
            total: 0
        }

        const response = await api.post('/order_products/' + route.params.orderId, payload);
        try {
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
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

            <ProductsList orderId={route.params.orderId} />
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