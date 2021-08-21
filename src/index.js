import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screen/HomePage/HomePage';
import ProfileScreen from './screen/ProfileScreen/ProfileScreen';
import MapPage from './screen/MapPage/MapPage';
import CameraPage from './screen/CameraPage/CameraPage';

import Amplify, { Auth } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import DogPark from './screen/DogPark/DogPark';
import SignIn from './screen/SignIn/SignIn';
import SignUp from './screen/SignUp/SignUp';
import ConfirmSignUp from './screen/ConfirmSignUp/ConfirmSignUp';
import DogParkFeed from './screen/DogParkFeed/DogParkFeed';

// Amplify integration with Expo
Amplify.configure(config);

const Stack = createStackNavigator();
const AuthenticationStack = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{
      headerMode: 'screen',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#81D8D0' }
    }}>
      <Stack.Screen
        name="Home"
        options={{ title: 'Welcome' }}
      >
        {(screenProps) => (
          <HomePage {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile" >
        { (screenProps) => (
          <ProfileScreen {...screenProps} updateAuthState={props.updateAuthState} /> 
        )}
      </Stack.Screen>  
      
      <Stack.Screen
        name="Map"
        component={MapPage}
      />
      <Stack.Screen
        name="Camera"
        component={CameraPage}
      />
      <Stack.Screen
        name="DogPark"
        component={DogPark}
      />
      <Stack.Screen name="DogParkFeed">
      { (screenProps) => <DogParkFeed {...screenProps} /> }
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator screenOptions={{
      headerMode: 'none',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#81D8D0' }
    }}>
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
    </AuthenticationStack.Navigator>
  )
};

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#81D8D0" />
    </View>
  );
};

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log(' User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log(' User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  };

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  };

  return (
    <NavigationContainer>
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && (
        <AppNavigator updateAuthState={updateAuthState} />
      )}
      {isUserLoggedIn === 'loggedOut' && (
        <AuthenticationNavigator updateAuthState={updateAuthState} />
      )}
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

export default App;