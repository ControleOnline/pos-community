import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "@controleonline/ui-login/src/react/pages/sign-in/index";
import HomePage from "@controleonline/ui-shop/src/react/pages/home/index";
import OrdersPage from "@controleonline/ui-orders/src/react/pages/orders/sales/index";
import OrderDetails from "@controleonline/ui-orders/src/react/pages/orders/sales/orderDetails";
import AddProductToOrder from "@controleonline/ui-products/src/react/components/products/addProductToOrder";
import Checkout from "@controleonline/ui-orders/src/react/components/checkout/index";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignInPage"
                component={SignInPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{ headerShown: false, title: 'Menu' }}
            />
            <Stack.Screen
                name="SalesOrdersPage"
                component={OrdersPage}
                options={{ headerShown: true, title: 'Pedidos de Venda', headerBackButtonMenuEnabled: false }}
            />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{ headerShown: true, title: 'Detalhes do pedido' }}
            />
            <Stack.Screen
                name="AddProductToOrder"
                component={AddProductToOrder}
                options={{ headerShown: true, title: 'Adicionar Produto ao Pedido' }}
            />
            <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{ headerShown: true, title: 'Forma de Pagamento' }}
            />

        </Stack.Navigator>
    );
}