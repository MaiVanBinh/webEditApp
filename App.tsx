/* eslint-disable no-alert */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import WebView from 'react-native-webview';

type SendIntentButtonProps = {
  action: string;
  children?: string;
  extras?: Array<{
    key: string;
    value: string | number | boolean;
  }>;
};

const App = () => {
  // const webviewRef = useRef();
  function onMessage(data: any) {
    if (data.nativeEvent.data) {
      const receivedData = JSON.parse(data.nativeEvent.data);
      if (receivedData?.type === 0) {
        alert(receivedData.data);
      } else if (receivedData?.type === 1) {
        openApp(receivedData.data);
      }
    }
  }
  const sendIntent = async ({action, extras}: SendIntentButtonProps) => {
    if (Platform.OS === 'android') {
      try {
        await Linking.sendIntent(action, extras);
      } catch (e: any) {
        Alert.alert(e.message);
      }
    }
  };
  const openCamera = () => {
    if (Platform.OS === 'android') {
      sendIntent({action: 'android.media.action.IMAGE_CAPTURE'});
      return;
    }
    // const result = await ImagePicker.launchCameraAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1
    // });
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openCamera();
        } else {
          Alert.alert('Camera permission denied');
        }
      } catch (e: any) {
        Alert.alert(e.message);
      }
    }
  };
  const openPhoto = () => {
    if (Platform.OS === "android") {
      Linking.openURL("content://media/internal/images/media");
    } else {
      Linking.openURL("photos-redirect://");
    }
  };
  const openApp = (data: any) => {
    if (data === 'photo') {
      openPhoto();
      return;
    }

    if (data === 'youtube') {
      const url = 'https://www.youtube.com/';
      Linking.canOpenURL(url)
        .then(supported => {
          console.log(supported);
          if (supported) {
            Linking.openURL(url);
          } else {
            Alert.alert(
              'App Not Found',
              'The app you are trying to open is not installed on this device.',
            );
          }
        })
        .catch(() =>
          Alert.alert(
            'Error',
            'An error occurred while trying to open the app.',
          ),
        );
    }

    if (data === 'camera') {
      requestCameraPermission();
      return;
    }

    if (Platform.OS === 'android') {
      if (data === 'power') {
        sendIntent({action: 'android.intent.action.POWER_USAGE_SUMMARY'});
        return;
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        onMessage={onMessage}
        source={{uri: 'https://demo.wetop.me/tiptap-editor/'}}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  webview: {flex: 1},
});

export default App;
