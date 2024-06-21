import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { useState } from 'react';

//imports de diseño
import { LinearGradient } from 'expo-linear-gradient';

//imports de url
import { URL_BASE } from '../config/URL_BASE';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [matricula, setMatricula] = useState('');
  const [apellido_materno, setApellido_materno] = useState('');
  const [status, setStatus] = useState('failed');

  //show password
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
      setShowPassword2(!showPassword2);
  };

  const cleanInputs = () => {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirst_name('');
      setLast_name('');
      setMatricula('');
      setApellido_materno('');
  };
  const onSignupPressed = async () => {
      const url = `${URL_BASE}/api/auth/signup/`;
      const data = {
          email: email,
          password: password,
          ConfirmPassword: confirmPassword,
          first_name: first_name,
          last_name: last_name,
          matricula: matricula,
          apellido_materno: apellido_materno,
      };
      const solicitud = await fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const respuesta = await solicitud.json();
      console.log('Respuesta del backend', respuesta);
      console.log(respuesta.status);
      if (respuesta.status === 'success') {
          setStatus('success');
          navigation.navigate("RegisterVerify");
          cleanInputs();
      } else {
          setStatus('failed');
          cleanInputs();
      }
  };
  return (
      <ScrollView>
          <View style={styles.container}>
              <View style={{ backgroundColor: "#FFCC00", flex: 1, padding: 18, width: 400, }}></View>
              <View style={styles.containerImg}>
                  <Image
                      style={styles.img}
                      source={require('../../assets/ITSZ/LOGO.png')}></Image>
              </View>
              <SafeAreaView>
                  <TextInput
                      placeholder="Nombre"
                      style={styles.input}
                      label="first_name"
                      autoCapitalize="none"
                      value={first_name}
                      onChangeText={(text) => setFirst_name(text)}
                  />
                  <TextInput
                      placeholder="Apellido Paterno"
                      style={styles.input}
                      label="Last_name"
                      autoCapitalize="none"
                      value={last_name}
                      onChangeText={(text) => setLast_name(text)}
                  />
                  <TextInput
                      placeholder="Apellido Materno"
                      style={styles.input}
                      label="Apellido_paterno"
                      autoCapitalize="none"
                      value={apellido_materno}
                      onChangeText={(text) => setApellido_materno(text)}
                  />
                  <TextInput
                      placeholder="Matricula"
                      style={styles.input}
                      label="Matricula"
                      autoCapitalize="none"
                      value={matricula}
                      onChangeText={(text) => setMatricula(text)}
                  />
                  <TextInput
                      placeholder="Correo Electronico"
                      style={styles.input}
                      label="Email"
                      autoCapitalize="none"
                      autoComplete="email"
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                  />
                  <Text style={styles.sugerencia}>Ingresa una contraseña mayor
                      a ocho caracteres utilizando letras, números, símbolos y confirmar tu contraseña. </Text>

                  <TextInput
                      placeholder="Contraseña"
                      style={styles.input}
                      label="Password"
                      returnKeyType="done"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                  />
                  <TextInput
                      placeholder="Confirmar contraseña"
                      style={styles.input}
                      label="ConfiPassword"
                      returnKeyType="done"
                      secureTextEntry={!showPassword2}
                      value={confirmPassword}
                      onChangeText={(text) => setConfirmPassword(text)}
                  />
                  <TouchableWithoutFeedback onPress={toggleShowPassword}>
                      <View style={{ position: "absolute", right: 33, top: 420 }}>
                          <Image
                              style={styles.ojo}
                              source={require("../../assets/iconos/contraseña.png")}
                          ></Image>
                      </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={toggleShowPassword2}>
                      <View style={{ position: "absolute", right: 33, top: 490 }}>
                          <Image
                              style={styles.ojo}
                              source={require("../../assets/iconos/contraseña.png")}
                          ></Image>
                      </View>
                  </TouchableWithoutFeedback>

                  <TouchableOpacity style={styles.containerR} onPress={onSignupPressed}>
                      <LinearGradient
                          // Button Linear Gradient
                          colors={['#FFCC00', '#685B96', '#7A4780']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.buttonR}>
                          <Text style={styles.textR}>REGISTRARSE</Text>
                      </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={styles.containerIN}
                      onPress={() => {
                          navigation.navigate('Login');
                      }}>
                      <LinearGradient
                          // Button Linear Gradient
                          colors={['#FFCC00', '#685B96', '#7A4780']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.buttonIN}>
                          <Text style={styles.textIN}>INICIAR SESIÓN</Text>
                      </LinearGradient>
                  </TouchableOpacity>
              </SafeAreaView>
          </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  ojo: {
      width: 30,
      height: 30,
  },
  input: {
      height: 50,
      margin: 10,
      borderWidth: 1,
      marginLeft: 25,
      borderColor: 'gray',
      borderRadius: 30,
      backgroundColor: '#F1F1F1',
      paddingStart: 30,
      padding: 10,
      width: 350,
      
  },
  Button: {
      marginTop: 10,
  },
  container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
  },
  img: {
      width: 400,
      height: 150,
      resizeMode: 'contain',
      marginLeft: 20,
      marginRight: 25,
      marginBottom: 50,
      marginTop: 20,
      alignContent: 'center',
  },
  containerR: {
      alignItems: 'center',
      width: 400,
      marginTop: 10,
      height: 70,
  },
  buttonR: {
      borderWidth: 1,
      borderColor: '#fff',
      width: '47%',
      height: 50,
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
      
  },
  textR: {
      fontSize: 15,
      color: '#fff',
  },
  containerIN: {
      alignItems: 'center',
      width: 400,
      height: 70,
      
  },
  buttonIN: {
      borderWidth: 1,
      borderColor: '#fff',
      width: '47%',
      height: 50,
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30,
  },
  textIN: {
      fontSize: 15,
      color: '#fff',
  },
  sugerencia: {
    fontSize: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5, // Cambiado a número
    marginLeft: 35,
    paddingStart: 3,
    padding: 10,
    width: 350,
    height: 50,
    padding: 1,
    marginTop: 5,
},
});








