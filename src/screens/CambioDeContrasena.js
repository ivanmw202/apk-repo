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
    TouchableWithoutFeedback,
  } from "react-native";
  import { URL_BASE } from "../config/URL_BASE";
  import { useState } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import { Alert } from 'react-native';
  // alertas 
  export default function CambioDeContrasena({ navigation, route }) {
    const code = route.params.code;
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
  
    //show password
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
      setShowPassword2(!showPassword2);
    };
  
    const handleClickChange = async () => {
      const url = `${URL_BASE}/api/auth/password/reset/verified/`;
      console.log(url);
      if (password1.trim() !== "" && password2.trim() !== "") {
        if (password1 === password1) {
          const data = {
            code: code,
            password: password1,
          };
          const request = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const response = await request.json();
          console.log(response);
          response.success &&
            (Alert.alert(
              'CAMBIO EXITOSO',
              'Se cambio la contraseña con exito.',
              [
                { text: 'ACEPTAR', onPress: () => console.log('Presionado ACEPTAR') },
                
              ]
            ),
            navigation.navigate("Login"));
          response.password && alert(response.password);
          response.detail && alert(response.detail);
        } else {
          
          alert("las contraseñas no coinciden");
        }
      } else {
        alert("ingrese una contraseña");
      }
    };
    return (
      <>
        <ScrollView contentContainerStyle={styles.mainContainer}>
          <View style={{ backgroundColor: "#FFCC00", padding: 18 }}></View>
  
          <View style={styles.containerImg}>
            <Image
              style={styles.img}
              source={require("../../assets/ITSZ/LargoB.jpg")}
            ></Image>
          </View>
          <Text style={styles.titulo}>RESTABLEZCA SU NUEVA CONTARSEÑA.</Text>
  
          <View style={styles.contenedorP}>
            
  
            <View style={styles.datos}>
              <TextInput
                style={styles.input}
                value={password1}
                placeholder="ingrese su nueva contraseña"
                onChangeText={(text) => setPassword1(text)}
                secureTextEntry={!showPassword}
              ></TextInput>
              <TextInput
                value={password2}
                style={styles.input1}
                secureTextEntry={!showPassword2}
                placeholder="confrime su contraseña"
                onChangeText={(text) => setPassword2(text)}
              ></TextInput>
              <TouchableWithoutFeedback onPress={toggleShowPassword}>
                <View style={{ position: "absolute", right: 33, top: 70 }}>
                  <Image
                    style={styles.ojo}
                    source={require("../../assets/iconos/contraseña.png")}
                  ></Image>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={toggleShowPassword2}>
                <View style={{ position: "absolute", right: 33, top: 150 }}>
                  <Image
                    style={styles.ojo}
                    source={require("../../assets/iconos/contraseña.png")}
                  ></Image>
                </View>
              </TouchableWithoutFeedback>
  
              <View>
                <TouchableOpacity
                  style={styles.container1}
                  onPress={handleClickChange}
                >
                  <LinearGradient
                    colors={["#FFCC00", "#685B96", "#7A4780"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}
                  >
                    <Text style={styles.textL}>GUARDAR</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
  const styles = StyleSheet.create({
    ojo: {
      width: 30,
      height: 30,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    container1: {
      flex: 1,
      alignItems: "center",
      width: 100,
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
      width: "92%",
      borderRadius: 15,
      padding: 10,
      paddingStart: "5%",
      marginLeft: "1%",
      marginRight: "1%",
      height: "60%",
      right: "3%",
      left: "3%",
    },
   
    input: {
      height: 20,
      margin: 20,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 30,
      backgroundColor: "#fff",
      paddingStart: 50,
      padding: 1,
      width: "90%",
      height: 50,
      padding: 10,
      alignItems: "center",
      marginBottom: 30,
      marginTop: 50,
    },
    input1: {
      height: 20,
      margin: 20,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 30,
      backgroundColor: "#fff",
      paddingStart: 50,
      padding: 1,
      width: "90%",
      height: 50,
      padding: 10,
      alignItems: "center",
      marginBottom: 15,
      marginTop: 0,
    },
    containerImg: {
      marginHorizontal: 50,
      length: 20,
      right: 80,
      color:'#000',
    },
    titulo: {
      color: "#000",
      fontSize: 20,
      marginTop: 1,
      fontWeight: "bold",
      marginLeft: "5%",
      marginBottom:"25%"
    },
    img: {
      marginBottom: 100,
      width: 280,
      height: 80,
      borderWidth: 1,
      resizeMode: "contain",
      marginLeft: 70,
      marginRight: 90,
     
    },
    contenedorP: {
      backgroundColor: "#fff",
    },
  });