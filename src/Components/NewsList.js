import React, {useEffect} from 'react';
import axios from 'axios';
import {View} from 'react-native';
import {styles} from './style.js';
import {url, Loader} from '../Utils/';
import {NewsListField, NewsListScreen} from './';

const NewsList = ({navigation}) => {
  const [news, setNews] = React.useState([]);
  const [val, setVal] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const getNews = async () => {
    const Response = await axios.get(url());
    setNews(Response.data);
  };

  useEffect(() => {
    getNews();
    setVisible(!visible);
  }, []);

  const {length, articles} = news;

  return (
    <NewsListScreen>
      {visible && length === 0 ? <Loader /> : null}
      {news ? (
        <View style={styles.container}>
          {articles &&
            articles.map((el, index) => (
              <NewsListField
                el={el}
                val={val}
                key={index}
                index={index}
                setVal={setVal}
                navigation={navigation}
              />
            ))}
        </View>
      ) : null}
    </NewsListScreen>
  );
};

export default NewsList;
