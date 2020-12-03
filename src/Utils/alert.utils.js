import {Alert} from 'react-native';
export const proceed = () =>
  Alert.alert('Success', 'Camera uses success', [{text: 'OK'}], {
    cancelable: false,
  });

export const denied = () =>
  Alert.alert('Failed', 'Camera uses denied', [{text: 'OK'}], {
    cancelable: false,
  });
