import React, { Component } from 'react';
import { View } from 'native-base';
import MapView from 'react-native-maps';
import SearchBox from '../SearchBox';
import SearchResults from "../SearchResults";

import styles from "./MapContainerStyles";

export const MapContainer = ({ region, getInputData, toggleSearchResultModal, getAddressPredictions, resultTypes, predictions }) => {
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
      <SearchBox 
        getInputData={getInputData} 
        toggleSearchResultModal={toggleSearchResultModal} 
        getAddressPredictions={getAddressPredictions}/>
      {(resultTypes.pickUp || resultTypes.dropOff) &&
        <SearchResults predictions={predictions}/>
      }
    </View>
  )
}

export default MapContainer;