import * as React from 'react';
import { Button, Image, View, ImageBackground, StyleSheet, AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class CustomiseApp extends React.Component {

  state = {
    image: null,
  };

  componentDidMount() {
    this.getPermissionAsync();
    //this.focusListener = this.props.navigation.addListener('didFocus', () => {
    AsyncStorage.getItem('backgroundImageUri').then((value) => {
      if (value != null) {
        this.setState({ image: value });
      }

    });
    //});
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container} >
        {image && <ImageBackground style={styles.backgroundImage} source={{ uri: this.state.image }} >
          {this.setBackground(image)}
        </ImageBackground>}
        {!image && <ImageBackground style={styles.backgroundImage} source={{ uri: this.state.image }} >
          {this.setBackground(image)}
        </ImageBackground>}
      </View>

    );
  }

  setBackground = (image) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.buttonStyle}  >
          <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        </View>
        <View style={styles.buttonStyle}>
          <Button title="Clear background" onPress={this.clearBackground} />
        </View>
      </View>
    );
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  clearBackground = async () => {
    AsyncStorage.setItem("backgroundImageUri", "");
    this.setState({ image: null });
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        AsyncStorage.setItem("backgroundImageUri", result.uri);
        //console.warn("Image assigned====>>>>");
      }

      //console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FDEBD0',
    //backgroundColor: '#242526', dark backgroung like FB
    backgroundColor: '#FCFEFE',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7
  },
  buttonStyle: {
    alignItems: 'center',
    height: 45,
    width: 260,
    marginBottom: 10,
  }
});

export default CustomiseApp;