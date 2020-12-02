import React from 'react';
import {AppButton} from './';
import {styles} from './style.js';
import {getTime} from '../Utils/';
import {StackActions} from '@react-navigation/native';
import {View, Text, Image, Linking} from 'react-native';

const NewsItem = ({route, navigation}) => {
  const [read, setRead] = React.useState(false);
  const popAction = StackActions.popToTop({n: 1});
  const {el, index} = route.params;
  return (
    <View key={index} style={styles.code}>
      <Text style={styles.newsSource}>{el.source.name}</Text>
      <Text style={styles.newsTime}>Published at {getTime(el)}</Text>
      <Text style={styles.newsAuthor}>
        Authors: {el.author ? el.author : 'unknown'}
      </Text>
      {el.urlToImage ? (
        <Image source={{uri: `${el.urlToImage}`}} style={styles.imageHolder} />
      ) : null}
      <Text style={styles.newsTitle}>{el.title}</Text>
      {el.description ? (
        <Text style={styles.newsDesc}>{el.description}</Text>
      ) : null}
      {read ? (
        <>
          <Text style={styles.newsContent}>
            {el.content ? el.content : 'No contents found'}
          </Text>
          <Text
            style={styles.linkColor}
            onPress={() => Linking.openURL(`${el.url}`)}>
            Check more details
          </Text>
        </>
      ) : null}
      <View style={styles.buttonControl}>
        <AppButton
          style={styles.readButton}
          onPress={() => setRead(!read)}
          value={read ? 'read less' : 'read more'}
        />
        <AppButton
          style={styles.goBack}
          onPress={() => navigation.dispatch(popAction)}
          value="Go Back"
        />
      </View>
    </View>
  );
};

export default NewsItem;
