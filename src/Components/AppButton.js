import React from 'react';
import {AppText} from './';
import {TouchableOpacity} from 'react-native';

const AppButton = ({onPress, value, style}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <AppText value={value} />
  </TouchableOpacity>
);

export default AppButton;
