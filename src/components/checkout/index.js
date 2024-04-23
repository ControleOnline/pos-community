import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from "react-native";
import api from "../../utils/axiosInstance";
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from "../../styles/global";

import Cielo from '../../services/Cielo';

export default Checkout = ({route}) => {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState('');

    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchPaymentTypes = async () => {
            try{
                const response = await api.get('/payment_types');
                if(response.data['hydra:member']){
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
                }else{
                    setLoading(false);
                    console.log('erro ao realizar consulta.');
                }
            }catch(error) {
                throw new (error);
            } 
        }
        fetchPaymentTypes();
    }, []);

    // useEffect(() => {
    //     const fetchOrders = async () => {
    //       try {
    //         const response = await api.get(`/sales/orders/${route.params.orderId}`);
    
    //         setOrderDetails(response.data['hydra:member'].map(order => ({
    //           ...order,
    //           orderDate: new Date(order.orderDate).toLocaleDateString('pt-BR'),
    //           status: translateStatus(order.status.status),
    //           totalPrice: formatPrice(order.price)
    //         })));
    //         setLoading(false);
    //       } catch (error) {
    //         console.error('Erro ao buscar pedidos:', error);
    //         setLoading(false);
    //       }
    //     };
    
    //     fetchOrders();
    //   }, []);

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

        const selectedPaymentObj = payments.find(payment => payment.id === selectedPayment);
        
        if (selectedPaymentObj) {
            const paymentCode = selectedPaymentObj.payment_code;
            
            let items = [
                {
                  name: 'Geral',
                  quantity: 1,
                  sku: '10',
                  unitOfMeasure: 'unidade',
                  unitPrice: 10,
                },
              ];

            if (paymentCode) {
                    setResponse('Aguarde...');
                    const service = new Cielo(paymentCode, items);

                    try {
                      const data = await service.payment();
                      
                      setResponse(JSON.stringify(data, null, 2));

                      console.log(data);

                      if(data.success === true){
                        await createInvoice(data, route.params.orderId);
                      }

                    } catch (error) {
                      console.error('Erro ao processar o pagamento:', error);
                      setResponse('Erro ao processar o pagamento');
                    }

            } else {
                console.log("Payment code não encontrado para o pagamento selecionado.");
            }
        } else {
            console.log("Pagamento selecionado não encontrado.");
        }
    };

    const createInvoice = async (data, orderId) => {
        const payload = {
          dueDate: "2024-03-21",
          payer: "/people/7",
          status: "/statuses/37",
          wallet: "/wallets/3",
          paymentType: `/payment_types/${selectedPayment}`,
          price: data.paidAmount,
          receiver: "/people/8",
          order: `orders/${orderId}`
        };
    
        try {
          const response = await api.post('/invoices', payload);
          console.log("Invoice created:", response.data);
        } catch (error) {
          console.error("Error creating invoice:", error);
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
    },
    scrollV: {
        maxHeight: '70%',
    }
});
