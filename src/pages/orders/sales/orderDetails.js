import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../styles/global";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductsList from '../../../components/products/index'
import api from "../../../utils/axiosInstance";
import DefaultModal from "../../../components/default/modal/index";
import { useState } from "react";
import AddProductToOrder from "../../../components/products/addProductToOrder";

export default OrderDetails = ({ route, props }) => {

    const [visibleModal, setVisibleModal] = useState(false);
    const [isVisibleAddProductToOrder, setIsVisibleAddProductToOrder] = useState(false);

    const handleAddProduct = async () => {
 
        setIsVisibleAddProductToOrder(true);   
    }

    if(isVisibleAddProductToOrder){
        return (
            <AddProductToOrder orderId={route.params.orderId}/>
        );  
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