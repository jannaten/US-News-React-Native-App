import React from 'react';
import {View} from 'react-native';

const NewsItemScreen = ({key, style, children}) => (
  <View key={key} style={style}>
    {children}
  </View>
);

export default NewsItemScreen;
