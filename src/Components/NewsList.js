import React, {useEffect} from 'react';
import axios from 'axios';
import {NewsListField} from './';
import {styles} from './style.js';
import {url, Loader} from '../Utils/';
import {Container} from '../Utils/styles';
import {View, ScrollView} from 'react-native';
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

  return (
    <>
      <ScrollView>
        {visible && news.length === 0 ? (
          <View style={styles.loaderContanier}>
            <Container>
              <Loader />
            </Container>
          </View>
        ) : null}
        {news ? (
          <View style={styles.container}>
            {news.articles &&
              news.articles.map((el, index) => {
                return (
                  <NewsListField
                    el={el}
                    val={val}
                    key={index}
                    index={index}
                    setVal={setVal}
                    navigation={navigation}
                  />
                );
              })}
          </View>
        ) : null}
      </ScrollView>
    </>
  );
};

export default NewsList;
