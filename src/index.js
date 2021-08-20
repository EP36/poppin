import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/HomePage/HomePage';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
import MapPage from './components/MapPage/MapPage';
// import SignIn from './components/SignIn/SignIn';
// import SplashPage from './components/SplashPage/SplashPage';
import CameraPage from './components/CameraPage/CameraPage';

import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

// Amplify integration with Expo
Amplify.configure(config);

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

function App() {

  return (
    <NavigationContainer fallback={<Text>Loading fallback...</Text>}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="Map"
          component={MapPage}
        />
        <Stack.Screen
          name="Camera"
          component={CameraPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App, true);