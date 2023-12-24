import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "screens/Home";
import Product from "screens/Product";

const Routes: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
};

export default Routes;
