import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Pages
import SignInPage from "../pages/SignIn/index";
import HomePage from "../pages/home/index";
import OrdersPage from "../pages/orders/index";

const Stack = createNativeStackNavigator();

export default function Routes(){
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
                options={{ headerShown: true, title: 'Menu' }}
            />
            <Stack.Screen
                name="OrdersPage"
                component={OrdersPage}
                options={{ headerShown: true, title: 'Pedidos de Venda', headerBackButtonMenuEnabled: false }}
            />
        </Stack.Navigator>
    );
}