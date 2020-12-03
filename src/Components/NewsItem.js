import React from 'react';
import {styles} from './style.js';
import {getTime} from '../Utils/';
import {View, Linking} from 'react-native';
import {AppButton, AppText, AppImage, NewsItemScreen} from './';

const NewsItem = ({route, navigation}) => {
  const {el} = route.params;
  const [read, setRead] = React.useState(false);
  const {code, newsSource, newsTime, newsAuthor} = styles;
  const {ButtonStyle, imageHolder, buttonControl} = styles;
  const {newsTitle, newsDesc, newsContent, linkColor} = styles;
  const {source, author, urlToImage, title, description, content, url} = el;
  return (
    <NewsItemScreen style={code}>
      <AppText style={newsSource} value={source.name} />
      <AppText style={newsTime} value={`Published at ${getTime(el)}`} />
      <AppText
        style={newsAuthor}
        value={`Authors: ${author ? author : 'unknown'}`}
      />
      {urlToImage ? (
        <AppImage source={{uri: `${urlToImage}`}} style={imageHolder} />
      ) : null}
      <AppText style={newsTitle} value={title} />
      {description ? <AppText style={newsDesc} value={description} /> : null}
      {read ? (
        <>
          <AppText
            style={newsContent}
            value={content ? content : 'No contents found'}
          />
          <AppText
            style={linkColor}
            value="Check more details"
            onPress={() => Linking.openURL(`${url}`)}
          />
        </>
      ) : null}
      <View style={buttonControl}>
        <AppButton
          style={ButtonStyle}
          onPress={() => setRead(!read)}
          value={read ? 'read less' : 'read more'}
        />
        <AppButton
          style={ButtonStyle}
          onPress={() => navigation.navigate('NewsList')}
          value="Go Back"
        />
      </View>
    </NewsItemScreen>
  );
};

export default NewsItem;
