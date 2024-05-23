import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    VirtualizedList,
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import { useState, useEffect } from "react";
  
  import { Picker } from "@react-native-picker/picker";
  
  import { URL_BASE } from "../config/URL_BASE";
  
  import * as SecureStore from "expo-secure-store";
  
  import { useNavigation } from "@react-navigation/native";
  
  const AddAutor = () => {
    const navigation = useNavigation();
    //inicializacion de los datos que se enviaran al servidor
    const [nombres, setnombres] = useState("");
    const [apellido_paterno, setapellido_paterno] = useState("");
    const [apellido_materno, setApellido_materno] = useState("");
    const [matricula, setMatricula] = useState("");
    const [asesor_interno, setAsesor_interno] = useState("");
    const [asesor_externo, setAsesor_externo] = useState("");
    const [carrera, setCarrera] = useState(null);
    const [campus, setCampus] = useState(null);
  
    //inicializar las lista de las carreras
    const [listaCarreras, setListaCarreras] = useState([]);
    const [listaCampus, setListaCampus] = useState([]);
  
    //obtener la lista de campus de la api
    const getListaCampus = async () => {
      const url = `${URL_BASE}/api/gestion/lista/campus/`;
      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      setListaCampus(response);
    };
  
    //obtener la lista de carreras de la api
    const getListaCarreras = async () => {
      const url = `${URL_BASE}/api/gestion/lista/carreras/`;
      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      setListaCarreras(response);
    };
  
    //envia los datos a la api en formato JSON
    const handleSubmit = async () => {
      const token = await SecureStore.getItemAsync("token");
      const data = {
        archivos: [],
        nombres: nombres,
        apellido_paterno: apellido_paterno,
        apellido_materno: apellido_materno,
        matricula: matricula,
        asesor_interno: asesor_interno,
        asesor_externo: asesor_externo,
        carrera: carrera,
        campus: campus,
      };
      const url = `${URL_BASE}/api/gestion/autor/create/`;
      const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      const response = await request.json();
      console.log(response);
      if (response.id) {
        clearFields();
        alert("Autor creado correctamente");
      }
      response.id && alert("Autor creado correctamente");
  
      if (
        Object.keys(response).length >= 1 &&
        Object.keys(response).length <= 8
      ) {
        response.matricula && alert(`Matricula: ${response.matricula}`);
        response.nombres && alert(`Nombres: ${response.nombres}`);
        response.apellido_paterno &&
          alert(`Apellido Paterno: ${response.apellido_paterno}`);
        response.apellido_materno &&
          alert(`Apellido Materno: ${response.apellido_materno}`);
        response.asesor_interno &&
          alert(`Asesor interno: ${response.asesor_interno}`);
        response.asesor_externo &&
          alert(`Asesor externo: ${response.asesor_externo}`);
        response.carrera && alert(`Carrera: ${response.carrera}`);
        response.campus && alert(`Campus: ${response.campus}`);
      }
    };
    const clearFields = () => {
      setnombres("");
      setapellido_paterno("");
      setApellido_materno("");
      setCampus(null);
      setCarrera(null);
      setMatricula("");
      setAsesor_externo("");
      setAsesor_interno("");
    };
  
    //cuando se monta la pantalla se realiza las siguintes funciones
    useEffect(() => {
      getListaCampus();
      getListaCarreras();
    }, []);
  
    return (
      <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "#FFCC00",
              flex: 1,
              padding: 18,
              width: 400,
            }}
          ></View>
          <View>
            <Image
              style={styles.img}
              source={require("../../assets/iconos/autor.png")}
            ></Image>
          </View>
            <TextInput
              placeholder="Nombre(s)"
              style={styles.input}
              label="nombres"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={nombres}
              onChangeText={(text) => setnombres(text)}
            />
            <TextInput
              placeholder="Apellido Paterno"
              style={styles.input}
              label="apellido_paterno"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={apellido_paterno}
              onChangeText={(text) => setapellido_paterno(text)}
            />
            <TextInput
              placeholder="Apellido Materno"
              style={styles.input}
              label="Apellido_paterno"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={apellido_materno}
              onChangeText={(text) => setApellido_materno(text)}
            />
            <TextInput
              placeholder="Matricula"
              style={styles.input}
              label="Matricula"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={matricula}
              onChangeText={(text) => setMatricula(text)}
            />
            <TextInput
              placeholder="Asesor Interno"
              style={styles.input}
              label="Email"
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              value={asesor_interno}
              onChangeText={(text) => setAsesor_interno(text)}
            />
            
           
              
  
            <View style={styles.seleccion}>
              <Picker
                selectedValue={carrera}
                onValueChange={(itemValue, itemIndex) => setCarrera(itemValue)}
              >
                <Picker.Item label="Selecciona una carrera" value={null} />
                {listaCarreras.map((item) => (
                  <Picker.Item label={item.nombre} value={item.id} key={item.id} />
                ))}
              </Picker>
            </View>
            <View style={styles.seleccion}>
              <Picker
                selectedValue={campus}
                onValueChange={(itemValue, itemIndex) => setCampus(itemValue)}
              >
                <Picker.Item label="Selecciona un campus:" value={null} />
                {listaCampus.map((item) => (
                  <Picker.Item label={item.nombre} value={item.id} key={item.id} />
                ))}
              </Picker>
            </View>
  
            <TouchableOpacity style={styles.containerR} onPress={handleSubmit}>
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonR}
              >
                <Text style={styles.textR}>AGREGAR AUTOR</Text>
              </LinearGradient>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.containerR} onPress={clearFields}>
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonR}
              >
                <Text style={styles.textR}>LIMPIAR</Text>
              </LinearGradient>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.containerIN}
              onPress={() => {
                navigation.navigate("Admin");
              }}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>CANCELAR</Text>
              </LinearGradient>
            </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
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
      marginTop: 5,
    },
  
    Button: {
      marginTop: 10,
    },
    container: {
      flex: 1,
      backgroundColor: "#f1f1f1",
      alignItems: "center",
      justifyContent: "center",
    },
    img: {
      width: 400,
      height: 150,
      borderWidth: 1,
      resizeMode: "contain",
      marginLeft: 20,
      marginRight: 45,
      marginBottom: 50,
      marginTop: 10,
      alignContent: "center",
    },
  
    containerR: {
      flex: 1,
      alignItems: "center",
      width: 400,
    },
    buttonR: {
      margin: 100,
      borderWidth: 1,
      borderColor: "#fff",
      width: "47%",
      height: 50,
      borderRadius: 30,
      padding: 10,
      alignItems: "center",
      marginTop: 0,
      marginBottom: 10,
    },
    textR: {
      fontSize: 15,
      color: "#fff",
    },
  
    containerIN: {
      flex: 1,
      alignItems: "center",
      width: 400,
    },
    buttonIN: {
      margin: 100,
      borderWidth: 1,
      borderColor: "#fff",
      width: "47%",
      height: 50,
      borderRadius: 30,
      padding: 10,
      alignItems: "center",
      marginTop: 0,
      marginBottom: 0,
    },
    textIN: {
      fontSize: 15,
      color: "#fff",
    },
    dropdownContainer: {
      height: 40,
      width: 200,
    },
    dropdown: {
      backgroundColor: "#fafafa",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
    },
    dropdownItem: {
      justifyContent: "flex-start",
    },
    dropdownList: {
      backgroundColor: "#fafafa",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      position: "absolute",
      top: "100%",
      width: "100%",
    },
    seleccion: {
      fontWeight: "bold",
      backgroundColor: '#FFCC00',
      paddingStart: 20,
      width: 300,
      borderRadius: 10,
      marginBottom:20,
    },
  });
  
  export default AddAutor;