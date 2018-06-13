import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { InputGroup, Input} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./SearchBoxStyles";

export const SearchBox = () => {
  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>PICK UP</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A"/>
          <Input style={styles.inputSearch} placeholder="Choose pick-up location"/>
        </InputGroup>
      </View>

      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DROP OFF</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A" />
          <Input style={styles.inputSearch} placeholder="Choose drop-off location" />
        </InputGroup>
      </View>
    </View>
  );
}

export default SearchBox;