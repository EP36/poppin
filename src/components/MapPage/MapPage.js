import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React from 'react';
import { useEffect } from 'react';
import { Text } from 'react-native';

const MapPage = ({ navigation, route }) => {
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
        <Callout>
          <Text>This is where the latest vid thumbnail goes</Text>
        </Callout>
      </Marker>
    </MapView>
  )
};

export default MapPage;