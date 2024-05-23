import { useState, useEffect} from "react";
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
export default function VerificarCodigo({ navigation }) {
  const [code, setCode] = useState("");
  const [state, setState] = useState("await");
  const handleClickSend = async () => {
    const url = `${URL_BASE}/api/auth/password/reset/verify/?code=${code}`;
    setState("loading");
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    response.success && navigation.navigate("Cambiodecontrasena",{code:code});
    response.password && (alert(response.password), setState("await"));
    response.detail && (alert(response.detail), setState("await"));
  };

  useEffect(() => {
    setState("await");
   }, []);
  return (
    <>
    {state === "loading" && <Loading />}
          {state === "await" && (
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View
          style={{ backgroundColor: "#FFCC00",  padding: 18 }}
        ></View>
        <View>
          <View style={styles.containerIm}>
            <Image
              style={styles.img}
              source={require("../../assets/ITSZ/LargoB.jpg")}
            ></Image>
          </View>
          
          
            <View style={styles.contenedorP}>
              <View style={styles.datos}>
                <TextInput
                  value={code}
                  onChange={(text) => setCode(text)}
                  style={styles.input}
                  placeholder="ingrese el codigo de recuperacion"
                  onChangeText={(text) => setCode(text)}
                ></TextInput>
                <View>
                  <TouchableOpacity
                    style={styles.container1}
                    onPress={handleClickSend}
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
    flex:1,
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
    marginHorizontal: 50,
    length: 20,
    right: 80,
  },
  img: {
    marginBottom: 100,
    width: 280,
    height: 80,
    borderWidth: 1,
    resizeMode: "contain",
    marginLeft: 70,
    marginRight: 90,
    alignContent: "center",
  },
});