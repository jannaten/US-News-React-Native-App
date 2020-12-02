import {Platform, PermissionsAndroid} from 'react-native';
import {proceed, denied} from './alert.utils';

export const onPress = async () => {
  // We need to ask permission for Android only
  if (Platform.OS === 'android') {
    // Calling the permission function
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission Granted
      proceed();
    } else {
      // Permission Denied
      denied();
    }
  } else {
    proceed();
  }
};
