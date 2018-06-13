import React from "react";
import { Text, Image } from "react-native";
import { Header, Left, Body, Right, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./HeaderComponentStyles";

export const HeaderComponent = ({logo}) => {
  return (
    <Header style={{ backgroundColor: "#FF5E3A" }} androidStatusBarColor="#ff0b03">
      {/* <Left style={{
        backgroundColor: "black"
      }}> */}
        <Button iconLeft transparent>
          <Icon name="bars" style={styles.iconBars} />
        </Button>
      {/* </Left> */}

      <Body style={styles.headerText}>
        <Image resizeMode="contain" style={styles.logo} source={logo}/>
      </Body>

      {/* <Right style={{
        backgroundColor: "black"}}> */}
        <Button iconRight transparent>
          <Icon name="taxi" style={styles.iconTaxi} />
        </Button>
     {/* </Right> */}
    </Header>
  );
}
export default HeaderComponent;