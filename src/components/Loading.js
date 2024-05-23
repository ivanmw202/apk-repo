import { Image, View, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <>
      <View>
        <Image
          style={styles.img}
          source={require('../../assets/iconos/Loading1.gif')}
        />
      </View>
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({
  img: {
    width: 220,
    height: 220,
    borderWidth: 1,
    marginLeft: 80,
    marginRight: 70,
    marginTop: 290,
    alignContent: 'center',
  },
});