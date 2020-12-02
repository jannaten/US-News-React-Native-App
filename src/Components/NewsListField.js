import React from 'react';
import {styles} from './style.js';
import {getTime} from '../Utils/';
import {AppButton, AppImage, AppText, NewsListFieldScreen} from './';

const NewsListField = ({el, index, navigation}) => {
  const {newsSource, code, newsTime, newsAuthor} = styles;
  const {source, author, urlToImage, title, description} = el;
  const {newsTitle, newsDesc, ButtonStyle, imageHolder} = styles;
  return (
    <NewsListFieldScreen index={index} style={code}>
      <AppText
        style={newsSource}
        onPress={() => navigation.navigate('NewsItem', {el, index})}
        value={source.name}
      />
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
      <AppButton
        style={ButtonStyle}
        value="See full news"
        onPress={() => navigation.navigate('NewsItem', {el})}
      />
    </NewsListFieldScreen>
  );
};

export default NewsListField;
