import React, { Component } from 'react';
import { View } from 'native-base';
import MapView from 'react-native-maps';
import SearchBox from '../SearchBox';

import styles from "./MapContainerStyles";

export const MapContainer = ({region}) => {
  return(
    <View style={styles.container}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        region={region}
      >
        <MapView.Marker
          coordinate={region}
          pinColor="red"
        />
      </MapView>
      <SearchBox/>
    </View>
  )
}

export default MapContainer;