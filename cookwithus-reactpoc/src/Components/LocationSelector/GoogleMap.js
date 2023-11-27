import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {GOOGLE_MAPS_KEY} from '../../config/constants'

class GoogleMap extends Component {
  render() {
    const { latitude, longitude, zoom , width , height } = this.props;
    const mapStyles = {
      width: width ? width : '95%',
      height: height ? height : '100%',
    };

    return (
      <Map
        google={this.props.google}
        zoom={zoom ? zoom : 12}
        style={mapStyles}
        initialCenter={{ lat: latitude, lng: longitude }}
      >
        <Marker 
          position={{ lat: latitude, lng: longitude }}
         />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_KEY,
})(GoogleMap);