import React from 'react';
import {onPress} from './src/Utils';
import {NewsList, NewsItem} from './src/Components/';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const App = () => {
  const Stack = createStackNavigator();
  const StackNavigator = () => (
    <Stack.Navigator
      initialRouteName="NewsList"
      screenOptions={{
        headerStyle: {backgroundColor: 'dodgerblue'},
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="NewsList"
        component={NewsList}
        options={{
          headerStyle: {backgroundColor: 'tomato'},
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen name="NewsItem" component={NewsItem} />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <TouchableOpacity style={styles.pressButton} onPress={onPress}>
        <Text>Open your Camera & share news</Text>
      </TouchableOpacity>
      <StackNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  pressButton: {
    flex: 0.07,
    width: '80%',
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 35,
    borderColor: 'purple',
    justifyContent: 'center',
  },
});

export default App;
