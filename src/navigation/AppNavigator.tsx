import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '@screens/HomeScreen';
import { ArticleScreen } from '@screens/ArticleScreen';
import { BookmarksScreen } from '@screens/BookmarksScreen';
import { SearchScreen } from '@screens/SearchScreen';
import { colors } from '@theme/colors';
import { textStyles } from '@theme/typography';

import type {
  RootTabParamList,
  HomeStackParamList,
  SearchStackParamList,
  BookmarksStackParamList,
} from './types';

const HomeStack = createStackNavigator<HomeStackParamList>();
const SearchStack = createStackNavigator<SearchStackParamList>();
const BookmarksStack = createStackNavigator<BookmarksStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const screenOptions = {
  headerStyle: { backgroundColor: colors.headerBg },
  headerTintColor: colors.headerText,
  headerTitleStyle: textStyles.titleMedium,
  cardStyle: { backgroundColor: colors.background },
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Feed" component={HomeScreen} options={{ title: 'US News' }} />
      <HomeStack.Screen name="Article" component={ArticleScreen} options={{ title: '' }} />
    </HomeStack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator screenOptions={screenOptions}>
      <SearchStack.Screen
        name="SearchFeed"
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <SearchStack.Screen name="Article" component={ArticleScreen} options={{ title: '' }} />
    </SearchStack.Navigator>
  );
}

function BookmarksStackNavigator() {
  return (
    <BookmarksStack.Navigator screenOptions={screenOptions}>
      <BookmarksStack.Screen
        name="BookmarksFeed"
        component={BookmarksScreen}
        options={{ title: 'Bookmarks' }}
      />
      <BookmarksStack.Screen name="Article" component={ArticleScreen} options={{ title: '' }} />
    </BookmarksStack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.tabBar,
            borderTopColor: colors.border,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: colors.tabBarActive,
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarLabelStyle: { ...textStyles.label, fontSize: 10 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📰</Text>,
            tabBarLabel: 'News',
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackNavigator}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🔍</Text>,
            tabBarLabel: 'Search',
          }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksStackNavigator}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>★</Text>,
            tabBarLabel: 'Saved',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
