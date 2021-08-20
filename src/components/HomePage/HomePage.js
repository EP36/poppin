import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';

const HomePage = ({ navigation }) => {
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

  let text = 'Waiting..';
  if(errorMsg) {
    text = errorMsg
  } else if (currLocation) {
    text = JSON.stringify(currLocation);
    console.log(currLocation.coords.latitude)
  }

  return (
    <View>
      <TouchableOpacity>
        <Text>Where am I?</Text>
        <Text>{text}</Text>
      </TouchableOpacity>
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
      />
      <Button
        title="Go to Jane's Camera"
        onPress={() =>
          navigation.navigate('Camera', { name: 'Jane' })
        }
      />
      <Button
        title="Go to Jane's video feed"
        onPress={() =>
          navigation.navigate('Video', { name: 'Jane' })
        }
      />
      <Button
        title="Go to the map"
        onPress={() =>
          navigation.navigate('Map', { name: 'Jane', longitude: currLocation.coords?.longitude, latitude: currLocation.coords?.latitude })
        }
      />
    </View>
  );
};

export default HomePage;