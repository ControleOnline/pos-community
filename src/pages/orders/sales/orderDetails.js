import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductsList from '../../../components/products/index'
import api from "../../../utils/axiosInstance";

export default OrderDetails = ({ route, props }) => {

    const handleAddProduct = async () => {
        const payload = {
            order: '63730',
            product: "1",
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
            <View >
                <Icon.Button
                    style={styles.btnADD}
                    name="add"
                    backgroundColor="#40b8af"
                    onPress={handleAddProduct}
                >
                    Adicionar Produto
                </Icon.Button>


            </View>
            <View style={styles.boxTitle}>
                <Text style={styles.boxTitleText}>Lista de Produtos</Text>
            </View>

            <ProductsList orderId={route.params.orderId} />
        </View>
    );
}

const styles = StyleSheet.create({
    btnADD: {
        padding: 15,
    },
    boxTitle: {
        paddingVertical: 10,
    },
    boxTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonAdd: {
        backgroundColor: '#FF0000',
        padding: 10,
        alignItems: 'center',
    }
});