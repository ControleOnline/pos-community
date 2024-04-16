import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Pages
import SignIn from "../pages/SignIn/index";
import Orders from "../pages/orders/index";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return (    
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Orders"
                component={Orders}
                options={{headerShown: true}}
            />
        </Stack.Navigator>
    );
}