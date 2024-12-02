import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
// import SearchScreen from './screens/SearchScreen';
import VideoScreen from './screens/VideoScreen';
import DetailScreen from './screens/DetailScreen';
import VideoDetailScreen from './screens/VideoDetailScreen';
import AboutScreen from './screens/AboutScreen';
import { FavoritesProvider } from './FavoritesContext';
import SourcesScreen from './screens/SourcesScreen';
import SourceDetailScreen from './screens/SourceDetailScreen';


// Error Boundary component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>Something went wrong!</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Source"
        component={SourcesScreen} // Tambahkan AboutScreen sebagai tab baru
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="news" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
      name="Video"
      component={VideoScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="play-circle" color={color} size={size} />
        ),
      }}
      />
      {/* <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen} // Tambahkan AboutScreen sebagai tab baru
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
          <Stack.Screen name="Sources" component={SourcesScreen} />
          <Stack.Screen name="SourceDetail" component={SourceDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
