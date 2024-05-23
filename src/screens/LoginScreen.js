import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";

//imports de la navegacion 
import { useNavigation } from "@react-navigation/native";

//diseño
import { LinearGradient } from "expo-linear-gradient";

//almacenamiento seguro de expo
import * as SecureStore from "expo-secure-store";

//url base
import { URL_BASE } from "../config/URL_BASE";

import { Alert } from 'react-native';
// alertas 

export default function LoginScreen() {
  const navigation = useNavigation();
  const [staff, setStaff] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const emptyValidate = () => {
    if (email.trim() === "") {
      Alert.alert(
        'CAMPO VACIO',
        'correo electronico vacio',
        [
          { text: 'ACEPTAR', onPress: () => console.log('Presionado ACEPTAR') },
          
        ]
      );
    }
    if (password.trim() === "") {
      Alert.alert(
        'CAMPO VACIO',
        'campo de contraseña vacio',
        [
          { text: 'ACEPTAR', onPress: () => console.log('Presionado ACEPTAR') },
          
        ]
      );
      
    }
  };
  
  
  const onLoginPressed = async () => {
    emptyValidate();
    const url = `${URL_BASE}/api/auth/login/`;
    var data = {
      email: email,
      password: password,
    };
    const response = await fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });

    const respuesta = await response.json();
    console.log(respuesta);
    if (respuesta.email === email && respuesta.token) {
      const acountsinfo= JSON.stringify(response);

      //prueba
      await SecureStore.setItemAsync("key", acountsinfo) 
      
      
      await SecureStore.setItemAsync('token', respuesta.token);
      await SecureStore.setItemAsync('email', respuesta.email);
      respuesta.is_staff === true &&
        navigation.navigate("Inside", { staff: true });
      navigation.navigate("Inside", { staff: staff });
    } else {
      Alert.alert(
        'INCORRECTO',
        'correo electronico incorrecto.',
        [
          { text: 'ACEPTAR', onPress: () => console.log('Presionado ACEPTAR') },
          
        ]
      );
    }
    if (respuesta.detail) {
      Alert.alert(
        'INCORRECTO',
        'Contraseña incorrecta.',
        [
          { text: 'ACEPTAR', onPress: () => console.log('Presionado ACEPTAR') },
          
        ]
      );
    }
  };
  

  return (
    <>
      <View style={styles.screen}>
        <View style={styles.containerImg}>
          <Image
            style={styles.img}
            source={require("../../assets/ITSZ/LOGO.png")}
          ></Image>
        </View>

        <Text style={styles.titulo}>BIENVENIDO</Text>
        <Text styles={styles.subTitle}>
          Al repositorio del Instituto Tecnologico Superior de Zongolica.
        </Text>

        <SafeAreaView style={styles.formLogin}>
          <TextInput
            style={styles.input}
            label="Email"
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="Correo Institucional"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            label="Password"
            returnKeyType="done"
            secureTextEntry={!showPassword}
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            
          />
          <TouchableWithoutFeedback onPress={toggleShowPassword}>
            <View style={{ position: "absolute", right: 30, top: 137 }}>
              <Image
                style={styles.ojo}
                source={require("../../assets/iconos/contraseña.png")}
              ></Image>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>

        <TouchableOpacity Styles={styles.containerL} onPress={onLoginPressed}>
          <LinearGradient
            colors={["#FFCC00", "#685B96", "#7A4780"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonL}
          >
            <Text style={styles.textL}>Ingresar</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          Styles={styles.containerR}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <LinearGradient
            colors={["#FFCC00", "#685B96", "#7A4780"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonR}
          >
            <Text style={styles.textL}>Registrar</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text
          Styles={styles.containerH}
          onPress={() => {
            navigation.navigate("Recuperarcontrasena");
          }}
        >
          <Text style={styles.texth}>¿Haz olvidado tú contraseña?</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  ojo: {
    width: 30,
    height: 30,
  },
  titulo: {
    color: "#000",
    fontSize: 60,
    marginTop: -30,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#fff",
    fontSize: 40,
    marginTop: 20,
    marginBottom: 40,
    fontWeight: "bold",
    color: "gray",
  },
  olvido: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30,
    backgroundColor: "#fff",
    paddingStart: 30,
    padding: 10,
    width: 350,
    height: 50,
    padding: 10,
    marginTop: 30,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },

  img: {
    width: 270,
    height: 270,
    borderWidth: 2,
    resizeMode: "contain",
    marginLeft: 20,
    marginRight: 70,
    marginBottom: 50,
    marginTop: 10,
    alignContent: "center",
  },
  containerImg: {
    width: 300,
    height: 300,
    alignContent: "center",
  },
  button: {
    height: 200,
    width: 350,
    borderRadius: 30,
  },
  formLogin: {
    alignContent: "center",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
  },

  containerL: {
    flex: 1,
    alignItems: "center",
    width: 500,
  },
  containerR: {
    flex: 1,
    alignItems: "center",
    width: 200,
  },
  containerH: {},
  marginLeft: 20,
  marginRight: 60,
  marginTop: 50,
  marginBottom: 10,

  buttonL: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: 200,
    height: 50,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 0,
  },
  buttonR: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: 200,
    height: 50,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonh: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: "47%",
    height: 50,
    borderRadius: 30,
    padding: 1,
    alignItems: "center",
    marginTop: 15,
  },

  textL: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignItems: "center",
  },
  texth: {
    fontSize: 15,
    color: "#685B96",
    fontWeight: "bold",
    alignItems: "center",
    marginTop:0,
  },
});
