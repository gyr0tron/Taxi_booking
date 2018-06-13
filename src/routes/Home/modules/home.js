import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, PermissionsAndroid } from "react-native";
import RNGooglePlaces from "react-native-google-places";

//Constants
const { 
  GET_CURRENT_LOCATION, 
  GET_INPUT, 
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_PREDICTIONS
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
        (error) => console.log(error.message), { enableHighAccuracy: false, timeout: 2000, maximumAge: 3600000 }
      );
    }
  }
}

export function getInputData(payload){
  return{
    type: GET_INPUT,
    payload
  }
}
//toggle search result modal
export function toggleSearchResultModal(payload) {
  return {
    type: TOGGLE_SEARCH_RESULT,
    payload
  }
}
//GET ADDRESSES from google places
export function getAddressPredictions() {
  return(dispatch, store)=>{
    let userInput = store().home.resultTypes.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
    RNGooglePlaces.getAutocompletePredictions(userInput,
      {
        country: "IND"
      }
    )
    .then((results)=>
      dispatch({
        type:GET_ADDRESS_PREDICTIONS,
        payload: results
      })
    )
    .catch((error)=>console.log(error.message));
  };
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

function handleGetInputData(state, action) {
  const {key, value} = action.payload;
  return update(state, {
    inputData: {
      [key]: {
        $set: value
      }
    }
  });
}

function handletoggleSearchResult(state, action) {
  if(action.payload === "pickUp") {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: true,
        },
        dropOff: {
          $set: false
        }
      },
      predictions: {
        $set: {}
      }
    });
  }
  if (action.payload === "dropOff") {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: false,
        },
        dropOff: {
          $set: true
        }
      },
      predictions: {
        $set: {}
      }
    });
  }
}

function handleGetAddressPredictions(state, action) {
  return update(state, {
    predictions: {
      $set: action.payload
    }
  })
}

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,  //tell redux setname action will be handled by function handlesetname
  GET_INPUT: handleGetInputData,
  TOGGLE_SEARCH_RESULT: handletoggleSearchResult,
  GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions
}

const initialState = {
  region:{
    latitude: 19.218331,
    longitude: 72.978090,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  inputData:{},
  resultTypes:{}
};

export function HomeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}