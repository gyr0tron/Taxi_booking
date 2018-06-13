import React, { Component } from 'react';
import { View } from 'native-base';
import MapView from 'react-native-maps';
import SearchBox from '../SearchBox';
import SearchResults from "../SearchResults";

import styles from "./MapContainerStyles";

export const MapContainer = ({ region, getInputData, toggleSearchResultModal, getAddressPredictions, resultTypes, predictions, getSelectedAddress, selectedAddress }) => {
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
        getAddressPredictions={getAddressPredictions}
        selectedAddress={selectedAddress}/>
      {(resultTypes.pickUp || resultTypes.dropOff) &&
        <SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
      }
    </View>
  )
}

export default MapContainer;