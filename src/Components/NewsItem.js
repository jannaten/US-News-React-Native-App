import React from 'react';
import {styles} from './style.js';
import {getTime} from '../Utils/';
import {View, Linking} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {AppButton, AppText, AppImage, NewsItemScreen} from './';

const NewsItem = ({route, navigation}) => {
  const {el} = route.params;
  const [read, setRead] = React.useState(false);
  const popAction = StackActions.popToTop({n: 1});
  return (
    <NewsItemScreen style={styles.code}>
      <AppText style={styles.newsSource} value={el.source.name} />
      <AppText style={styles.newsTime} value={`Published at ${getTime(el)}`} />
      <AppText
        style={styles.newsAuthor}
        value={`Authors: ${el.author ? el.author : 'unknown'}`}
      />
      {el.urlToImage ? (
        <AppImage
          source={{uri: `${el.urlToImage}`}}
          style={styles.imageHolder}
        />
      ) : null}
      <AppText style={styles.newsTitle} value={el.title} />
      {el.description ? (
        <AppText style={styles.newsDesc} value={el.description} />
      ) : null}
      {read ? (
        <>
          <AppText
            style={styles.newsContent}
            value={el.content ? el.content : 'No contents found'}
          />
          <AppText
            style={styles.linkColor}
            onPress={() => Linking.openURL(`${el.url}`)}
            value="Check more details"
          />
        </>
      ) : null}
      <View style={styles.buttonControl}>
        <AppButton
          style={styles.ButtonStyle}
          onPress={() => setRead(!read)}
          value={read ? 'read less' : 'read more'}
        />
        <AppButton
          style={styles.ButtonStyle}
          onPress={() => navigation.dispatch(popAction)}
          value="Go Back"
        />
      </View>
    </NewsItemScreen>
  );
};

export default NewsItem;
