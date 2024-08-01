import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from "../../styles/global";
import ErrorPopup from '../default/error';
import Cielo from '../../services/Cielo';

export default Checkout = ({ route }) => {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(true);


    const [orderDetails, setOrderDetails] = useState([]);

    const [popupVisible, setPopupVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const showErrorPopup = (message) => {
      setErrorMessage(message);
      setPopupVisible(true);
    };
  
    const onClosePopup = () => {
      setPopupVisible(false);
    };

    useEffect(() => {
        const fetchPaymentTypes = async () => {
            try {
                const response = await api.fetch('/payment_types');
                if (response.data['hydra:member']) {
                    setLoading(true);
                    const filteredPayments = response.data['hydra:member'].filter(payment => (
                        ![
                            "À Vista",
                            "Mensal",

                        ].includes(payment.paymentType)
                    ))
                        .map(payment => {
                            let paymentCode;
                            switch (payment.paymentType) {
                                case 'Débito à Vista':
                                    paymentCode = 'DEBITO_AVISTA';
                                    break;
                                case 'Crédito à Vista':
                                    paymentCode = 'CREDITO_AVISTA';
                                    break;
                                case 'PIX':
                                    paymentCode = 'PIX';
                                    break;
                                case 'Crédito Parcelado - Cliente':
                                    paymentCode = 'CREDITO_PARCELADO_CLIENTE';
                                    break;
                                case 'Crédito Parcelado - Loja':
                                    paymentCode = 'CREDITO_PARCELADO_LOJA';
                                    break;
                                default:
                                    paymentCode = null;
                            }
                            return {
                                ...payment,
                                payment_code: paymentCode
                            };
                        });

                    setPayments(filteredPayments);
                    setLoading(false);
                } else {
                    setLoading(false);
                    showErrorPopup(response.data);
                }
            } catch (error) {
                showErrorPopup(error);
            }
        }
        fetchPaymentTypes();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.fetch(`/orders?id=${route.params.orderId}`);
                setOrderDetails(response.data['hydra:member'].map(order => ({ ...order })));
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const selectPayment = (paymentId) => {
        setSelectedPayment(paymentId);
    };

    if (loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#40b8af" />
            </View>
        );
    }

    const handlePay = async () => {
        let items = [];
        let totalPrice = 0;

        orderDetails.forEach(order => {
            order.orderProducts.forEach(orderProduct => {
                const name = orderProduct.product.product;
                const quantity = orderProduct.quantity;
                const sku = orderProduct.product.sku;
                const unitOfMeasure = orderProduct.product.productUnit;
                const unitPrice = Math.round(orderProduct.price * 100);
            
                items.push({
                    name: name,
                    quantity: quantity,
                    sku: sku,
                    unitOfMeasure: 'unidade',
                    unitPrice: unitPrice
                }); 
            });

            totalPrice += Math.round(order.price * 100);
        });
         
        const selectedPaymentObj = payments.find(payment => payment.id === selectedPayment);

        if (selectedPaymentObj) {
            const paymentCode = selectedPaymentObj.payment_code;

            if (paymentCode) {

                const service = new Cielo();
                try {
                    const response = await service.payment(paymentCode, items, totalPrice.toString());

                    if (response.success === true) {

                        if(response.result.code === 2){
                            showErrorPopup(response.result.reason);
                        }

                        if (response.result.code === 1){
                            showErrorPopup(response.result.reason);
                        }

                        if(response.result.code !== 1 && response.result.code !== 2) {
                            await createInvoice(response.result, route.params.orderId);
                        }

                    }else {
                        showErrorPopup(response);
                    }

                } catch (error) {
                    showErrorPopup(`Erro ao processar o pagamento: ${error}`);
                }

            } else {
                showErrorPopup("Não foi possivel localizar o parametro payment_code para esta forma de pagamento!");
            }
        } else {
            showErrorPopup("Selecione uma forma de pagamento!");
        }
    };

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    const createInvoice = async (data, orderId) => {
        const payload = {
            dueDate: getCurrentDate(),
            payer: "/people/7",
            status: "/statuses/33",
            wallet: "/wallets/4",
            paymentType: `/payment_types/${selectedPayment}`,
            price: data.paidAmount / 100,
            receiver: "/people/8",
            order: `orders/${orderId}`
        };

        try {
            const response = await api.post('/invoices', payload);

            if(response.status === 201){
                showErrorPopup(`Fatura #${response.data.id} criada com sucesso!`);
            }
            else{
                showErrorPopup(response);
            }

        } catch (error) {
            showErrorPopup(error.response.data);
        }
    };


    return (
        <View style={globalStyles.container}>
            <ScrollView style={styles.scrollV}>
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
            </ScrollView>

            <View style={styles.boxInfos}>
                <View style={styles.infos}>
                    <Text style={styles.infoText}>Total</Text>
                    <Text style={styles.infoText}>R$ 55,90</Text>
                </View>
            </View>

            <View style={styles.boxAction}>
                <TouchableOpacity onPress={() => handlePay()} style={[globalStyles.button, globalStyles.primary]}>
                    <Text style={styles.btnText}>PAGAR</Text>
                </TouchableOpacity>
            </View>

            <ErrorPopup isVisible={popupVisible} onClose={onClosePopup} errorData={errorMessage} />

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
        backgroundColor: '#ffffff',
    },
    paymentIcon: {
        width: 24,
        marginRight: 10,
    },
    boxInfos: {
        padding: 20,
        marginVertical: 20,
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
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollV: {
        maxHeight: 310,
    }
});
