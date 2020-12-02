import React from 'react';
import {View} from 'react-native';

const NewsFieldScreen = ({children, index, style}) => (
  <View index={index} style={style}>
    {children}
  </View>
);

export default NewsFieldScreen;
