import {
    View,
    Image,
    Button,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import { useState, useEffect } from 'react';
  
  import * as SecureStore from 'expo-secure-store';
  
  import { URL_BASE } from '../config/URL_BASE';
  import { LinearGradient } from 'expo-linear-gradient';
  
  const Profile = ({ navigation }) => {
    const [data, setData] = useState({});
    const setInfo = async () => {
      const email = await SecureStore.getItemAsync('email');
      const nombre = await SecureStore.getItemAsync('nombre');
      const apellido_paterno = await SecureStore.getItemAsync('apellido_paterno');
      const apellido_materno = await SecureStore.getItemAsync('apellido_materno');
      const matricula = await SecureStore.getItemAsync('matricula');
      //const token = await SecureStore.getItemAsync('token');
      setData({
        //token,
        email,
        nombre,
        apellido_paterno,
        apellido_materno,
        matricula,
      });
    };
    const handleClickLogOut = async () => {
      let token = await SecureStore.getItemAsync('token');
      const url = `${URL_BASE}/api/auth/logout/`;
      console.log(token);
      console.log(url);
      const solicitud = await fetch(
        url,
  
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );
      const respuesta = await solicitud.json();
      if (respuesta.success) {
        navigation.navigate('Login');
      }
    };
  
    useEffect(() => {
      setInfo();
    }, []);
  
    return (
      <>
        <ScrollView>
        <View style={{ backgroundColor: "#FFCC00", flex: 1, padding: 18 }}></View>
          <View style={styles.containerImg}>
            <Image
              style={styles.img}
              source={require('../../assets/iconos/perfil.png')}></Image>
          </View>
          <View style={styles.datos}>
            <Text style={styles.txt}>Correo: {data.email}</Text>
            <Text style={styles.txt}>Nombre: {data.nombre}</Text>
            <Text style={styles.txt}>
              Apellido paterno: {data.apellido_paterno}
            </Text>
            <Text style={styles.txt}>
              Apellido materno: {data.apellido_materno}
            </Text>
            <Text style={styles.txt}>Matricula: {data.matricula}</Text>
          </View>
  
          
  
          <TouchableOpacity
            onPress={handleClickLogOut}
            style={styles.container1}>
            <LinearGradient
              colors={['#FFCC00', '#685B96', '#7A4780']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button1}>
              <Text style={styles.textL}>cerrar sesion</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  };
  
  export default Profile;
  const styles = StyleSheet.create({
    img: {
      width: 150,
      height: 150,
      borderWidth: 2,
      resizeMode: 'contain',
      marginLeft: 70,
      marginRight: 90,
      marginBottom: 50,
      marginTop: 85,
      alignContent: 'center',
    },
    containerImg: {
      marginLeft: 50,
      marginRight: 70,
    },
    container1: {
      flex: 1,
      alignItems: 'center',
      width: 300,
    },
    textL: {
      fontSize: 15,
      color: '#fff',
    },
    button1: {
      margin: 100,
      borderWidth: 1,
      borderColor: '#fff',
      width: '47%',
      height: 50,
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 20,
    },
    datos: {
      marginBottom: 30,
      marginRight: 80,
      margin: 30,
      borderWidth: 1,
      width: '85%',
      borderRadius: 15,
      padding: 10,
      paddingStart: 10,
    },
    txt: {
      fontSize: 20,
      color: '##7A4780',
      marginRight: 20,
    },
  });