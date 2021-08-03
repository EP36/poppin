import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React from 'react';

const MapPage = () => {
  return (
    <MapView  
    style={{ flex: 1 }}
    provider={PROVIDER_GOOGLE}
    showsUserLocationinitialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0923,
      longitudeDelta: 0.421
    }} />
  )
};

export default MapPage;