import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container } from "native-base";

import MapContainer from "./MapContainer";

export default class Home extends Component {
  
  componentWillMount() {
    this.props.getCurrentLocation();
	}

  render() {
    const initialRegion = {
      latitude: 19.218331,
      longitude: 72.978090,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }

    console.log(this.props.region.latitude);
    return (
      <Container>
        <MapContainer region={this.props.region}/>
        
      </Container>
    );
  }
}