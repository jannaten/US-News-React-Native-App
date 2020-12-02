import React from 'react';
import {View, ScrollView} from 'react-native';

const NewsItemScreen = ({key, style, children}) => (
  <ScrollView>
    <View key={key} style={style}>
      {children}
    </View>
  </ScrollView>
);

export default NewsItemScreen;
