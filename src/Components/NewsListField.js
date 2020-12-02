import React from 'react';
import {AppButton} from './';
import {styles} from './style.js';
import {getTime} from '../Utils/';
import {View, Text, Image, Linking} from 'react-native';

const NewsListField = ({el, index, navigation, read, val}) => {
  return (
    <View key={index} style={styles.code}>
      <Text
        style={styles.newsSource}
        onPress={() => navigation.navigate('NewsItem', {el, index})}>
        {el.source.name}
      </Text>
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
      {read && val === index ? (
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
      <AppButton
        style={styles.readButton}
        value={read && val === index ? 'read less' : 'read more'}
        onPress={() => navigation.navigate('NewsItem', {el, index})}
      />
    </View>
  );
};

export default NewsListField;
