import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { 
  View, 
  Text, 
  Button, 
  TouchableOpacity,
  StyleSheet
} from "react-native";
import AppButton from '../../components/AppButton/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

const HomePage = ({ navigation, updateAuthState }) => {
  const [currLocation, setCurrLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setCurrLocation(location);
    })();
  }, []);

  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut')
    } catch (error) {
      console.log('Error signing out:', error);
    }
  }

  let text = 'Waiting..';
  if(errorMsg) {
    text = errorMsg
  } else if (currLocation) {
    text = JSON.stringify(currLocation);
    console.log(currLocation.coords.latitude)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Poppin
        </Text>
        <Text style={styles.bannerSubtittle}>
          What's poppin at the dog park?
        </Text>
      </View>
      <View style={styles.container}>
        <AppButton
          title="Dog Parks"
          leftIcon='map'
          onPress={() =>
            navigation.navigate('Map', { name: 'EP', longitude: currLocation.coords?.longitude, latitude: currLocation.coords?.latitude })
          }
        />
        {/* <AppButton
          title="Profile"
          leftIcon="account-circle"
          onPress={() =>
            navigation.navigate('Profile')
          }
        /> */}
        <AppButton
          title="Sign out"
          leftIcon="account-circle"
          onPress={signOut}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  banner: {
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 120,
    color: '#81D8D0'
  },
  bannerSubtittle: {
    fontSize: 18,
    fontWeight: '200'
  },
})

export default HomePage;