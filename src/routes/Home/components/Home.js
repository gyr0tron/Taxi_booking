import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container } from "native-base";

import MapContainer from "./MapContainer";

export default class Home extends Component {
  
  componentDidMount() {
    this.props.setName();
	}

  render() {
    const region = {
      latitude: 19.218331,
      longitude: 72.978090,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
    return (
      <Container>
        <MapContainer region={region}/>
      </Container>
    );
  }
}