import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import globalStyles from '../../../styles/global';
import ordersStore from '@controleonline/ui-orders/src/store/orders/react';

const Orders = ({navigation}) => {
  console.log(ordersStore);
  const {state, actions, commit} = ordersStore;
  const {items, isLoading, error, columns} = state;

  useEffect(() => {
    actions.getItems({
      page: 1,
      itemsPerPage: 50,
      provider: '/people/8',
      status: [6],
    });
  }, []);

  const handlePay = orderId => {
    navigation.navigate('Checkout', {orderId: orderId});
  };

  const handleEdit = async orderId => {
    navigation.navigate('OrderDetails', {orderId: orderId});
  };

  if (isLoading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#3FB8AF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          {items.map(order => (
            <View
              key={order.id}
              activeOpacity={0.6}
              onPress={() => handleEdit(order.id)}
              style={styles.boxWrap}>
              <View>
                <View style={styles.boxHeader}>
                  <Text style={[styles.boxTextColor, styles.boxOrderText]}>
                    Pedido: #{order.id}
                  </Text>
                  <Text style={[styles.boxTextColor, styles.boxPrice]}>
                    {order.totalPrice}
                  </Text>
                </View>
                <View style={styles.boxContent}>
                  <Text style={[styles.boxDateText, styles.boxTextColor]}>
                    {order.orderDate}
                  </Text>
                  <Text style={styles.boxStatusText}>{order.status}</Text>
                </View>
              </View>

              <View style={styles.ordersAction}>
                <TouchableOpacity
                  onPress={() => handleEdit(order.id)}
                  style={[globalStyles.button, styles.btnEdit]}>
                  <Text style={styles.btnEditText}>EDITAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handlePay(order.id)}
                  style={[globalStyles.button, styles.btnPay]}>
                  <Text style={styles.textWhite}>PAGAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
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
    borderLeftColor: '#5bbf4b',
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
    fontWeight: '700',
  },
  boxStatusText: {
    padding: 7,
    borderRadius: 20,
    fontSize: 13,
    color: '#5bbf4b',
    fontWeight: '500',
  },
  ordersAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnPay: {
    backgroundColor: '#40b8af',
    flex: 1,
  },
  textWhite: {
    color: '#fff',
  },
  btnEdit: {
    backgroundColor: '#fff',
    flex: 1,
  },
  btnEditText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default Orders;
