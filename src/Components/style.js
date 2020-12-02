import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
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
  goBack: {
    width: 70,
    height: 35,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: 'purple',
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
  buttonControl: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loaderContanier: {
    display: 'flex',
    marginVertical: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
