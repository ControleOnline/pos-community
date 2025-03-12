import {createNativeStackNavigator} from '@react-navigation/native-stack';
import loginRoutes from '@controleonline/ui-login/src/react/router/routes';
import shopRoutes from '@controleonline/ui-shop/src/react/router/routes';
import ordersRoutes from '@controleonline/ui-orders/src/react/router/routes';
import productsRoutes from '@controleonline/ui-products/src/react/router/routes';

const Stack = createNativeStackNavigator();

const allRoutes = [
  ...loginRoutes,
  ...shopRoutes,
  ...ordersRoutes,
  ...productsRoutes,
];

export default function Routes() {
  return (
    <Stack.Navigator>
      {allRoutes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  );
}
