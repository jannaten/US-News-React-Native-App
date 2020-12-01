import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [news, setNews] = useState([]);
  const [read, setRead] = useState(false);
  const [val, setVal] = useState(false);
  const country = 'us';
  const category = 'business';
  const apiKey = 'b73a895c1e2746a8a3ba2d5fdd57fd22';
  const url = `http://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  const getNews = async () => {
    const Response = await axios.get(url);
    setNews(Response.data);
  };

  const getTime = (el) => {
    const hourSet = el.publishedAt.split('T')[1].split(':');
    const setAMPM = Number(hourSet[0]) >= 12 ? 'PM' : 'AM';
    const hour = hourSet[0] + '.' + hourSet[1] + '.' + setAMPM;
    const yearSet = el.publishedAt.split('T')[0].split('-');
    const year = yearSet[2] + '-' + yearSet[1] + '-' + yearSet[0];
    return hour + ' ' + year;
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <ScrollView>
      {news ? (
        <View style={styles.container}>
          {news.articles &&
            news.articles.map((el, index) => (
              <View key={index} style={styles.code}>
                <Text style={styles.newsSource}>{el.source.name}</Text>
                <Text style={styles.newsTime}>Published at {getTime(el)}</Text>
                <Text style={styles.newsAuthor}>
                  Authors: {el.authors ? el.authors : 'unknown'}
                </Text>
                {el.urlToImage ? (
                  <Image
                    source={{uri: `${el.urlToImage}`}}
                    style={styles.imageHolder}
                  />
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
                <TouchableOpacity
                  style={styles.readButton}
                  onPress={() => {
                    setRead(!read);
                    setVal(index);
                  }}>
                  <Text>
                    {read && val === index ? 'read less' : 'read more'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      ) : (
        <View style={styles.container}>
          <Text>Can not find news</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  newsTime: {fontSize: 10, marginVertical: 1},
  newsAuthor: {fontSize: 12, marginVertical: 1},
  newsTitle: {fontSize: 18, marginVertical: 10},
  newsDesc: {fontSize: 15, marginVertical: 10},
  newsContent: {fontSize: 15, marginVertical: 10},
  code: {
    padding: 12,
    color: '#666',
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: '#eaeaea',
  },
  newsSource: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  linkColor: {
    color: 'blue',
  },
  imageHolder: {
    height: 200,
    marginVertical: 10,
  },
  readButton: {
    width: 80,
    height: 35,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: 'purple',
  },
});

export default App;
