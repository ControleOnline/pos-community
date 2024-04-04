import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Pages
import SignIn from "../pages/SignIn";
import Orders from "../pages/Orders";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return (    
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}