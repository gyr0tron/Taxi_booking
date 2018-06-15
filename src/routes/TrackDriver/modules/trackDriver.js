import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, PermissionsAndroid } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../util/request";
import calculateFare from "../../../util/fareCalculator";

//Constants
const {
  GET_CURRENT_LOCATION,
  GET_DRIVER_INFORMATION,
  GET_DRIVER_LOCATION,
  GET_DISTANCE_FROM_DRIVER
} = constants;


const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

async function requestGPSPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the GPS");
      return true;
    } else {
      console.log("GPS permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err)
  }
}

//Actions
export function getCurrentLocation () {
  return(dispatch)=>{

    if (requestGPSPermission()) {
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          dispatch({
            type:GET_CURRENT_LOCATION,
            payload:position
          });
        },
        (error) => console.log(error.message), { enableHighAccuracy: false, timeout: 5000, maximumAge: 3600000 }
      );
    }
  }
}

//Get driver's info

export function getDriverInfo() {
  return (dispatch, store) => {
    let id = store().home.booking.driverId;
    request.get("http://192.168.0.110:3000/api/driver/" + id)
      .finish((erro4, res) => {
        dispatch({
          type: GET_DRIVER_INFORMATION,
          payload: res.body
        });
      });
  }
}


//Get initial driver location
export function getDriverLocation() {
  return (dispatch, store) => {
    let id = store().home.booking.driverId;
    request.get("http://192.168.0.110:3000/api/driverLocation/" + id)
      .finish((error, res) => {
        dispatch({
          type: GET_DRIVER_LOCATION,
          payload: res.body
        });
      });
  }
}

//get distance from driver
export function getDistanceFromDriver() {
  return (dispatch, store) => {
    if (store().trackDriver.driverLocation) {
      request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
        .query({
          origins: store().home.selectedAddress.selectedPickUp.latitude +
            "," + store().home.selectedAddress.selectedPickUp.longitude,
          destinations: store().trackDriver.driverLocation.coordinate.coordinates[1] +
            "," + store().trackDriver.driverLocation.coordinate.coordinates[0],
          mode: "driving",
          key: "AIzaSyDpVyFOBRMTmvlVeQb8grOvqrUEdsyLKX4"
        })
        .finish((error, res) => {
          dispatch({
            type: GET_DISTANCE_FROM_DRIVER,
            payload: res.body
          })
        });
    }
  }
}

// ActionHandlers
function handleGetCurrentLocation(state, action) {
  console.log (action.payload);
  return update(state, {
    region: {
      latitude: {
        $set: action.payload.coords.latitude - 2.690783 //accuracy 1170385 shows wrong
      },
      longitude: {
        $set: action.payload.coords.longitude - 9.797931
      },
      LATITUDE_DELTA: {
        $set: LATITUDE_DELTA
      },
      LONGITUDE_DELTA: {
        $set: LONGITUDE_DELTA
      }
    }
  });
}

function handleGetDriverInfo(state, action) {
  return update(state, {
    driverInfo: {
      $set: action.payload
    }
  });
}

function handleUpdateDriverLocation(state, action) {
  return update(state, {
    driverLocation: {
      $set: action.payload
    }
  });
}

function handleGetDriverLocation(state, action) {
  return update(state, {
    driverLocation: {
      $set: action.payload
    },
    showDriverFound: {
      $set: false
    },
    showCarMaker: {
      $set: true
    }

  });
}

function handleGetDistanceFromDriver(state, action) {
  return update(state, {
    distanceFromDriver: {
      $set: action.payload
    }
  });
}

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation, 
  GET_DRIVER_INFORMATION:handleGetDriverInfo,
  UPDATE_DRIVER_LOCATION: handleUpdateDriverLocation,
  GET_DRIVER_LOCATION: handleGetDriverLocation,
  GET_DISTANCE_FROM_DRIVER: handleGetDistanceFromDriver
}

const initialState = {
  region: {},
  showDriverFound: true
};

export function TrackDriverReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}