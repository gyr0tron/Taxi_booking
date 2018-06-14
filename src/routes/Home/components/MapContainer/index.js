import React, { Component } from 'react';
import { View } from 'native-base';
import MapView from 'react-native-maps';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';

import styles from './MapContainerStyles';

export const MapContainer = ({
	region,
	getInputData,
	toggleSearchResultModal,
	getAddressPredictions,
	resultTypes,
	predictions,
	getSelectedAddress,
  selectedAddress,
  carMarker,
  nearByDrivers
}) => {

  const { selectedPickUp, selectedDropOff } = selectedAddress || {};
	return (
		<View style={styles.container}>
			<MapView provider={MapView.PROVIDER_GOOGLE} style={styles.map} initialRegion={region} region={region}>
      { selectedPickUp &&
          <MapView.Marker coordinate={{ latitude: selectedPickUp.latitude, longitude: selectedPickUp.longitude }} pinColor='red' />
      }
      { selectedDropOff &&
          <MapView.Marker coordinate={{ latitude: selectedDropOff.latitude, longitude: selectedDropOff.longitude }} pinColor='green' />
      }
        {
          nearByDrivers.length > 0 && nearByDrivers.map((marker, index)=> 
            <MapView.Marker key={index} coordinate={{
              latitude: marker.coordinate.coordinates[1],
              longitude : marker.coordinate.coordinates[0]}} image={carMarker} />
          )
        }
			</MapView>
			<SearchBox
				getInputData={getInputData}
				toggleSearchResultModal={toggleSearchResultModal}
				getAddressPredictions={getAddressPredictions}
				selectedAddress={selectedAddress}
			/>
			{(resultTypes.pickUp || resultTypes.dropOff) && (
				<SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress} />
			)}
		</View>
	);
};

export default MapContainer;
