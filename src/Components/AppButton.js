import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const AppButton = ({onPress, value, style}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text>{value}</Text>
  </TouchableOpacity>
);

export default AppButton;
