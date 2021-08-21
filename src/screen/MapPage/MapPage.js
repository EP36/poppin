import MapView, { Callout, CalloutSubview, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React from 'react';
import { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Button, 
  Text 
} from 'react-native';

const MapPage = ({ navigation, route }) => {
  const handleThumbnail = () => {
    navigation.navigate('DogPark')
  }

  return (
    <MapView  
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.2,
      }} 
    >
      <Marker
        coordinate={{ latitude: route.params.latitude, longitude: route.params.longitude }} 
        stopPropagation
      >
        <Callout onPress={handleThumbnail}>
          <Button
            title="Check out the area"
            />
        </Callout>
      </Marker>
    </MapView>
  )
};

export default MapPage;