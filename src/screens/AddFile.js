import { useState, useEffect } from "react";
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
  BackHandler,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import * as SecureStore from "expo-secure-store";
import * as DocumentPicker from "expo-document-picker";

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { URL_BASE } from "../config/URL_BASE";
import { useNavigation } from "@react-navigation/native";

const AddFile = () => {
  const navigation = useNavigation();
  //inicializar las lista para elegir las opciones
  const [listaTiposPublicacion, setListaTiposPublicacion] = useState([]);
  const [listaAutores, setListaAutores] = useState([]);

  //iniciar las variables que se enviaran al servidor
  const [titulo, setTitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [fileImg, setFileImg] = useState(null);
  const [filePdf, setFilePdf] = useState(null);
  const [materia, setMateria] = useState("");
  const [fecha_publicacion, setFechaPublicacion] = useState(new Date());
  const [tipo_publicacion, setTipo_publicacion] = useState(null);
  const [autor, setAutor] = useState(null);

  //// Variable de estado para indicar si se está seleccionando un documento
  const [isPicking, setIsPicking] = useState(false);

  const getListaTiposPublicacion = async () => {
    const url = `${URL_BASE}/gestion/lista/tiposdepublicacion/`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    setListaTiposPublicacion(response);
  };

  const getListaAutores = async () => {
    const url = `${URL_BASE}/gestion/lista/autores/`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    setListaAutores(response);
  };

  //cargar el pdf
  const handleLoadPdf = async () => {
    if (isPicking) return; // Si ya se está seleccionando un documento, no hacer nada

    try {
      setIsPicking(true); // Establece que se está seleccionando un documento

      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        cancelable: false,
      });

      if (!file.cancelled) {
        setFilePdf({
          uri: file.uri,
          type: file.mimeType,
          name: file.name,
        });
      }
    } catch (error) {
      console.log(error);
      // Maneja el error
    } finally {
      setIsPicking(false); // Establece que la selección de documento ha finalizado
    }
  };

  const handleLoadImg = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ type: "image/*" });
      setFileImg({
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //muestra una ventana para la eleccion de la fecha
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFechaPublicacion(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: fecha_publicacion,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //envia los datos al servidor
  const handleSubmit = async () => {
    const url = `${URL_BASE}/api/gestion/book/create/`;
    const miFormData = new FormData();
    miFormData.append("titulo", titulo);
    miFormData.append("imagen", fileImg);
    miFormData.append("materia", materia);
    miFormData.append(
      "fecha_publicacion",
      fecha_publicacion.toISOString().split("T")[0].toLocaleString()
    );
    miFormData.append("tipo_de_publicacion", tipo_publicacion);
    miFormData.append("pdf", filePdf);
    miFormData.append("resumen", resumen);
    miFormData.append("autor", autor);

    const token = await SecureStore.getItemAsync("token");

    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
        body: miFormData,
      });
      const response = await request.json();
      console.log(response);
      if(response.id){
        alert("Archivo creado correctamente");
        cleanFields();
      }
      if (
        Object.keys(response).length >= 1 &&
        Object.keys(response).length <= 8
      ) {
        response.titulo && alert(`Titulo: ${response.titulo}`);
        response.imagen && alert(`Imagen: ${response.imagen}`);
        response.materia && alert(`Materia: ${response.materia}`);
        response.resumen && alert(`Resumen: ${response.resumen}`);
        response.fecha_publicacion &&
          alert(`Fecha de publicacion: ${response.fecha_publicacion}`);
        response.tipo_de_publicacion &&
          alert(`Tipo de publicacion: ${response.tipo_de_publicacion}`);
        response.autor && alert(`Autor: ${response.autor}`);
        response.pdf && alert(`PDF: ${response.pdf}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  //funcion que limpia los campos
  //linea 183 (null)
  const cleanFields = () => {
    setAutor("");
    setFechaPublicacion(new Date());
    setFileImg(null);
    setFilePdf(null);
    setMateria("");
    setTipo_publicacion(null);
    setTitulo("");
    setResumen("");
    
  };

  //codigo de prueba

  //funciones que se ejecuan cuando se monta la pantalla
  useEffect(() => {
    getListaAutores();
    getListaTiposPublicacion();
  }, []);

  return (
      <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex:1,
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
              source={require("../../assets/iconos/archivo.png")}
            ></Image>
          </View>
          {/* carga de archivos pdf */}
          
            <View style={styles.containerbotonesx}>
              <TouchableOpacity
                onPress={handleLoadPdf}
                style={{width: 350}}
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#FFCC00", "#685B96", "#7A4780"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonR}
                >
                  <Text style={styles.textR}>Archivo pdf</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TextInput
                style={styles.inputBotonesx}
                editable={false}
                value={filePdf !== null && filePdf.name}
              />

              {/*  carga de imagnes  */}
              <TouchableOpacity
                style={{width: 350}}
                onPress={handleLoadImg}
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#FFCC00", "#685B96", "#7A4780"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonR}
                >
                  <Text style={styles.textR}>Imagen</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TextInput
                style={styles.inputBotonesx}
                editable={false}
                value={fileImg !== null && fileImg.name}
              />
            </View>

            <TextInput
              placeholder="Titulo"
              style={styles.input}
              label="titulo"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={titulo}
              onChangeText={(text) => {
                setTitulo(text);
              }}
            />
            

            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Resumen"
              style={styles.inputResumen}
              label="Resumen"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={resumen}
              onChangeText={(text) => {
                setResumen(text);
              }}
            />

            <TextInput
              placeholder="Categoria"
              style={styles.input}
              label="categoria"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={materia}
              onChangeText={(text) => {
                setMateria(text);
              }}
            />

            <TouchableOpacity
              style={styles.containerIN}
              onPress={showDatepicker}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>Feccha de publicacion</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.fecha}>
              Fecha:{" "}
              {fecha_publicacion.toISOString().split("T")[0].toLocaleString()}
            </Text>

            <View style={styles.seleccion}>
              <Picker
                selectedValue={tipo_publicacion}
                onValueChange={(itemValue, itemIndex) =>
                  setTipo_publicacion(itemValue)
                }
              >
                <Picker.Item
                  label="Selecciona el tipo de publicacion"
                  value={null}
                />
                {listaTiposPublicacion.map((item) => (
                  <Picker.Item
                    label={item.nombre}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker>
            </View>

            
            <View style={styles.seleccion}>
              <Picker
                selectedValue={autor}
                onValueChange={(itemValue, itemIndex) => setAutor(itemValue)}
              >
                <Picker.Item label="Selecciona el autor" value={null} />
                {listaAutores.map((item) => (
                  <Picker.Item
                    label={`${item.nombres} ${item.apellido_paterno} ${item.apellido_materno}`}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker>
            </View>


            

            <TouchableOpacity
              style={styles.containerIN}
              onPress={handleSubmit}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>Crear Archivo</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cleanFields}
              style={styles.containerIN}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>LIMPIAR</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerIN}
              onPress={() => {
                navigation.navigate("Inside");
              }}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>Cancelar</Text>
              </LinearGradient>
            </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 90,
    bottom: 40
  },
  containerbotonesx: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "90%",
    backgroundColor: "#663399",
    borderRadius: 15,
    padding:15,
  },
  inputBotonesx: {
    height: "2%",
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingStart: 10,
    padding: 10,
    marginStart: 40,
    width: 320,
    height: 50,
    right: 15,
    marginTop: 5,
  },
  buttonx: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: "47%",
    height: 50,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    height: "2%",
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingStart: 30,
    padding: 10,
    width: 300,
    height: 50,
    marginTop: 5,
    marginRight: "5%",
  },
  inputResumen: {
    height: "6%",
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingStart: 30,
    padding: 10,
    width: 300,
    height: 100,
    marginTop: 5,
    marginRight: "5%",
  },

  img: {
    width: 400,
    height: 150,
    borderWidth: 1,
    resizeMode: "contain",
    marginLeft: 5,
    marginRight: 3,
    marginBottom: 50,
    alignContent: "center",
  },

  containerR: {
    flex: 1,
    alignItems: "center",
    width: 200,
    marginTop: 100,
  },
  buttonR: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: "38%",
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
    marginTop: 7,
    marginBottom: 5,
  },
  textIN: {
    fontSize: 15,
    color: "#fff",
  },
  fecha: {
    color: "#000",
    fontSize: 20,
    marginTop: 1,
    fontWeight: "bold",
  },
  seleccion: {
    marginTop: 10,
    fontWeight: "bold",
    backgroundColor: "#FFCC00",
    width: 300,
    borderRadius: 10,
    marginBottom:15,
  },
});

export default AddFile;