import React from 'react';
import {AppText} from './';
import {TouchableOpacity} from 'react-native';

const HeaderButton = ({style, onPress, value}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <AppText value={value} />
  </TouchableOpacity>
);

export default HeaderButton;
