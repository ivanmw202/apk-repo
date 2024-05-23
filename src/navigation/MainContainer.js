import React from "react";
import { View, Text } from "react-native";

//imports necesarios para la navegacion
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import de las pantallas que tenemos
import LoginScreen from "../screens/LoginScreen";
import InsideContainer from "./InsideContainer";
import RegisterScreen from "../screens/RegisterScreen";
import BookDetail from "../screens/BookDetail";
import RecuperarContrasena from "../screens/Recuperarcontrasena";
import CambioDeContrasena from "../screens/CambioDeContrasena";
import VerificarCodigo from "../screens/VerificarCodigo"
import RegisterVerify from "../screens/RegisterVerify";
import AddFile from "../screens/AddFile";
import AddAutor from "../screens/AddAutor"

const Stack = createNativeStackNavigator();

const MainContainer = () => {
    //crea una pila de todas las pantallas a las que se puede navegar
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
    
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
            name="Inside"
            component={InsideContainer}
            options={{ headerShown: false }}
          />
        <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterVerify"
            component={RegisterVerify}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={BookDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Recuperarcontrasena"
            component={RecuperarContrasena}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cambiodecontrasena"
            component={CambioDeContrasena}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verificarcodigo"
            component={VerificarCodigo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddFile"
            component={AddFile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddAutor"
            component={AddAutor}
            options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;