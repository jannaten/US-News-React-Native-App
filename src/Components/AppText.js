import React from 'react';
import {Text} from 'react-native';

const AppText = ({onPress, value, style}) => (
  <Text style={style} onPress={onPress}>
    {value}
  </Text>
);

export default AppText;
