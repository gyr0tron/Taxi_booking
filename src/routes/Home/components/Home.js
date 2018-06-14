import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container } from "native-base";

import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import Fare from "./Fare";
import Fab from "./Fab";

const taxiLogo = require("../../../assets/img/taxi.png");

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
        <HeaderComponent logo={taxiLogo}/>

        <MapContainer 
        region={this.props.region} 
        getInputData={this.props.getInputData} 
        toggleSearchResultModal={this.props.toggleSearchResultModal}
        getAddressPredictions={this.props.getAddressPredictions}
        resultTypes={this.props.resultTypes}
        predictions={this.props.predictions}
        getSelectedAddress={this.props.getSelectedAddress}
        selectedAddress={this.props.selectedAddress}/>

        <Fab onPressAction={()=>this.props.bookCar()}/>

        {
          this.props.fare &&
          <Fare fare={this.props.fare}/>
        }

        <FooterComponent/>

      </Container>
    );
  }
}