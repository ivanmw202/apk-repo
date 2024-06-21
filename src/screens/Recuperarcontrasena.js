import { useState, useEffect } from "react";

import {
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { URL_BASE } from "../config/URL_BASE";
import Loading from "../components/Loading";
import { Alert } from 'react-native';
// alertas 
export default function Recuperarcontrasena({ navigation }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("await");
  const data = {
    email: email,
  };
  const handleClickSend = async () => {
    const url = `${URL_BASE}/api/auth/password/reset/`;
    setState("loading");
    const solicitud = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respuesta = await solicitud.json();
    respuesta.email === email
      ? (Alert.alert(
        'VERIFICACION',
        'Consulte su corrreo para el siguiente paso.',
        [
          { text: 'ACEPTAR', onPress: () => console.log('Presionado ACEPTAR') },
          
        ]
      ),
        navigation.navigate("Verificarcodigo"))
      : alert(respuesta.email);
  };
  useEffect(() => {
    setState("await");
  }, []);

  return (
    <>
      {state === "loading" && <Loading></Loading>}


      {state === "await" && (
        <ScrollView contentContainerStyle={styles.mainContainer}>
          <View style={{ backgroundColor: "#FFCC00", padding: 18 }}></View>
          <View>
            <View style={styles.containerIm}>
              <Image
                style={styles.img}
                source={require("../../assets/ITSZ/LargoB.jpg")}
              ></Image>
            </View>
            <Text style={styles.sugerencia}>Para recuperar su contraseña, por favor
            ingrese su correo institucional, con el que se registró. 
            </Text>
            <View style={styles.contenedorP}>
              <View style={styles.datos}>
                <TextInput
                  value={email}
                  onChange={(text) => setEmail(text)}
                  style={styles.input}
                  placeholder="ingrese su correo institucional"
                  onChangeText={(text) => setEmail(text)}
                ></TextInput>
                <View>
                  <TouchableOpacity
                    style={styles.container1}
                    onPress={() => handleClickSend()}
                  >
                    <LinearGradient
                      colors={["#FFCC00", "#685B96", "#7A4780"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.button}
                    >
                      <Text style={styles.textL}>Enviar</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>


          </View>
        </ScrollView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    
  },
  container1: {
    flex: 1,
    alignItems: "center",
    width: 300,
  },
  button: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: "40%",
    height: 45,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  textL: {
    fontSize: 15,
    color: "#fff",
  },

  datos: {
    marginRight: 80,
    borderWidth: 1,
    width: "85%",
    borderRadius: 15,
    padding: 10,
    paddingStart: 0,
    marginLeft: 15,
    marginRight: 15,
    height: 280,
    right: 20,
    left: 15,
  },
  contenedorP: {},
  input: {
    height: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30,
    backgroundColor: "#fff",
    paddingStart: 50,
    padding: 1,
    width: 270,
    height: 50,
    padding: 10,
    alignItems: "center",
    marginBottom: 60,
    marginTop: 50,
  },
  containerIm: {
    height:150,
    alignItems: "center",
  },
  img: {
    marginBottom: 100,
    width: 300,
    height: 80,
    borderWidth: 1,
    resizeMode: "contain",
    marginLeft: 90,
    marginRight: 90,
    alignContent: "center",
  },
  sugerencia: {
    fontSize: 14,
    marginTop: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5, // Cambiado a número
    marginLeft: 27,
    paddingStart: 3,
    padding: 10,
    width: 350,
    height: 50,
    padding: 1,
    marginTop: 5,
  }
});