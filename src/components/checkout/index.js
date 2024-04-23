import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../../utils/axiosInstance";
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from "../../styles/global";

export default Checkout = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {
        const fetchPaymentTypes = async () => {
            try{
                const response = await api.get('/payment_types');
                if(response.data['hydra:member']){
                    setPayments(response.data['hydra:member'].map(payment => ({
                        ...payment,
                    })));
                }else{
                    console.log('erro ao realizar consulta.');
                }
            }catch(error) {
                throw new (error);
            } 
        }
        fetchPaymentTypes();
    }, []);

    const selectPayment = (paymentId) => {
        setSelectedPayment(paymentId);
    };

    return (
        <View style={globalStyles.container}>
            {payments.map(payment => (
                <TouchableOpacity key={payment.id} onPress={() => selectPayment(payment.id)}>
                    <View style={[styles.boxPayment, selectedPayment === payment.id && styles.selectedBoxPayment]}>
                        <View style={styles.paymentIcon}>
                            {selectedPayment === payment.id ? <Icon name="check-box" size={24} color="black" /> : <Icon name="check-box-outline-blank" size={24} color="black" />}
                        </View>
                        <View>
                            <Text>{payment.paymentType}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}

            <View style={styles.boxInfos}>
                <View style={styles.infos}>
                    <Text style={styles.infoText}>Total</Text>
                    <Text style={styles.infoText}>R$ 55,90</Text>
                </View>
            </View>

            <View style={styles.boxAction}>
                <TouchableOpacity style={[globalStyles.button, styles.btnPay]}>
                    <Text style={styles.btnText}>PAGAR</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    boxPayment: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 7,
        elevation: 3,
    },
    selectedBoxPayment: {
        backgroundColor: '#f5f5f5',
    },
    paymentIcon: {
        width: 24,
        marginRight: 10,
    },
    boxInfos: {
        padding: 20,
        marginVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    infos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnPay: {
        backgroundColor: '#000000',
        borderRadius: 7,
        padding: 15,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
